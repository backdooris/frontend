import { useQuery } from "@tanstack/react-query";
import { supabase } from "../../utils/supabase";
import { RegionSiGunGuType } from "../types/Region";

const fetchRegionSiGunGu = async (
  sido_id: number | undefined,
): Promise<RegionSiGunGuType[]> => {
  if (!sido_id) {
    return [];
  }

  const { data, error } = await supabase
    .from("region")
    .select(
      `
      sido_id,
      id,
      sigungu_name
      `,
    )
    .eq("sido_id", sido_id)
    .order("sido_name");

  if (error) {
    console.error("Error fetching data:", error);
    return [];
  } else {
    if (data === null || data.length === 0) {
      return [];
    }
    return data;
  }
};

export const useRegionSiGunGu = (sido_id: number | undefined) => {
  return useQuery<RegionSiGunGuType[], Error>({
    queryKey: ["RegionSiGunGu", sido_id],
    queryFn: () => fetchRegionSiGunGu(sido_id),
    staleTime: 5 * 60 * 1000, // 5 minutes
  });
};
