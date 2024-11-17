import { useEffect, useState } from "react";
import { convertToDateObj } from "../utils/date-formater";
import { supabase } from "../utils/supabase";

import { Container, Stack, Typography } from "@mui/joy";
import CertificationCardView from "../components/main/certification-card-view";
import CertificationFilterView from "../components/main/certification-filter-view";
import { CertificationInfo } from '../api/types/Qualification';
async function fetchCertification() {
  const { data, error } = await supabase
    .from("certification")
    .select("code_kor, id, jmcd, seriescd")
    .not("jmcd", "is", null)
    .not("seriescd", "is", null);

  if (error) {
    console.error("Error fetching data:", error);
    return [];
  }
  return data.map((item) => ({
    name: item.code_kor,
    id: item.id,
    jmCode: item.jmcd,
    seriesCode: item.seriescd,
  }));
}

function getNearestFutureExamDate(testDates) {
 const today = new Date();
  let nearestTest = null;
  let minDatesLeft = Infinity;
  if (testDates.length <= 0) return "00000000";
  for (let i = 0; i < testDates.length; i++) {
    const testDate = convertToDateObj(testDates[i].pracexamstartdt);
    const datesLeft = testDate - today;
    if (datesLeft > 0 && datesLeft < minDatesLeft) {
      minDatesLeft = datesLeft;
      nearestTest = testDates[i];
    }
  }
  if (minDatesLeft === Infinity) nearestTest = testDates[testDates.length - 1];
  return nearestTest;
}

function getNearestCreatedAtJobCount(data) {
  const now = new Date();

  return data.reduce((nearestItem, currentItem) => {
    const currentCreatedAt = new Date(currentItem.created_at);
    const nearestCreatedAt = new Date(nearestItem.created_at);

    const currentDifference = Math.abs(currentCreatedAt - now);
    const nearestDifference = Math.abs(nearestCreatedAt - now);

    return currentDifference < nearestDifference ? currentItem : nearestItem;
  });
}

async function fetchCertificationJobCount(id) {
  const { data, error } = await supabase
    .from("certification_detail")
    .select("*")
    .not("data->>job_total_cnt", "is", null)
    .eq("certification", id);

  if (error) {
    console.error("Error fetching data:", error);
    return [];
  }
  const nearestCreatedJobCount = getNearestCreatedAtJobCount(data);

  return {
    id: nearestCreatedJobCount.certification,
    jobCount: nearestCreatedJobCount.data.job_total_cnt,
    jobApplicants: nearestCreatedJobCount.data.job_total_apply_cnt,
  };
}

async function fetchCertificationDate(seriescd : CertificationInfo['seriesCode']) {
  try {
    const response = await fetch("../../../data/exam-date.json");

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    const data = await response.json();
    const filteredData = data.items.filter((testDate) => {
      const [seriesPrefix] = testDate.seriescd.split("_");
      return seriesPrefix === seriescd;
    });
    const examDate = getNearestFutureExamDate(filteredData);

    return {
      pracExamStartDate: examDate.pracexamstartdt || "없음",
      pracExamEndDate: examDate.pracexamenddt || "없음",
      docExamStartDate: examDate.docexamdt || "없음",
      examDescription: examDate.description || "없음",
    };
  } catch (error) {
    console.error("Error fetching JSON file:", error);
    return [];
  }
}

export const Component = function MainPage(): JSX.Element {
  const [certifications, setCertifications] = useState<CertificationInfo[]>([]);
  const [error, setError] = useState<string>("");

  useEffect(() => {
    const fetchAndCombineData = async () => {
      // setLoading(true);
      try {
        const certifications = await fetchCertification();
        const certsWithDetails = await Promise.all(
          certifications.map(async (certification) => {
            const { jobCount, jobApplicants } =
              await fetchCertificationJobCount(certification.id);
            const dateInfo = await fetchCertificationDate(
              certification.seriesCode,
            );

            return {
              ...certification,
              jobCount,
              jobApplicants,
              ...dateInfo,
            };
          }),
        );

        setCertifications(certsWithDetails);
      } catch (error) {
        setError(error.message);
      }
    };

    fetchAndCombineData();
  }, []);



  return (
    <Container sx={{ py: 2 }}>
      <Stack spacing={2}>
        <Typography level="h1">LOGO</Typography>
        <CertificationFilterView certifications={certifications} />
        <CertificationCardView certifications={certifications} />
      </Stack>
    </Container>
  );
};
