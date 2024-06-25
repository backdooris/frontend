import { Container, Stack} from "@mui/joy";
import CertificationFilterView from "../components/main/certification-filter-view";
import { CertificationCardTable } from "../components/main/certification-card-table";
import { CertificationSearchModal } from "../components/main/certification-search-modal";
import CertificationCardView from "../components/main/certification-card-view";
import { RecruitmentNotice } from "../components/detail/recruitment-notice";
import { SearchBox } from "../components/main/search-box";
import { Typography } from "@mui/joy";




export const Component = function MainPage(): JSX.Element {


  return (
    <Container sx={{ py: 2 }}>
      <Stack spacing={ 2 }>
      <Typography level="h1">LOGO</Typography>
      <CertificationFilterView/>
      <CertificationSearchModal/>
      <CertificationCardView/>
      </Stack>
    </Container>
  );
};


