/* SPDX-FileCopyrightText: 2014-present Kriasoft */
/* SPDX-License-Identifier: MIT */

import { CircularProgress, Container } from "@mui/joy";
import { useQualificationInfos } from "../api/useQualficationInfos";
import { useQualifications } from "../api/useQualfications";
import { MainHeader } from "../components/detail/main-header";
import { QualificationDetail } from "../components/detail/qualification-detail";
import { RecruitmentNotice } from "../components/detail/recruitment-notice";
import { useSearchParams } from "react-router-dom";

export const Component = function Detail(): JSX.Element {
  const [searchParams] = useSearchParams();
  const jmcd = searchParams.get("jmcd");

  const { isLoading: isLoading1 } = useQualifications();
  const { isLoading: isLoading2 } = useQualificationInfos();
  console.log("isLoading1", isLoading1)
  console.log("isLoading2", isLoading2)
  if (isLoading1 || isLoading2) return <CircularProgress />;

  return (
    <Container sx={{ py: 2 }}>
      <MainHeader />
      <QualificationDetail jmcd={jmcd} />
      <RecruitmentNotice />
    </Container>
  );
};
