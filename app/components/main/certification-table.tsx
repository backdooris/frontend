import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Box,
  Table,
  Typography,
} from "@mui/joy";
import { useEffect, useState } from "react";
import { useCertificationDateInfo } from "../../api/useCertificationDateInfo";
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
          // const date = await useCertificationDateInfo(examTypeCode);
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
    .select("*")
    .not("data->>job_total_cnt", "is", null)
    .order("data->>job_total_cnt", { ascending: false })
    .limit(10);

  if (error) {
    console.error("Error fetching data:", error);
    return [];
  }
  console.log("data", data);

  return data.map((item) => ({
    id: item.certification,
    jobsCnt: item.data.job_total_cnt,
    jobsApplicant: item.data.job_total_apply_cnt,
  }));
}

async function fetchCertifications() {
  const { data, error } = await supabase
    .from("certification_detail")
    .select("*")
    .not("data->>job_total_cnt", "is", null)
    .order("created_at", { ascending: false })
    .limit(10);

  if (error) {
    console.error("Error fetching data:", error);
    return [];
  }
  console.log("data++++++", data);
  return data.map((item) => ({
    id: item.certification,
    jobsCnt: item.data.job_total_cnt,
    jobsApplicant: item.data.job_total_apply_cnt,
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
  console.log(useCertificationDateInfo("02"));
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
      <Table
        borderAxis="xBetween"
        color="neutral"
        size="lg"
        stickyHeader={false}
        variant="outlined"
      >
        <thead>
          <tr>
            <th style={{ width: "40%" }}>자격증</th>
            <th>시험 날짜</th>
            <th>채용공고 수</th>
          </tr>
        </thead>
      </Table>

      {certifications?.map((certification) => (
        <Accordion key={certification.name}>
          <AccordionSummary>
            <Typography>{certification.name}</Typography>
          </AccordionSummary>
          <AccordionDetails>
            <Box pl={2}>
              <Accordion>
                <AccordionSummary>
                  <Typography>채용 관련</Typography>
                </AccordionSummary>
                <AccordionDetails>
                  <Typography>
                    채용 공고 수 : {certification.jobsCnt} 지원자 :{" "}
                    {certification.jobsApplicant} 명
                  </Typography>
                </AccordionDetails>
              </Accordion>
            </Box>
          </AccordionDetails>
          <AccordionDetails>
            <Box pl={2}>
              <Accordion>
                <AccordionSummary>
                  <Typography>자격증 관련</Typography>
                </AccordionSummary>
                <AccordionDetails>
                  <Typography>지원자: XX명 준비 기간: XX</Typography>
                </AccordionDetails>
              </Accordion>
            </Box>
          </AccordionDetails>
        </Accordion>
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
  jobsApplicant: string;
}
