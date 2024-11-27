import {
  Box,
  Button,
  Card,
  CardContent,
  Container,
  ContainerProps,
  Stack,
  Typography,
} from "@mui/joy";
import { formatDate } from "../../utils/date-formater";
import { JobInfoItem } from "./recruitment-notice";

export function RecruitmentSearchResult(
  props: RecruitmentSearchResultProps,
): JSX.Element {
  const { sx, data, ...other } = props;
  if (!data) {
    return <div>empty</div>;
  }

  return (
    <Container
      sx={{
        ...sx,
      }}
      {...other}
    >
      <Typography level="h2">검색결과 ({data.length}건)</Typography>

      <Stack sx={{ mt: 3 }} spacing={3}>
        {data.map((job) => (
          <ResultCard {...job} key={job.key} />
        ))}
      </Stack>
    </Container>
  );
}

const ResultCard: React.FC<JobInfoItem> = ({
  region_kor,
  created_at,
  data,
}) => {
  const shareKakao = () => {
    if (window.Kakao) {
      const kakao = window.Kakao;

      // 중복 initialization 방지
      if (!kakao.isInitialized()) {
        // 두번째 step 에서 가져온 javascript key 를 이용하여 initialize
        kakao.init("a975051eabe13c23c2d6c139c0707baa");
      }
      kakao.Link.createDefaultButton({
        objectType: "feed",
        container: "#sendKakao",
        content: {
          title: `노인 일자리 탐색`,
          imageUrl:
            "https://www.simplywise.com/blog/wp-content/uploads/2023/06/shutterstock_658188250.jpeg",
          description: "노인 일자리 탐색합니다",
          link: {
            mobileWebUrl: window.location.href,
            webUrl: window.location.href,
          },
        },
        buttons: [
          {
            title: "일자리 확인하기",
            link: {
              mobileWebUrl: window.location.href,
              webUrl: window.location.href,
            },
          },
        ],
        installTalk: true,
      });

      setTimeout(() => {
        document.getElementById("sendKakao")?.click();
      }, 100);
    }
  };

  return (
    <Card orientation="horizontal" variant="soft">
      <CardContent>
        <Typography level="title-lg" fontWeight="lg">
          {data.title}
        </Typography>
        <Typography level="body-sm" fontWeight="md">
          {data.education}
        </Typography>
        <Typography level="body-sm" fontWeight="md">
          {data.experience}
        </Typography>
        <Typography level="body-sm" fontWeight="sm">
          {data.company}
        </Typography>
        <Typography level="body-sm" fontWeight="sm">
          {region_kor}
        </Typography>

        <Box
          sx={{
            display: "flex",
            flexDirection: "row",
            alignItems: "center",
            px: 1,
            mt: 1,
          }}
        >
          <Typography
            variant="outlined"
            level="body-sm"
            fontWeight="lg"
            color="primary"
            sx={{
              display: "inline-block",
              borderRadius: 16,
              mr: 4,
            }}
          >
            {formatDate(new Date(created_at))}
          </Typography>
          <Button id="sendKakao" onClick={shareKakao}>
            카카오톡 공유하기
          </Button>
        </Box>
      </CardContent>
    </Card>
  );
};

type RecruitmentSearchResultProps = Omit<ContainerProps, "children"> & {
  data?: JobInfoItem[];
};
