import { useEffect, useState } from "react";
import { CertificationTable } from "./certification-table";
import { FilterDropDown } from "./filter-drop-down";

export default function CertificationFilterView({ certifications }) {
  const [filter, setFilter] = useState("POPULARITY");
  const [certificationsAlphabetical, setCertificationsAlphabetical] = useState<
    CertificationInfo[]
  >([]);
  const [certificationsByTime, setCertificationsByTime] = useState<
    CertificationInfo[]
  >([]);
  const [certificationsByJobCount, setCertificationsByJobCount] = useState<
    CertificationInfo[]
  >([]);
  const [filteredCertifications, setFilteredCertifications] = useState<
    CertificationInfo[]
  >([]);
  const FILTER_OPTIONS = {
    POPULARITY: "인기순",
    EXAM_DATE_ASC: "시험날짜 빠른 순",
    JOB_COUNT: "채용공고 순",
  };

  const filterComponentProps: FilterComponentProps = {
    filter,
    setFilter,
  };

  useEffect(() => {
    const filterData = (filter: string) => {
      let filteredData = [];
      console.log("filterchange!!", filter);
      switch (filter) {
        case "EXAM_DATE_ASC":
          filteredData = [...certificationsByTime]; // Creating new reference
          break;
        case "JOB_COUNT":
          filteredData = [...certificationsByJobCount]; // Creating new reference
          break;
        default:
          filteredData = [...certificationsByJobCount]; // Creating new reference
          break;
      }
      setFilteredCertifications(filteredData);
    };
    filterData(filter);
  }, [filter]);

  useEffect(() => {
    if (certifications.length > 0) {
      setFilteredCertifications(certifications.slice(0, 10));
      setCertificationsAlphabetical(getAlphabetical(certifications));
      setCertificationsByTime(getByTime(certifications));
      setCertificationsByJobCount(getByJobCount(certifications));
    }
  }, [certifications]);

  const getAlphabetical = (data) => {
    return [...data].slice(0, 10);
  };

  const getByTime = (data) => {
    return [...data]
      .sort(
        (a, b) => new Date(b.pracExamStartDate) - new Date(a.pracExamStartDate),
      )
      .slice(0, 10);
  };

  const getByJobCount = (data) => {
    return [...data].sort((a, b) => b.jobCount - a.jobCount).slice(0, 10);
  };
  return (
    <>
      <FilterDropDown
        options={FILTER_OPTIONS}
        componentProps={filterComponentProps}
      />
      <CertificationTable
        filterComponentProps={filterComponentProps}
        filteredCertifications={filteredCertifications}
      />
    </>
  );
}

enum FilterType {
  Popularity = "인기도순",
  Recruitment = "채용순",
  ExamDate = "시험 날짜 순",
}

interface FilterComponentProps {
  filter: string;
  setFilter: (filter: FilterType) => void;
}

interface CertificationInfo {
  id: string;
  name: string;
  jobCount: string;
  examDate: string;
  jobApplicants: string;
  jmCode: string;
  seriesCode: string;
}
