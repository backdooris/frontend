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
import { Bar, Pie } from "react-chartjs-2";

export function QualificationDetail(
  props: QualificationDetailProps,
): JSX.Element {
  const { sx, ...other } = props;
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

        {selectedButton === MenuType.Exam && <ExamBox />}
        {selectedButton === MenuType.Statistics && <StatisticsBox />}
      </Container>
    </Container>
  );
}

function ExamBox(): JSX.Element {
  return (
    <Box sx={{ mt: 3 }}>
      <Card>
        <Typography level="title-lg">
          사회조사분석사{" "}
          <Typography
            level="title-lg"
            textColor="success.plainColor"
            fontFamily="monospace"
            sx={{ opacity: "50%" }}
          >
            title-lg
          </Typography>
        </Typography>
        <Typography level="body-md">
          사회조사분석사란 다양한 사회정보의 수집·분석·활용을 담당하는 새로운
          직종으로 기 업, 정당, 지방자치단체, 중앙정부 등 각종 단체의 시장조사
          및 여론조사 등에 대한 계 획을 수립하고 조사를 수행하며 그 결과를 분석,
          보고서를 작성하는 전문가이다. 지식 사회조사를 완벽하게 끝내기 위해서는
          '사회조사방법론'은 물론이고 자료분석을 위한 '통계지식', 통계분석을
          위한 '통계패키지프로그램' 이용법 등을 알아야 한다. 또, 부가적으로
          알아야 할 분야는 마케팅관리론이나 소비자행동론, 기획론 등의 주변
          관련분야로 이는 사회조사의 많은 부분이 기업과 소비자를 중심으로
          발생하기 때문이 다. 사회조사분석사는 보다 정밀한 조사업무를 수행하기
          위해 관련분야를 보다 폭넓게 경험하는 것이 중요하다
          <Typography
            level="body-md"
            textColor="success.plainColor"
            fontFamily="monospace"
            sx={{ opacity: "50%" }}
          >
            body-md
          </Typography>
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

const barData = {
  labels: ["January", "February", "March", "April", "May", "June"],
  datasets: [
    {
      label: "Monthly Sales",
      data: [65, 59, 80, 81, 56, 55],
      backgroundColor: "rgba(75, 192, 192, 0.2)",
      borderColor: "rgba(75, 192, 192, 1)",
      borderWidth: 1,
    },
  ],
};

const pieData = {
  labels: ["Red", "Blue", "Yellow", "Green", "Purple", "Orange"],
  datasets: [
    {
      label: "# of Votes",
      data: [12, 19, 3, 5, 2, 3],
      backgroundColor: [
        "rgba(255, 99, 132, 0.2)",
        "rgba(54, 162, 235, 0.2)",
        "rgba(255, 206, 86, 0.2)",
        "rgba(75, 192, 192, 0.2)",
        "rgba(153, 102, 255, 0.2)",
        "rgba(255, 159, 64, 0.2)",
      ],
      borderColor: [
        "rgba(255, 99, 132, 1)",
        "rgba(54, 162, 235, 1)",
        "rgba(255, 206, 86, 1)",
        "rgba(75, 192, 192, 1)",
        "rgba(153, 102, 255, 1)",
        "rgba(255, 159, 64, 1)",
      ],
      borderWidth: 1,
    },
  ],
};

function StatisticsBox(): JSX.Element {
  return (
    <Container sx={{}}>
      <Typography fontWeight="md" sx={{ mt: 2 }}>
        검정 현황
      </Typography>
      <Box
        sx={{
          display: "flex",
          justifyContent: "space-evenly",
          alignItems: "center",
          height: "10vh",
        }}
      >
        <Bar data={barData} />
        <Pie data={pieData} />
      </Box>

      <Typography fontWeight="md" sx={{ mt: 5 }}>
        수험자 동향
      </Typography>
      <Box
        sx={{
          display: "flex",
          justifyContent: "space-evenly",
          alignItems: "center",
          height: "10vh",
        }}
      >
        <Bar data={barData} />
        <Pie data={pieData} />
      </Box>
    </Container>
  );
}

enum MenuType {
  Exam = "exam",
  Statistics = "statistics",
}
type QualificationDetailProps = Omit<ContainerProps, "children">;
