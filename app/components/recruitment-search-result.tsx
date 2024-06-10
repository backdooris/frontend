import {
  AspectRatio,
  Box,
  Card,
  CardContent,
  CardOverflow,
  Container,
  ContainerProps,
  Stack,
  Typography,
} from "@mui/joy";

export function RecruitmentSearchResult(
  props: RecruitmentSearchResultProps,
): JSX.Element {
  const { sx, ...other } = props;

  return (
    <Container
      sx={{
        ...sx,
      }}
      {...other}
    >
      <Typography level="h2">검색결과 (34건)</Typography>

      <Stack sx={{ mt: 3 }} spacing={3}>
        <ResultCard />
        <ResultCard />
        <ResultCard />
        <ResultCard />
      </Stack>
    </Container>
  );
}

function ResultCard(): JSX.Element {
  return (
    <Card orientation="horizontal" variant="soft">
      <CardOverflow sx={{ flex: 1 }}>
        <AspectRatio
          ratio="1"
          sx={{
            mt: 1,
            ml: 2,
            width: 120,
          }}
        >
          <img
            src="https://images.unsplash.com/photo-1507833423370-a126b89d394b?auto=format&fit=crop&w=90"
            srcSet="https://images.unsplash.com/photo-1507833423370-a126b89d394b?auto=format&fit=crop&w=90&dpr=2 2x"
            loading="lazy"
            alt=""
          />
        </AspectRatio>
      </CardOverflow>
      <CardContent>
        <Typography level="title-lg" fontWeight="lg">
          4등급 여자 어르신
        </Typography>
        <Typography level="title-lg" fontWeight="lg">
          요양 보호사 구인
        </Typography>
        <Typography level="body-sm" fontWeight="md">
          담당업무 : 요양 보호사
        </Typography>
        <Typography level="body-sm" fontWeight="md">
          구인 대상자 : 4등급 여자 어르신
        </Typography>
        <Typography level="body-sm" fontWeight="md">
          구인 대상자 : 4등급 여자 어르신
        </Typography>

        <Box>
          <Typography
            variant="outlined"
            level="body-sm"
            fontWeight="lg"
            color="primary"
            sx={{
              display: "inline-block",
              borderRadius: 16,
              px: 1,
              mt: 1,
            }}
          >
            2024년 05월 13일 18시 00분
          </Typography>
        </Box>
      </CardContent>
    </Card>
  );
}

type RecruitmentSearchResultProps = Omit<ContainerProps, "children">;
