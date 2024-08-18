import { useQuery } from "@tanstack/react-query";
import { supabase } from "../../utils/supabase";
import { ExamInfo } from "../types/Qualification";

const fetchExamInfo = async (jmcd: string): Promise<ExamInfo[]> => {
  const { data, error } = await supabase
    .from("certification_exam_stat")
    .select(
      `
        id,
        year,
        exam_type,
        applicant_count,
        candidate_count,
        passer_count,
        certification!inner()
      `,
    )
    .eq("certification.jmcd", jmcd)
    .order("year", {
      ascending: true,
    });

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

export const useQStatsExamInfo = (jmcd: string) => {
  return useQuery<ExamInfo[], Error>({
    queryKey: ["ExamInfo"],
    queryFn: () => fetchExamInfo(jmcd),
    staleTime: 5 * 60 * 1000, // 5 minutes
  });
};
