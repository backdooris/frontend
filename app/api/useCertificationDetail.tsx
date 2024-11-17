import { useQuery } from "@tanstack/react-query";
import { supabase } from "../utils/supabase";
import { CertificationDetail } from "./types/Qualification";

const fetchCertificationInfo = async (
  jmcd: string | undefined,
): Promise<CertificationDetail | null> => {
  if (jmcd == undefined) {
    return null;
  }

  const { data, error } = await supabase
    .from("certification_detail")
    .select(
      `
    id,
    data,
    ...certification!inner (
      jmcd,
      content
    )
    `,
    )
    .eq("certification.jmcd", jmcd)
    .order("created_at", {
      ascending: false,
    })
    .limit(1);

  if (error) {
    console.error("Error fetching data:", error);
    return null;
  } else {
    if (data === null || data.length === 0) {
      return null;
    }
    return data[0];
  }
};

export const useCertificationInfo = (jmcd: string | undefined) => {
  return useQuery<CertificationDetail | null, Error>({
    queryKey: ["certificationInfo"],
    queryFn: () => fetchCertificationInfo(jmcd),
    staleTime: 5 * 60 * 1000, // 5 minutes
  });
};
