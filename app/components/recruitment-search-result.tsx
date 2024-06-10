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
import { JobInfoItem } from "./recruitment-notice";
import { formatDate } from "../utils/date-formater";

export function RecruitmentSearchResult(
  props: RecruitmentSearchResultProps,
): JSX.Element {
  const { sx, data, ...other } = props;

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
            {formatDate(new Date(created_at))}
          </Typography>
        </Box>
      </CardContent>
    </Card>
  );
};

type RecruitmentSearchResultProps = Omit<ContainerProps, "children"> & {
  data: JobInfoItem[];
};
