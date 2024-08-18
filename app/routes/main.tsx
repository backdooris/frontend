import { Container, Stack, Typography } from "@mui/joy";
import CertificationCardView from "../components/main/certification-card-view";
import CertificationFilterView from "../components/main/certification-filter-view";

export const Component = function MainPage(): JSX.Element {
  return (
    <Container sx={{ py: 2 }}>
      <Stack spacing={2}>
        <Typography level="h1">LOGO</Typography>
        <CertificationFilterView />
        <CertificationCardView />
      </Stack>
    </Container>
  );
};
