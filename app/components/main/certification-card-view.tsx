import { Stack } from "@mui/joy";
import { useEffect, useState } from "react";
import { supabase } from "../../utils/supabase";
import CertificationCardList from "./certification-card-list";
import CertificationCardTable from "./certification-card-table";
import { SearchBox } from "./search-box";

async function fetchCertificationNameId(searchTerm) {
  const { data, error } = await supabase
    .from("certification")
    .select("code_kor, id, jmcd")
    .ilike("code_kor", `%${searchTerm}%`);

  if (error) {
    console.error("Error fetching data:", error);
    return [];
  }
  return data.map((item) => ({
    name: item.code_kor,
    id: item.id,
    jmcd: item.jmcd
  }));
}

async function fetchCertificationJobsCnt(id) {
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
  const [showCardList, setShowCardList] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const certificationsInfo = await fetchCertificationNameId(searchTerm);

        const certificationsWithJobs = await Promise.all(
          certificationsInfo.map(async (certification) => {
            const jobsCnt = await fetchCertificationJobsCnt(certification.id);
            return { ...certification, jobsCnt };
          }),
        );
        setCertifications(certificationsWithJobs);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    if (searchTerm !== "") {
      fetchData();
    }
  }, [searchTerm]);

  return (
    <>
      <Stack spacing={2}>
        <SearchBox
          searchTerm={searchTerm}
          setSearchTerm={setSearchTerm}
          setShowCardList={setShowCardList}
        />
        {showCardList ? (
          <CertificationCardList
            certifications={certifications}
            setShowCardList={setShowCardList}
          ></CertificationCardList>
        ) : (
          <CertificationCardTable />
        )}
      </Stack>
    </>
  );
}

type Certifications = CertificationInfo[];

interface CertificationInfo {
  id: string;
  name: string;
  jobsCnt: string;
  examDate: string;
}
