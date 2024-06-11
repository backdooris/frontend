import { Container } from "@mui/joy";
import { MainHeader } from "../components/detail/main-header";
import { QualificationTable } from "../components/main/qualification-table";
import { QualificationCardTable } from "../components/main/qualification-card-table";
import { RecruitmentNotice } from "../components/detail/recruitment-notice";
import { SearchBox } from "../components/main/search-box";
import { DropDownMenu } from "../components/main/drop-down-menu";
import { Typography } from "@mui/joy";

export const Component = function MainPage(): JSX.Element {
  return (
    <Container sx={{ py: 2 }}>
      <Typography level="h1">LOGO</Typography>
      <DropDownMenu/>
      <QualificationTable />
      <SearchBox/>
      <QualificationCardTable />
    </Container>
  );
};
