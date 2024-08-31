import { KeyboardArrowDown } from "@mui/icons-material";
import {
  Box,
  Button,
  CircularProgress,
  Container,
  ContainerProps,
  Option,
  Select,
  Stack,
  Typography,
  selectClasses,
} from "@mui/joy";
import { Fragment, useState } from "react";
import { useRegionSiDo } from "../../api/region/useRegionSiDo";
import { useRegionSiGunGu } from "../../api/region/useRegionSiGunGu";
import { useJobInfos } from "../../api/useJobInfos";
import { RecruitmentSearchResult } from "./recruitment-search-result";

export function RecruitmentNotice(props: RecruitmentNoticeProps): JSX.Element {
  const { sx, ...other } = props;

  const [regionInfo, setRegionInfo] = useState<RegionInfo>({});
  const [selectedSido, setSido] = useState<number>(0);
  const [selectedRegions, setRegions] = useState<number[]>([]);

  const { data: jobInfo, isLoading } = useJobInfos(selectedRegions);
  const { data: regionSido } = useRegionSiDo();
  const { data: regionSiGunGu } = useRegionSiGunGu(selectedSido);
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
            value={selectedSido}
            onChange={(_, value) => {
              setSido(value as number);

              const sido = regionSido?.find((e) => e.sido_id == value);
              setRegionInfo({
                ...regionInfo,
                sido_id: sido?.sido_id,
                sido_name: sido?.sido_name,
              });
            }}
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
            {regionSido?.map((e) => (
              <Option key={e.sido_id} value={e.sido_id}>
                {e.sido_name}
              </Option>
            ))}
          </Select>
        </Box>
        <Box sx={{ mt: 2 }}>
          <Typography>중분류</Typography>
          <Select
            onChange={(_, value) => {
              const sigungu = regionSiGunGu?.find((e) => e.sigungu_id == value);
              if (sigungu != null) {
                setRegionInfo({
                  ...regionInfo,
                  sigungu_id: sigungu?.sigungu_id,
                  sigungu_name: sigungu?.sigungu_name,
                });
                setRegions([...selectedRegions, sigungu.sigungu_id]);
              }
            }}
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
            {regionSiGunGu?.map((e) => (
              <Option key={e.sigungu_id} value={e.sigungu_id}>
                {e.sigungu_name}
              </Option>
            ))}
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
            alert(`${regionInfo?.sido_name} ${regionInfo?.sigungu_name}`)
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
        {regionInfo.sido_id && regionInfo.sigungu_id && (
          <Fragment>
            <Typography level="h4" fontWeight="lg" color="primary">
              [{regionInfo.sido_name} {regionInfo.sigungu_name} X]
            </Typography>
            <Button
              variant="plain"
              size="lg"
              onClick={() => {
                setSido(0);
                setRegionInfo({});
              }}
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
      {isLoading && <CircularProgress />}
      {!isLoading && <RecruitmentSearchResult sx={{ mt: 5 }} data={jobInfo} />}
    </Container>
  );
}

type RecruitmentNoticeProps = Omit<ContainerProps, "children">;

interface RegionInfo {
  sido_id?: number;
  sido_name?: string;
  sigungu_id?: number;
  sigungu_name?: string;
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
