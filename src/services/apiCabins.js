import supabase, { supabaseUrl } from "./supabase";

export async function getCabins() {
  const { data, error } = await supabase.from("cabins").select("*");

  if (error) {
    console.error(error);
    throw new Error("Cabins could not be loaded.");
  }
  return data;
}

export async function createEditCabin(newCabin, id) {
  console.log(newCabin, id);
  const hasImagePath = newCabin.image?.startsWith?.(supabaseUrl);
  const imageName = `${Math.random()}-${newCabin.image.name}`.replaceAll(
    "/",
    ""
  );

  const imagePath = hasImagePath
    ? newCabin.image
    : `${supabaseUrl}/storage/v1/object/public/cabin-images/${imageName}`;
  //https://tzjyrxnthfmcovazboly.supabase.co/storage/v1/object/public/cabin-images/cabin-001.jpg

  //1.Create/Edit cabin
  let query = supabase.from("cabins");

  // A) CREATE
  if (!id) query = query.insert([{ ...newCabin, image: imagePath }]);
  // .select() //imed return the row we inserted
  // .single(); //out of arrray

  //B) EDIT

  if (id) query = query.update({ ...newCabin, image: imagePath }).eq("id", id);

  const { data, error } = await query.select().single();

  if (error) {
    console.error(error);
    throw new Error("Cabin could not be created.");
  }

  //2.Upload image
  if (hasImagePath) return data;

  const { error: storageError } = await supabase.storage
    .from("cabin-images")
    .upload(imageName, newCabin.image);

  //3.Delete cabin if there was an Error uploading image
  if (storageError) {
    console.error(storageError);

    //Delete image from Storage bucket??
    const { error: imagePathRemoveError } = await supabase.storage
      .from("cabin-images")
      .remove([data.image]);

    //Delete cabin from Table
    await supabase.from("cabins").delete().eq("id", data.id);

    if (imagePathRemoveError)
      throw new Error(
        "Cabin photo could not be uploaded and the cabin was not created."
      );
  }
  return data;
}

export async function deleteCabin(id) {
  //Delete cabin from Tabel and UI
  const { data, error } = await supabase.from("cabins").delete().eq("id", id);

  // Delete image from Storage bucket

  if (error) {
    console.error(error);
    throw new Error("Cabins could not be deleted.");
  }
  return data;
}
