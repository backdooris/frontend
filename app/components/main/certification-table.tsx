import { Container, Accordion, AccordionDetails, AccordionGroup, AccordionSummary } from "@mui/joy";
import { MainHeader } from "../components/detail/main-header";
import { RecruitmentNotice } from "../components/detail/recruitment-notice";
import { useState, useEffect } from 'react';
import { supabase } from "../../utils/supabase";

async function fetchCertifications() {
  const { data, error } = await supabase
    .from('certification_detail')
    .select('certification', 'data')
    .limit(10); 

  if (error) {
    console.error('Error fetching data:', error);
    return [];
  }
  console.log(data)

  return data.map(item => ({
    certification: item.certification,
    jobs_cnt: item.jobs_cnt,
  }));
}

async function fetchCertificationName(id: string) {
  const { data, error } = await supabase
    .from('certification')
    .select('code_kor')
    .eq('id', id)    
  if (error) {
    throw new Error(`Error fetching certification name: ${error.message}`);
  }
  return data.name;
}

function CertificationTable({name, jobsCnt, applicantsCnt, examDate }){
  const [error, setError] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(true);
  const [certifications, setCertifications] = useState<CertificationInfo[]>([]);

  useEffect(() => {
    async function fetchAndCombineData() {
      try {
        setLoading(true);
        const details = await fetchCertifications();
        console.log('details', details)

        const combinedData: CertificationInfo[] = await Promise.all(
          details.map(async (detail) => {
            const name = await fetchCertificationName(detail.certification);

            return { ...detail, name };
          })
        );
        setCertifications(details);

      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    }

    fetchAndCombineData();
  }, []);



  return(
    <>
    {certifications.map(certification => (
          <AccordionGroup size={"lg"} key={certification.name}>
          <Accordion>
            <AccordionSummary>1 Depth (자격증 명: {certification.name})</AccordionSummary>
            <Accordion>
              <AccordionSummary>2 Depth (채용 관련)</AccordionSummary>
              <AccordionDetails>3 Depth (채용 공고 수: 2XX 개) 지원자: {certification.name}</AccordionDetails>
            </Accordion>
            <Accordion>
              <AccordionSummary>2 Depth (자격증 관련)</AccordionSummary>
              <AccordionDetails>3 Depth (지원자: 2X 명) 시험 날짜: {certification.name}</AccordionDetails>
            </Accordion>
          </Accordion>
        </AccordionGroup>
    ))}
    </>
  )
}
  //   <div>자격증 시험 날짜 채용공고 수</div>
  //   <AccordionGroup size={"lg"}>
  //     <Accordion>
  //       <AccordionSummary>1 Depth (자격증 명: {certifications.name})</AccordionSummary>
  //       <Accordion>
  //         <AccordionSummary>2 Depth (채용 관련)</AccordionSummary>
  //         <AccordionDetails>3 Depth (채용 공고 수: 2XX 개) 지원자: {certifications.name}</AccordionDetails>
  //       </Accordion>
  //       <Accordion>
  //         <AccordionSummary>2 Depth (자격증 관련)</AccordionSummary>
  //         <AccordionDetails>3 Depth (지원자: 2X 명) 시험 날짜: {certifications.name}</AccordionDetails>
  //       </Accordion>
  //     </Accordion>

  //     <Accordion>
  //       <AccordionSummary>1 Depth (자격증 명: 굴삭기운전기능사)</AccordionSummary>
  //     <Accordion>
  //       <AccordionSummary>2 Depth (채용 관련)</AccordionSummary>
  //       <AccordionDetails>3 Depth (채용 공고 수: 2XX 개) 지원자: XX명</AccordionDetails>
  //     </Accordion>
  //     <Accordion>
  //       <AccordionSummary>2 Depth (자격증 관련)</AccordionSummary>
  //       <AccordionDetails>3 Depth (지원자: 2X 명) 시험 날짜: YYYY.MM.DD</AccordionDetails>
  //     </Accordion>
  //     </Accordion>
  //   </AccordionGroup>
  // </>


export { CertificationTable };

type Certifications = CertificationInfo[];

interface CertificationInfo {
  id: string,
  name: string,
  jobsCnt: string
  examDate: string
}