import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Box,
  Table,
  Typography,
} from "@mui/joy";
import { useState } from "react";
import { convertToDateObj } from "../../utils/date-formater";
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



function parseYYYYmmDD(yyyymmdd) {
  console.log(yyyymmdd);
  const year = yyyymmdd.substring(0, 4);
  const month = yyyymmdd.substring(4, 6);
  const date = yyyymmdd.substring(6, 8);
  return { year, month, date };
}

function CertificationTable({ filterComponentProps, filteredCertifications }) {
  const { filter, setFilter } = filterComponentProps;
  const [error, setError] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(true);
  const [certifications, setCertifications] = useState<CertificationInfo[]>([]);

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

      {filteredCertifications?.map((certification) => (
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
                    채용 공고 수 : {certification.jobCount} 지원자 :{" "}
                    {certification.jobApplicants} 명
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
                    {/* 지원자: XX명<br></br> */}
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
  jobCount: string;
  examDate: string;
  jobApplicants: string;
  jmCode: string;
  seriesCode: string;
}
