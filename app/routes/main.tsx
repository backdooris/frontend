import { Container } from "@mui/joy";
import CertificationFilterView from "../components/main/certification-filter-view";
import { CertificationCardTable } from "../components/main/certification-card-table";
import { CertificationSearchModal } from "../components/main/certification-search-modal";
import { RecruitmentNotice } from "../components/detail/recruitment-notice";
import { SearchBox } from "../components/main/search-box";
import { Typography } from "@mui/joy";




export const Component = function MainPage(): JSX.Element {


  return (
    <Container sx={{ py: 2 }}>
      <Typography level="h1">LOGO</Typography>
      <CertificationFilterView/>
      <CertificationSearchModal/>
      <SearchBox/>
      <CertificationCardTable />
    </Container>
  );
};


