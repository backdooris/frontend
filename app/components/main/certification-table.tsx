import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Box,
  Table,
  Typography,
} from "@mui/joy";
import { CertificationInfo } from "../../api/types/Qualification";

function CertificationTable({ filteredCertifications }: CertificationTableProps) {

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

enum FilterType {
  Popularity = "인기도순",
  Recruitment = "채용순",
  ExamDate = "시험 날짜 순",
}

interface FilterComponentProps {
  filter: string;
  setFilter: (filter: FilterType) => void;
}

interface CertificationTableProps {
  filterComponentProps : FilterComponentProps
  filteredCertifications : CertificationInfo[]
}
