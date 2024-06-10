import { KeyboardArrowDown } from "@mui/icons-material";
import {
  Box,
  Button,
  Container,
  ContainerProps,
  Option,
  Select,
  Stack,
  Typography,
  selectClasses,
} from "@mui/joy";
import { RecruitmentSearchResult } from "./recruitment-search-result";

export function RecruitmentNotice(props: RecruitmentNoticeProps): JSX.Element {
  const { sx, ...other } = props;

  return (
    <Container
      sx={{
        ...sx,
      }}
      {...other}
    >
      <Stack
        sx={{
          display: "flex",
          flexDirection: "row",
          alignItems: "center",
          justifyContent: "space-between",
        }}
      >
        <Typography level="h2" sx={{ my: 5 }}>
          관련 채용 공고
        </Typography>
        <Select
          defaultValue="dog"
          indicator={<KeyboardArrowDown />}
          sx={{
            backgroundColor: "#F0F1F5",
            [`& .${selectClasses.indicator}`]: {
              transition: "0.2s",
              [`&.${selectClasses.expanded}`]: {
                transform: "rotate(-180deg)",
              },
            },
          }}
        >
          <Option value="dog">마감순</Option>
          <Option value="cat">연봉순</Option>
        </Select>
      </Stack>

      <Container
        sx={{
          py: 3,
          borderRadius: 16,
          backgroundColor: "#F0F1F5",
        }}
      >
        <Box>
          <Typography>대분류</Typography>
          <Select
            indicator={<KeyboardArrowDown />}
            sx={{
              mt: 1,
              [`& .${selectClasses.indicator}`]: {
                transition: "0.2s",
                [`&.${selectClasses.expanded}`]: {
                  transform: "rotate(-180deg)",
                },
              },
            }}
          >
            <Option value="dog">대분류1</Option>
            <Option value="cat">대분류2</Option>
          </Select>
        </Box>
        <Box sx={{ mt: 2 }}>
          <Typography>중분류</Typography>
          <Select
            indicator={<KeyboardArrowDown />}
            sx={{
              mt: 1,
              [`& .${selectClasses.indicator}`]: {
                transition: "0.2s",
                [`&.${selectClasses.expanded}`]: {
                  transform: "rotate(-180deg)",
                },
              },
            }}
          >
            <Option value="dog">중분류1</Option>
            <Option value="cat">중분류2</Option>
          </Select>
        </Box>
        <Button
          sx={{
            mt: 5,
            fontSize: 20,
            width: "100%",
            py: 1,
          }}
        >
          검색
        </Button>
      </Container>

      <RecruitmentSearchResult sx={{ mt: 5 }} />
    </Container>
  );
}

type RecruitmentNoticeProps = Omit<ContainerProps, "children">;
