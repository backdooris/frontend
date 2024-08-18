import { Box, Container, Typography } from "@mui/joy";
import "chart.js/auto";
import { Bar, Pie } from "react-chartjs-2";
import { useCertificationInfo } from "../../api/useCertificationDetail";
import { useQStatsGenderTestInfo } from "../../api/useQStatsGenderTestInfo";
import { useQStatsPracticalTestInfo } from "../../api/useQStatsPracticalTestInfo";
import { useQStatsWrittenTestInfo } from "../../api/useQStatsWrittenTestInfo";

export default function StatisticsDetail(): JSX.Element {
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
        <CertificationInfoBox />
      </Box>

      <Typography fontWeight="md" sx={{ mt: 5 }}>
        수험자 동향
      </Typography>
      <WrittenTestInfoBox />
      <PracticalTestInfoBox />
      <GenderTestInfoBox />
    </Container>
  );
}

function CertificationInfoBox(): JSX.Element {
  const { data: certificationInfo, isLoading } = useCertificationInfo("1630");

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

function WrittenTestInfoBox(): JSX.Element {
  const { data: writtenTestInfo, isLoading } = useQStatsWrittenTestInfo("0960");

  if (isLoading || writtenTestInfo == undefined) {
    return <></>;
  }

  const wrrittenTestApplicants = [
    writtenTestInfo.ilrcnt6,
    writtenTestInfo.ilrcnt5,
    writtenTestInfo.ilrcnt4,
    writtenTestInfo.ilrcnt3,
    writtenTestInfo.ilrcnt2,
    writtenTestInfo.ilrcnt1,
  ];

  const wrrittenTestExaminees = [
    writtenTestInfo.ilecnt6,
    writtenTestInfo.ilecnt5,
    writtenTestInfo.ilecnt4,
    writtenTestInfo.ilecnt3,
    writtenTestInfo.ilecnt2,
    writtenTestInfo.ilecnt1,
  ];

  const wrrittenTestPassers = [
    writtenTestInfo.ilpcnt6,
    writtenTestInfo.ilpcnt5,
    writtenTestInfo.ilpcnt4,
    writtenTestInfo.ilpcnt3,
    writtenTestInfo.ilpcnt2,
    writtenTestInfo.ilpcnt1,
  ];

  return (
    <Box
      sx={{
        display: "flex",
        justifyContent: "space-evenly",
        alignItems: "center",
        height: "10vh",
      }}
    >
      <Bar data={barDataFactory(wrrittenTestApplicants, "필기 접수자 수")} />
      <Bar data={barDataFactory(wrrittenTestExaminees, "필기 응시자 수")} />
      <Bar data={barDataFactory(wrrittenTestPassers, "필기 합격자 수")} />
    </Box>
  );
}

function PracticalTestInfoBox(): JSX.Element {
  const { data: practicalTestInfo, isLoading } =
    useQStatsPracticalTestInfo("0960");

  if (isLoading || practicalTestInfo == undefined) {
    return <></>;
  }

  const practicalTestApplicants = [
    practicalTestInfo.ilrcnt6,
    practicalTestInfo.ilrcnt5,
    practicalTestInfo.ilrcnt4,
    practicalTestInfo.ilrcnt3,
    practicalTestInfo.ilrcnt2,
    practicalTestInfo.ilrcnt1,
  ];

  const practicalTestExaminees = [
    practicalTestInfo.ilecnt6,
    practicalTestInfo.ilecnt5,
    practicalTestInfo.ilecnt4,
    practicalTestInfo.ilecnt3,
    practicalTestInfo.ilecnt2,
    practicalTestInfo.ilecnt1,
  ];

  const practicalTestPassers = [
    practicalTestInfo.ilpcnt6,
    practicalTestInfo.ilpcnt5,
    practicalTestInfo.ilpcnt4,
    practicalTestInfo.ilpcnt3,
    practicalTestInfo.ilpcnt2,
    practicalTestInfo.ilpcnt1,
  ];

  return (
    <Box
      sx={{
        display: "flex",
        justifyContent: "space-evenly",
        alignItems: "center",
        height: "10vh",
      }}
    >
      <Bar data={barDataFactory(practicalTestApplicants, "실기 접수자 수")} />
      <Bar data={barDataFactory(practicalTestExaminees, "실기 응시자 수")} />
      <Bar data={barDataFactory(practicalTestPassers, "실기 합격자 수")} />
    </Box>
  );
}

function GenderTestInfoBox(): JSX.Element {
  const { data: genderTestInfo, isLoading } = useQStatsGenderTestInfo("0960");

  if (isLoading || genderTestInfo == undefined) {
    return <></>;
  }

  return (
    <Box
      sx={{
        display: "flex",
        justifyContent: "space-evenly",
        alignItems: "center",
        height: "10vh",
      }}
    >
      {genderTestInfo.map((item) => {
        const data = [
          item.ilpcnt1,
          item.ilpcnt2,
          item.ilpcnt3,
          item.ilpcnt4,
          item.ilpcnt5,
          item.ilpcnt6,
        ];
        return (
          <Bar
            key={item.sexnm}
            data={barDataFactory(data, `${item.sexnm} 자격증 취득자 수`)}
          />
        );
      })}
    </Box>
  );
}

const barDataFactory = (
  data: number[],
  label: string = "no label",
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
  console.log(obj);
  console.log(keys);
  console.log(values);
  return { keys, values };
};
