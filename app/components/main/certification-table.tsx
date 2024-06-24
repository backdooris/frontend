import { Container, Accordion, AccordionDetails, AccordionGroup, AccordionSummary } from "@mui/joy";
import { MainHeader } from "../components/detail/main-header";
import { RecruitmentNotice } from "../components/detail/recruitment-notice";
import { useState, useEffect } from 'react';
import { supabase } from "../../utils/supabase";

async function fetchCertifications() {
  const { data, error } = await supabase
    .from('certification_detail')
    .select('certification, data->jobs_cnt')
    .limit(10); 

  if (error) {
    console.error('Error fetching data:', error);
    return [];
  }

  return data.map(item => ({
    id: item.certification,
    jobsCnt: item.jobs_cnt,
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
  return data[0].code_kor;
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

        const combinedData: CertificationInfo[] = await Promise.all(
          details.map(async (detail) => {
            const name = await fetchCertificationName(detail.id);
            return { ...detail, name };
          })
        );
        setCertifications(combinedData);

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
              <AccordionDetails>3 Depth (채용 공고 수: {certification.jobsCnt}) 지원자: </AccordionDetails>
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



export { CertificationTable };

type Certifications = CertificationInfo[];

interface CertificationInfo {
  id: string,
  name: string,
  jobsCnt: string
  examDate: string
}