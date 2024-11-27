import { useQuery } from "@tanstack/react-query";
import { supabase } from "../../utils/supabase";
import { RegionSiDoType } from "../types/Region";

const fetchRegionSiDo = async (): Promise<RegionSiDoType[]> => {
  const { data, error } = await supabase
    .from("region_si")
    .select(
      `
      sido_id,
      sido_name
      `,
    )
    .order("sido_name");

  if (error) {
    console.error("Error fetching data:", error);
    return [];
  } else {
    if (data === null || data.length === 0) {
      return [];
    }
    const seen = new Set<number>();
    return data.filter((item) => {
      if (seen.has(item.sido_id)) {
        return false;
      }
      seen.add(item.sido_id);
      return true;
    });
  }
};

export const useRegionSiDo = () => {
  return useQuery<RegionSiDoType[], Error>({
    queryKey: ["RegionSiDo"],
    queryFn: () => fetchRegionSiDo(),
    staleTime: 5 * 60 * 1000, // 5 minutes
  });
};
