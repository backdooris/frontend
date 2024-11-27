import { useQuery } from "@tanstack/react-query";
import { JobInfoItem } from "../components/detail/recruitment-notice";
import { supabase } from "../utils/supabase";

const fetchJobInfos = async (regions: number[]): Promise<JobInfoItem[]> => {
  const { data, error } = await supabase
    .from("job")
    .select(
      "id, created_at, updated_at, region_kor, data, date_enrolled, date_end, key",
    )
    .in("region", regions)
    .limit(100);

  if (error) {
    console.error("Error fetching data:", error);
    return [];
  } else {
    return data;
  }
};

export const useJobInfos = (regions: number[]) => {
  return useQuery<JobInfoItem[], Error>({
    queryKey: ["jobInfos", regions],
    queryFn: () => fetchJobInfos(regions),
    staleTime: 5 * 60 * 1000 // 5 minutes
  });
};
