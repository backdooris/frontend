import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { Qualification } from "./types/Qualification";

// no content

const url =
  "/openapi/InquiryInformationTradeNTQSVC/getList?serviceKey=nBhC8BCfrfbRbi%2FqxhY5ds%2BZ7CYtYXYkFKCgbf%2B0fc2S5eqXxFshv4%2FgqddA2Ch4j18Eis1SmFu7AtXE%2B%2FzOLQ%3D%3D&stdt=2023";

const fetchQualificationInfos = async (): Promise<Qualification[]> => {
  const response = await axios.get(url, {
    headers: {
      "Cache-Control": "no-cache", // 304 error 발생으로 캐시 정책 삭제
      Pragma: "no-cache",
    },
  });

  const data = response.data.response;
  if (data.header.resultCode == "00") {
    return data.body.items;
  }
  return [];
};

export const useQualificationInfos = () => {
  return useQuery<Qualification[], Error>({
    queryKey: ["qualificationInfos"],
    queryFn: fetchQualificationInfos,
    staleTime: 60 * 60 * 1000, // 1hour
  });
};
