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

export function QualificationDetail(
  props: QualificationDetailProps,
): JSX.Element {
  const { sx, ...other } = props;

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

      <Container
        sx={{
          mt: (x) => x.spacing(3),
        }}
      >
        <Stack
          sx={{
            display: "flex",
            flexDirection: "row",
            alignItems: "center",
            backgroundColor: "#F0F1F5",
            my: 1
          }}
        >
          <ButtonGroup
            sx={{ flex: 1 }}
            variant="soft"
            aria-label="soft button group"
          >
            <Button
              sx={{
                fontSize: 24,
                flex: 1,
                maxWidth: "100%",
              }}
            >
              시험정보
            </Button>
            <Button
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
        <Stack
          spacing={2}
          sx={{
            mt: 3,
          }}
        >
          <Card>
            <Typography level="title-lg">
              사회조사분석사{" "}
              <Typography
                level="title-lg"
                textColor="var(--joy-palette-success-plainColor)"
                fontFamily="monospace"
                sx={{ opacity: "50%" }}
              >
                title-lg
              </Typography>
            </Typography>
            <Typography level="body-md">
              사회조사분석사란 다양한 사회정보의 수집·분석·활용을 담당하는
              새로운 직종으로 기 업, 정당, 지방자치단체, 중앙정부 등 각종 단체의
              시장조사 및 여론조사 등에 대한 계 획을 수립하고 조사를 수행하며 그
              결과를 분석, 보고서를 작성하는 전문가이다. 지식 사회조사를
              완벽하게 끝내기 위해서는 '사회조사방법론'은 물론이고 자료분석을
              위한 '통계지식', 통계분석을 위한 '통계패키지프로그램' 이용법 등을
              알아야 한다. 또, 부가적으로 알아야 할 분야는 마케팅관리론이나
              소비자행동론, 기획론 등의 주변 관련분야로 이는 사회조사의 많은
              부분이 기업과 소비자를 중심으로 발생하기 때문이 다.
              사회조사분석사는 보다 정밀한 조사업무를 수행하기 위해 관련분야를
              보다 폭넓게 경험하는 것이 중요하다
              <Typography
                level="body-md"
                textColor="var(--joy-palette-success-plainColor)"
                fontFamily="monospace"
                sx={{ opacity: "50%" }}
              >
                body-md
              </Typography>
            </Typography>
            <br />
            <Typography level="body-md">
              시험 날짜 2024.05.14 (D-14일)
            </Typography>
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
        </Stack>
      </Container>
    </Container>
  );
}

type QualificationDetailProps = Omit<ContainerProps, "children">;
