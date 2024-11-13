import { Stack } from "@mui/joy";
import { useEffect, useState } from "react";
import { CertificationInfo } from "../../api/types/Qualification";
import CertificationCardList from "./certification-card-list";
import CertificationCardTable from "./certification-card-table";
import { SearchBox } from "./search-box";


function searchCertifications(certifications:CertificationInfo[], searchTerm:string) {
  if (!searchTerm) return certifications;

  return certifications.filter((certification) =>
    certification.name.includes(searchTerm),
  );
}

export default function CertificationCardView({ certifications }: CertificationCardViewProps) {
  const [searchTerm, setSearchTerm] = useState("");
  const [searchResults, setSearchResults] = useState<CertificationInfo[]>([]);
  const [showCardList, setShowCardList] = useState(false);

  useEffect(() => {

    if (searchTerm !== "") {
      let matchingCertifications = searchCertifications(certifications, searchTerm);
      setSearchResults(matchingCertifications);
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
            certifications={searchResults}
            setShowCardList={setShowCardList}
          ></CertificationCardList>
        ) : (
          <CertificationCardTable />
        )}
      </Stack>
    </>
  );
}

interface CertificationCardViewProps {
  certifications: CertificationInfo[];
}
