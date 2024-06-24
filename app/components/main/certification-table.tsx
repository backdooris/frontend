import {
  Accordion,
  AccordionDetails,
  AccordionGroup,
  AccordionSummary,
} from "@mui/joy";
import { useEffect, useState } from "react";
import { supabase } from "../../utils/supabase";

const FILTER_OPTIONS = {
  POPULARITY: "인기순",
  EXAM_DATE_ASC: "시험날짜 빠른 순",
  JOBS_CNT: "채용공고 순",
};

async function fetchCertificationData(filter) {
  let data = "";
  let details = "";
  switch (filter) {
    case "POPULARITY":
      details = await fetchCertifications();
      data = await Promise.all(
        details.map(async (detail) => {
          const name = await fetchCertificationName(detail.id);
          return { ...detail, name };
        }),
      );
      break;
    case "EXAM_DATE_ASC":
      break;
    case "JOBS_CNT":
      details = await fetchCertificationsFilteredByJobsCnt();
      console.log("fetchCertificationData1", details);

      data = await Promise.all(
        details.map(async (detail) => {
          const name = await fetchCertificationName(detail.id);
          return { ...detail, name };
        }),
      );
      break;
    default:
      console.log("Unknown filter");
      break;
  }
  console.log("fetchCertificationData2", data);

  return data;
}

async function fetchCertificationsFilteredByJobsCnt() {
  const { data, error } = await supabase
    .from("certification_detail")
    .select("certification, data->>job_total_cnt")
    .order("data->>jobs_cnt", { ascending: false })
    .limit(10);

  if (error) {
    console.error("Error fetching data:", error);
    return [];
  }
  console.log("data", data);

  return data.map((item) => ({
    id: item.certification,
    jobsCnt: item.jobs_total_cnt,
  }));
}

async function fetchCertifications() {
  const { data, error } = await supabase
    .from("certification_detail")
    .select("certification, data->jobs_cnt")
    .limit(10);

  if (error) {
    console.error("Error fetching data:", error);
    return [];
  }

  return data.map((item) => ({
    id: item.certification,
    jobsCnt: item.jobs_cnt,
  }));
}

async function fetchCertificationName(id: string) {
  const { data, error } = await supabase
    .from("certification")
    .select("code_kor")
    .eq("id", id);
  if (error) {
    throw new Error(`Error fetching certification name: ${error.message}`);
  }
  return data[0].code_kor;
}

function CertificationTable({ filterComponentProps }) {
  const { filter, setFilter } = filterComponentProps;

  const [error, setError] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(true);
  const [certifications, setCertifications] = useState<CertificationInfo[]>([]);

  console.log(filterComponentProps);
  useEffect(() => {
    async function fetchAndCombineData(filter) {
      try {
        setLoading(true);
        const filteredData = await fetchCertificationData(filter);
        setCertifications(filteredData);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    }

    fetchAndCombineData(filter);
  }, [filter]);

  return (
    <>
      {certifications?.map((certification) => (
        <AccordionGroup size={"lg"} key={certification.name}>
          <Accordion>
            <AccordionSummary>자격증 명: {certification.name}</AccordionSummary>
            <Accordion>
              <AccordionSummary>2 Depth (채용 관련)</AccordionSummary>
              <AccordionDetails>
                3 Depth (채용 공고 수: {certification.jobsCnt}) 지원자:{" "}
              </AccordionDetails>
            </Accordion>
            <Accordion>
              <AccordionSummary>2 Depth (자격증 관련)</AccordionSummary>
              <AccordionDetails>
                3 Depth (지원자: 2X 명) 시험 날짜: {certification.name}
              </AccordionDetails>
            </Accordion>
          </Accordion>
        </AccordionGroup>
      ))}
    </>
  );
}

export { CertificationTable };

type Certifications = CertificationInfo[];

interface CertificationInfo {
  id: string;
  name: string;
  jobsCnt: string;
  examDate: string;
}
