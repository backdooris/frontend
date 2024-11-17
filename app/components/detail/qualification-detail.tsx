import {
  Box,
  Button,
  ButtonGroup,
  Card,
  Container,
  ContainerProps,
  Stack,
  Typography,
} from "@mui/joy";
import "chart.js/auto";
import { useState } from "react";
import { useCertificationInfo } from "../../api/useCertificationDetail";
import StatisticsDetail from "./statistics-detail";

export function QualificationDetail(
  props: QualificationDetailProps,
): JSX.Element {
  const { sx, jmcd, ...other } = props;
  const [selectedButton, setSelectedButton] = useState<MenuType>(MenuType.Exam);
  const handleButtonClick = (button: MenuType) => {
    setSelectedButton(button);
  };

  return (
    <Container
      sx={{
        ...sx,
      }}
      {...other}
    >
      <Typography level="h2" sx={{ my: 5, ml: 2 }}>
        자격증 상세 정보
      </Typography>

      <Container>
        <Stack
          sx={{
            display: "flex",
            flexDirection: "row",
            alignItems: "center",
            backgroundColor: "#F0F1F5",
            my: 1,
          }}
        >
          <ButtonGroup
            sx={{ flex: 1 }}
            variant="soft"
            aria-label="soft button group"
          >
            <Button
              variant={selectedButton === MenuType.Exam ? "solid" : "soft"}
              onClick={() => handleButtonClick(MenuType.Exam)}
              sx={{
                fontSize: 24,
                flex: 1,
                maxWidth: "100%",
              }}
            >
              시험정보
            </Button>
            <Button
              variant={
                selectedButton === MenuType.Statistics ? "solid" : "soft"
              }
              onClick={() => handleButtonClick(MenuType.Statistics)}
              sx={{
                fontSize: 24,
                flex: 1,
                maxWidth: "100%",
              }}
            >
              통계 자료
            </Button>
          </ButtonGroup>
        </Stack>
        <ExamBox jmcd={jmcd} isShow={selectedButton === MenuType.Exam} />
        <StatisticsDetail
          jmcd={jmcd}
          isShow={selectedButton === MenuType.Statistics}
        />
      </Container>
    </Container>
  );
}

type ExamBoxProps = {
  jmcd?: string;
  isShow: boolean;
};

function ExamBox({ jmcd, isShow }: ExamBoxProps): JSX.Element {
  const { data, isLoading } = useCertificationInfo(jmcd);

  if (isLoading || data == undefined) {
    return <></>;
  }
  const content = data.content;

  return (
    <Box sx={{ mt: 3, display: isShow ? "block" : "none" }}>
      <Card>
        <Typography level="title-lg">{content.jmfldnm}</Typography>
        <Typography level="body-md">
          {content.intro}
          <br />
          <br />
          <br />
          {content.career_path}
          <br />
          <br />
          <br />
          {content.role}
        </Typography>
        <br />
        <Typography level="body-md">시험 날짜 2024.05.14 (D-14일)</Typography>
      </Card>
      <Box
        sx={{
          display: "flex",
          justifyContent: "right",
        }}
      >
        <Typography level="h4" sx={{ textDecoration: "underline" }}>
          자격증 훈련과정 알아보기
        </Typography>
      </Box>
    </Box>
  );
}

enum MenuType {
  Exam = "exam",
  Statistics = "statistics",
}

type QualificationDetailProps = Omit<ContainerProps, "children"> & {
  jmcd?: string;
};
