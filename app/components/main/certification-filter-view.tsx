import { useEffect, useState } from "react";
import { CertificationTable } from "./certification-table";
import { FilterDropDown } from "./filter-drop-down";

export default function CertificationFilterView({ certifications }) {
  const [filter, setFilter] = useState("POPULARITY");
  const FILTER_OPTIONS = {
    POPULARITY: "인기순",
    EXAM_DATE_ASC: "시험날짜 빠른 순",
    JOBS_CNT: "채용공고 순",
  };
  const [filteredCertifications, setFilteredCertifications] = useState<
    CertificationInfo[]
  >([]);

  const filterComponentProps: FilterComponentProps = {
    filter,
    setFilter,
  };

  useEffect(() => {
    if (certifications && certifications.length > 0) {
      setFilteredCertifications(certifications.slice(0, 10));
    }
  }, [certifications]);

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
