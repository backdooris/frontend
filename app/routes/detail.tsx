/* SPDX-FileCopyrightText: 2014-present Kriasoft */
/* SPDX-License-Identifier: MIT */

import { Container } from "@mui/joy";
import { MainHeader } from "../components/detail/main-header";
import { QualificationDetail } from "../components/detail/qualification-detail";
import { RecruitmentNotice } from "../components/detail/recruitment-notice";

export const Component = function Detail(): JSX.Element {
  return (
    <Container sx={{ py: 2 }}>
      <MainHeader />
      <QualificationDetail />
      <RecruitmentNotice />
    </Container>
  );
};
