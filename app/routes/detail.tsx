/* SPDX-FileCopyrightText: 2014-present Kriasoft */
/* SPDX-License-Identifier: MIT */

import { CircularProgress, Container } from "@mui/joy";
import { useQualificationInfos } from "../api/useQualficationInfos";
import { useQualifications } from "../api/useQualfications";
import { MainHeader } from "../components/detail/main-header";
import { QualificationDetail } from "../components/detail/qualification-detail";
import { RecruitmentNotice } from "../components/detail/recruitment-notice";

export const Component = function Detail(): JSX.Element {
  const { data: qualifications, isLoading: isLoading1 } = useQualifications();
  const { data: qualificationInfos, isLoading: isLoading2 } =
    useQualificationInfos();
  if (isLoading1 || isLoading2) return <CircularProgress />;

  console.log(qualifications, qualificationInfos);

  return (
    <Container sx={{ py: 2 }}>
      <MainHeader />
      <QualificationDetail />
      <RecruitmentNotice />
    </Container>
  );
};
