import { Box, Container, Typography } from "@mui/joy";
import { CategoryScale, Chart as ChartJS } from "chart.js/auto";
import { Bar, Pie } from "react-chartjs-2";
import { useQStatsExamInfo } from "../../api/statistics/useQStatsExamInfo";
import { ExamType } from "../../api/types/Qualification";
import { useCertificationInfo } from "../../api/useCertificationDetail";

ChartJS.register(CategoryScale);

export default function StatisticsDetail({
  jmcd,
}: StatisticsDetailProps): JSX.Element {
  if (!jmcd) {
    return <div>emtpy data!</div>;
  }

  return (
    <Container sx={{}}>
      <Typography fontWeight="md" sx={{ mt: 2 }}>
        직업 현황
      </Typography>
      <Box
        sx={{
          display: "flex",
          justifyContent: "space-evenly",
          alignItems: "center",
          height: "10vh",
        }}
      >
        <CertificationInfoBox jmcd={jmcd} />
      </Box>

      <Typography fontWeight="md" sx={{ mt: 5 }}>
        수험자 동향
      </Typography>
      <ExamInfoBox jmcd={jmcd} />
    </Container>
  );
}

function CertificationInfoBox({ jmcd }: StrictDetailProps): JSX.Element {
  const { data: certificationInfo, isLoading } = useCertificationInfo(jmcd);

  if (isLoading || certificationInfo == undefined) {
    return <></>;
  }
  const { keys: eduLabels, values: eduData } = getChartData(
    certificationInfo.data.job_total_education,
  );
  const { keys: expLabels, values: expData } = getChartData(
    certificationInfo.data.job_total_experience,
  );
  const { keys: genLabels, values: genData } = getChartData(
    certificationInfo.data.job_total_gender,
  );
  const { keys: salLabels, values: salData } = getChartData(
    certificationInfo.data.job_total_salary,
  );
  const pieOptions = (title: string) => ({
    plugins: {
      legend: {
        display: false,
      },
      title: {
        display: true,
        text: title,
      },
    },
  });

  return (
    <Box
      sx={{
        display: "flex",
        justifyContent: "space-evenly",
        alignItems: "center",
        height: "10vh",
      }}
    >
      <Pie
        options={pieOptions("학력별 현황")}
        data={pieDataFactory(eduData, eduLabels)}
      />
      <Pie
        options={pieOptions("연차별 현황")}
        data={pieDataFactory(expData, expLabels)}
      />
      <Pie
        options={pieOptions("성별 현황")}
        data={pieDataFactory(genData, genLabels)}
      />
      <Pie
        options={pieOptions("연봉별 현황")}
        data={pieDataFactory(salData, salLabels)}
      />
    </Box>
  );
}

function ExamInfoBox({ jmcd }: StrictDetailProps): JSX.Element {
  const { data: examInfo, isLoading } = useQStatsExamInfo(jmcd);
  if (examInfo == undefined || isLoading) {
    return <></>;
  }

  const statisticExamInfo = examInfo.reduce(
    (acc, curVal) => {
      if (curVal.exam_type == ExamType.WRITTEN) {
        acc.written.push(curVal.passer_count / curVal.applicant_count);
        acc.writtenYear.push(curVal.year);
      } else {
        acc.practical.push(curVal.passer_count / curVal.applicant_count);
        acc.practicalYear.push(curVal.year);
      }
      return acc;
    },
    {
      written: [],
      practical: [],
      writtenYear: [],
      practicalYear: [],
    } as {
      written: number[];
      practical: number[];
      writtenYear: string[];
      practicalYear: string[];
    },
  );

  return (
    <Box
      sx={{
        display: "flex",
        justifyContent: "space-evenly",
        alignItems: "center",
        height: "10vh",
      }}
    >
      <Bar
        data={barDataFactory(
          "필기 합격률",
          statisticExamInfo.written,
          statisticExamInfo.writtenYear,
        )}
      />
      <Bar
        data={barDataFactory(
          "실기 합격률",
          statisticExamInfo.practical,
          statisticExamInfo.practicalYear,
        )}
      />
    </Box>
  );
}

const barDataFactory = (
  label: string = "no label",
  data: number[],
  labels: string[] = ["2019", "2020", "2021", "2022", "2023", "2024"],
) => {
  return {
    labels: labels,
    datasets: [
      {
        label: label,
        data: data,
        backgroundColor: "rgba(75, 192, 192, 0.2)",
        borderColor: "rgba(75, 192, 192, 1)",
        borderWidth: 1,
      },
    ],
  };
};

const pieDataFactory = (
  data: number[],
  labels: string[],
  label: string = "",
) => {
  return {
    labels: labels,
    datasets: [
      {
        label: label,
        data: data,
        borderWidth: 1,
      },
    ],
  };
};

const getChartData = (obj: object) => {
  const keys = [];
  const values = [];

  for (const [key, value] of Object.entries(obj)) {
    keys.push(key);
    values.push(value);
  }
  return { keys, values };
};

type StatisticsDetailProps = {
  jmcd?: string;
};

type StrictDetailProps = {
  jmcd: string;
};
