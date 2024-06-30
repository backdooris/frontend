import { useQuery } from "@tanstack/react-query";
import { JobInfoItem } from "../components/detail/recruitment-notice";
import { supabase } from "../utils/supabase";

const fetchJobInfos = async (): Promise<JobInfoItem[]> => {
  const { data, error } = await supabase
    .from("job")
    .select(
      "id, created_at, updated_at, region_kor, data, date_enrolled, date_end, key",
    )
    .limit(100);

  if (error) {
    console.error("Error fetching data:", error);
    return [];
  } else {
    return data;
  }
};

export const useJobInfos = () => {
  return useQuery<JobInfoItem[], Error>({
    queryKey: ["jobInfos"],
    queryFn: fetchJobInfos,
  });
};
