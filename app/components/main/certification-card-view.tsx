import { useState, useEffect } from "react";
import { CertificationCardTable } from "./certification-card-table.tsx";
import { SearchBox } from "./search-box.tsx";
import { supabase } from "../../utils/supabase";
import { Table, Stack } from "@mui/joy";

async function fetchCertificationNameId(searchTerm){
  const { data, error } = await supabase
  .from("certification")
  .select("code_kor, id")
  .ilike('code_kor', `%${searchTerm}%`);

  if (error) {
    console.error("Error fetching data:", error);
    return [];
  }
  return data.map((item) => ({
    name: item.code_kor,
    id: item.id
  }));
}

async function fetchCertificationJobsCnt(id){
  const { data, error } = await supabase
  .from("certification_detail")
  .select("job_total_cnt")
  .eq("certification", id);
  if (error) {
    throw new Error(`Error fetching certification name: ${error.message}`);
  }
  return data[1].job_total_cnt;
}


export default function CertificationCardView() {
  const [searchTerm, setSearchTerm] = useState("");
  const [certifications, setCertifications] = useState<CertificationInfo[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const certificationsInfo = await fetchCertificationNameId(searchTerm);

        let certificationsWithJobs = await Promise.all(
          certificationsInfo.map( async (certification) => {
            let jobsCnt = await fetchCertificationJobsCnt(certification.id);
            return {...certification, jobsCnt}
          }),
        )
          setCertifications(certificationsWithJobs);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    if (searchTerm !== "") {
      fetchData();
    }
  }, [searchTerm]);

    return(
      <>
      <Stack spacing={2}>

        <SearchBox searchTerm={searchTerm} setSearchTerm={setSearchTerm} />
        <Table
          borderAxis="xBetween"
          color="neutral"
          size="lg"
          stickyHeader={false}
          variant="outlined"
        >
          <thead>
            <tr>
              <th style={{ width: '40%' }}>자격명</th>
              <th>시험 날짜</th>
              <th>채용공고 수</th>
            </tr>
          </thead>

          <tbody>
            {certifications?.map((certification) => (
            <tr key={certification.name}>
              <td>{certification.name}</td>
              <td>{certification.jobsCnt}</td>
              <td>{certification.jobsCnt}</td>
            </tr>
            ))
            }

          </tbody>

          </Table>

        {/* <CertificationCardTable/> */}
        </Stack>
      </>
    )
}

type Certifications = CertificationInfo[];

interface CertificationInfo {
  id: string;
  name: string;
  jobsCnt: string;
  examDate: string;
}