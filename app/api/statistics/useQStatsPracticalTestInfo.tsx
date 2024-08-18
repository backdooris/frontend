import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { StatisticInfo } from "../types/Qualification";

const url = (jmcd: string) =>
  `/openapi/InquiryStatSVC/getEventYearPiList?serviceKey=nBhC8BCfrfbRbi%2FqxhY5ds%2BZ7CYtYXYkFKCgbf%2B0fc2S5eqXxFshv4%2FgqddA2Ch4j18Eis1SmFu7AtXE%2B%2FzOLQ%3D%3D&baseYY=2017&jmCd=${jmcd}`;

const fetchQStatsPracticalTestInfo = async (
  jmcd: string,
): Promise<StatisticInfo | undefined> => {
  const response = await axios.get(url(jmcd));

  const data = response.data.response;

  if (data.header.resultCode == "00") {
    return data.body.items.item;
  }
  return undefined;
};

export const useQStatsPracticalTestInfo = (jmcd: string) => {
  return useQuery<StatisticInfo | undefined, Error>({
    queryKey: ["qStatsPracticalTestInfo"],
    queryFn: () => fetchQStatsPracticalTestInfo(jmcd),
    staleTime: 60 * 60 * 1000, // 1hour
  });
};
