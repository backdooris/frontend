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
import { Fragment, useEffect, useState } from "react";
import { supabase } from "../utils/supabase";
import { RecruitmentSearchResult } from "./recruitment-search-result";

export function RecruitmentNotice(props: RecruitmentNoticeProps): JSX.Element {
  const { sx, ...other } = props;
  const [loading, setLoading] = useState<boolean>(true);
  const [jobInfo, setJobInfo] = useState<JobInfoItem[]>([]);
  const [categoryInfo, setCategoryInfo] = useState<CategoryInfo>({
    largeCategory: "",
    middleCategory: "",
  });

  useEffect(() => {
    const fetchData = async () => {
      const { data, error } = await supabase
        .from("job")
        .select(
          "id, created_at, updated_at, region_kor, data, date_enrolled, date_end, key",
        )
        .limit(100);

      if (error) {
        console.error("Error fetching data:", error);
      } else {
        setJobInfo(data);
      }
      setLoading(false);
    };

    fetchData();
  }, []);

  if (loading) {
    return <div>Loading...</div>;
  }

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
          defaultValue="end"
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
          <Option value="end">마감순</Option>
          <Option value="pay">연봉순</Option>
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
            onChange={(_, value) =>
              setCategoryInfo({
                ...categoryInfo,
                largeCategory: value as string,
              })
            }
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
            <Option value="서울">서울</Option>
            <Option value="경기도">경기도</Option>
          </Select>
        </Box>
        <Box sx={{ mt: 2 }}>
          <Typography>중분류</Typography>
          <Select
            onChange={(_, value) =>
              setCategoryInfo({
                ...categoryInfo,
                middleCategory: value as string,
              })
            }
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
            <Option value="강남구">강남구</Option>
            <Option value="도봉구">도봉구</Option>
          </Select>
        </Box>
        <Button
          sx={{
            mt: 5,
            fontSize: 20,
            width: "100%",
            py: 1,
          }}
          onClick={() =>
            alert(
              `${categoryInfo.largeCategory} ${categoryInfo.middleCategory}`,
            )
          }
        >
          검색
        </Button>
      </Container>
      <Stack
        sx={{
          display: "flex",
          flexDirection: "row",
          alignItems: "center",
          justifyContent: "space-between",
          mt: 3,
        }}
      >
        {categoryInfo.largeCategory && categoryInfo.middleCategory && (
          <Fragment>
            <Typography level="h4" fontWeight="lg" color="primary">
              [{categoryInfo.largeCategory} {categoryInfo.middleCategory} X]
            </Typography>
            <Button
              variant="plain"
              size="lg"
              onClick={() =>
                setCategoryInfo({ largeCategory: "", middleCategory: "" })
              }
              sx={{
                fontWeight: "xl",
                fontSize: "xl",
                "&:hover": {
                  backgroundColor: "inherit",
                },
              }}
            >
              조건 초기화
            </Button>
          </Fragment>
        )}
      </Stack>

      <RecruitmentSearchResult sx={{ mt: 5 }} data={jobInfo} />
    </Container>
  );
}

type RecruitmentNoticeProps = Omit<ContainerProps, "children">;

interface CategoryInfo {
  largeCategory: string;
  middleCategory: string;
}

export interface JobInfoItem {
  id: number;
  data: JobDetail;
  created_at: string;
  updated_at: string;
  region_kor: string;
  date_enrolled: string;
  date_end: string;
  key: string;
}

interface JobDetail {
  title: string;
  company: string;
  education: string;
  experience: string;
}
