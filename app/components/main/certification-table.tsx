import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Box,
  Table,
  Typography,
} from "@mui/joy";
import { useEffect, useState } from "react";
import { convertToDateObj } from "../../utils/date-formater";
import { supabase } from "../../utils/supabase";

const FILTER_OPTIONS = {
  POPULARITY: "인기순",
  EXAM_DATE_ASC: "시험날짜 빠른 순",
  JOBS_CNT: "채용공고 순",
};

async function fetchCertificationTable() {
  const { data, error } = await supabase
    .from("certification")
    .select("code_kor, id, jmcd, seriescd")
    .not("jmcd", "is", null)
    .not("seriescd", "is", null)
    .limit(10);

  if (error) {
    console.error("Error fetching data:", error);
    return [];
  }
  return data.map((item) => ({
    name: item.code_kor,
    id: item.id,
    jmCode: item.jmcd,
    seriesCode: item.seriescd,
  }));
}

function getNearestFutureExamDate(testDates) {
  let today = new Date();
  let nearestTest = null;
  let minDatesLeft = Infinity;
  console.log("getnearest", testDates);
  for (let i = 0; i < testDates.length; i++) {
    let testDate = convertToDateObj(testDates[i].pracexamstartdt);
    let datesLeft = testDate - today;
    if (datesLeft > 0 && datesLeft < minDatesLeft) {
      minDatesLeft = datesLeft;
      nearestTest = testDates[i];
    }
  }
  if (minDatesLeft === Infinity) nearestTest = testDates[testDates.length - 1];
  return nearestTest;
}

async function fetchCertificationDate(seriescd) {
  try {
    const response = await fetch("../../../data/exam-date.json");

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    const data = await response.json();
    let filteredData = data.items.filter((testDate) => {
      const [seriesPrefix] = testDate.seriescd.split("_");
      return seriesPrefix === seriescd;
    });
    let examDate = getNearestFutureExamDate(filteredData);
    return {
      pracExamStartDate: examDate.pracexamstartdt,
      pracExamEndDate: examDate.pracexamenddt,
      docExamStartDate: examDate.docexamdt,
      examDescription: examDate.description,
    };
  } catch (error) {
    console.error("Error fetching JSON file:", error);
    return [];
  }
}

async function fetchCertification() {
  const { data, error } = await supabase
    .from("certification")
    .select("code_kor, id, jmcd, seriescd")
    .not("jmcd", "is", null)
    .not("seriescd", "is", null);

  if (error) {
    console.error("Error fetching data:", error);
    return [];
  }
  return data.map((item) => ({
    name: item.code_kor,
    id: item.id,
    jmcd: item.jmcd,
    seriescd: item.seriescd,
  }));
}

async function fetchCertificationData(filter) {
  let data = "";
  let details = "";
  switch (filter) {
    case "POPULARITY":
      details = await fetchCertifications();
      data = await Promise.all(
        details.map(async (detail) => {
          const { name, seriescd } = await fetchCertificationName(detail.id);
          return { ...detail, name };
        }),
      );
      break;
    case "EXAM_DATE_ASC":
      details = await fetchCertificationTable();
      console.log("EXAM_DATE_ASC", details);

      data = await Promise.all(
        details.map(async (detail) => {
          const dateData = await fetchCertificationDate(detail.seriesCode);
          return { ...detail, ...dateData };
        }),
      );
      console.log("EXAM_DATE_ASC data!!", data);
      break;
    case "JOBS_CNT":
      details = await fetchCertificationsFilteredByJobsCnt();
      console.log("fetchCertificationData1", details);

      data = await Promise.all(
        details.map(async (detail) => {
          const { name, seriescd } = await fetchCertificationName(detail.id);
          console.log("seriescd", seriescd);
          // const date = await useCertificationDateInfo(examTypeCode);
          return { ...detail, name };
        }),
      );
      break;
    default:
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
    .select("*")
    .eq("id", id);
  if (error) {
    throw new Error(`Error fetching certification name: ${error.message}`);
  }
  console.log("fetchCertificationName", data);
  return { name: data[0].code_kor, code: data[0].seriescd };
}

function parseYYYYmmDD(yyyymmdd) {
  console.log(yyyymmdd);
  const year = yyyymmdd.substring(0, 4);
  const month = yyyymmdd.substring(4, 6);
  const date = yyyymmdd.substring(6, 8);
  return { year, month, date };
}

function CertificationTable({ filterComponentProps }) {
  const { filter, setFilter } = filterComponentProps;
  const [error, setError] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(true);
  const [certifications, setCertifications] = useState<CertificationInfo[]>([]);

  // let examDateObj = useCertificationDateInfo("02");
  // console.log("useCertificationDate", examDateObj);

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
                  <Typography>
                    {certification.examDescription} <br></br>
                    지원자: XX명<br></br>
                    필기 시험 일자: {certification.docExamStartDate}
                    <br></br>
                    실기 시험 시작 일자: {certification.pracExamStartDate}
                    <br></br>
                    실기 시험 종료 일자: {certification.pracExamEndDate}
                  </Typography>
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
