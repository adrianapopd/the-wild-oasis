import { useQuery } from "@tanstack/react-query";
import { getBooking } from "../../services/apiBookings";
import { useParams } from "react-router-dom";

export function useBooking() {
  //same neme put in Route!
  const { bookingId } = useParams();

  const {
    isLoading,
    data: booking,
    error,
  } = useQuery({
    queryKey: ["booking", bookingId],
    queryFn: () => getBooking(bookingId),
    //Bcuz React Query trys to fetch data 3x in case of fails in the beginning(Default), but in this case not finding data means it doesnt EXIST in the first case!
    retry: false,
  });
  return { isLoading, error, booking };
}
