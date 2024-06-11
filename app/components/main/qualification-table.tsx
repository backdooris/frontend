import { Container, Accordion, AccordionDetails, AccordionGroup, AccordionSummary } from "@mui/joy";
import { MainHeader } from "../components/detail/main-header";
import { RecruitmentNotice } from "../components/detail/recruitment-notice";

function QualificationTable(){
  return(
    <>
    <div>자격증 시험 날짜 채용공고 수</div>
    <AccordionGroup size={"lg"}>
      <Accordion>
        <AccordionSummary>1 Depth (자격증 명: 지게차운전기능사)</AccordionSummary>
        <Accordion>
          <AccordionSummary>2 Depth (채용 관련)</AccordionSummary>
          <AccordionDetails>3 Depth (채용 공고 수: 2XX 개) 지원자: XX명</AccordionDetails>
        </Accordion>
        <Accordion>
          <AccordionSummary>2 Depth (자격증 관련)</AccordionSummary>
          <AccordionDetails>3 Depth (지원자: 2X 명) 시험 날짜: YYYY.MM.DD</AccordionDetails>
        </Accordion>
      </Accordion>

      <Accordion>
        <AccordionSummary>1 Depth (자격증 명: 굴삭기운전기능사)</AccordionSummary>
      <Accordion>
        <AccordionSummary>2 Depth (채용 관련)</AccordionSummary>
        <AccordionDetails>3 Depth (채용 공고 수: 2XX 개) 지원자: XX명</AccordionDetails>
      </Accordion>
      <Accordion>
        <AccordionSummary>2 Depth (자격증 관련)</AccordionSummary>
        <AccordionDetails>3 Depth (지원자: 2X 명) 시험 날짜: YYYY.MM.DD</AccordionDetails>
      </Accordion>
      </Accordion>
    </AccordionGroup>
  </>
  )
}

export { QualificationTable };
