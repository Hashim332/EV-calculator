import { useQuery } from "@tanstack/react-query";
import { supabase } from "../supabase";
import type { Vehicle } from "../types";

const fetchVehicles = async (): Promise<Vehicle[]> => {
  const { data, error } = await supabase.from("vehicle-data").select("*");

  if (error) {
    throw error;
  }

  return data || [];
};

export const useVehicles = () => {
  return useQuery({
    queryKey: ["vehicles"],
    queryFn: fetchVehicles,
    staleTime: 1000 * 60 * 5, // 5 minutes
    gcTime: 1000 * 60 * 30, // 30 minutes - vehicles don't change often
  });
};
