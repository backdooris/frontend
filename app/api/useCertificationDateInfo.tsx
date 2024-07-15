import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { CertificationDate } from "./types/Qualification";

const ExamType = {
  "01": "getPEList",   // 기술사
  "02": "getMCList",   // 기능장
  "03": "getEList",    // 기사 산업기사
  "04": "getCList",    // 기능사
};

const BASE_URL = "/openapi/InquiryTestInformationNTQSVC";
const SERVICE_KEY = "nBhC8BCfrfbRbi%2FqxhY5ds%2BZ7CYtYXYkFKCgbf%2B0fc2S5eqXxFshv4%2FgqddA2Ch4j18Eis1SmFu7AtXE%2B%2FzOLQ%3D%3D";

const formatApiUrl = (examTypeCode: string): string => {
  let examType = ExamType[examTypeCode as keyof typeof ExamType];
  return `${BASE_URL}/${examType}?serviceKey=${SERVICE_KEY}`;
};

const fetchCertificationDateInfo = async (
  examTypeCode: string,
): Promise<CertificationDate[]> => {
  const url = formatApiUrl(examTypeCode);
  const response = await axios.get(url);
  const data = response.data.response;
  
  if (data.header.resultCode == "00") {
    return data.body.items;
  }
  return [];
};

export const useCertificationDateInfo = (
  examTypeCode: keyof typeof ExamType,
) => {
  return useQuery<CertificationDate[], Error>({
    queryKey: ["qualificationInfos", examTypeCode],
    queryFn: () => fetchCertificationDateInfo(examTypeCode),
    staleTime: 60 * 60 * 1000, // 1hour
  });
};
