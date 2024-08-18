import { useState } from "react";
import { CertificationTable } from "./certification-table";
import { FilterDropDown } from "./filter-drop-down";

export default function CertificationFilterView() {
  const [filter, setFilter] = useState("POPULARITY");
  const FILTER_OPTIONS = {
    POPULARITY: "인기순",
    EXAM_DATE_ASC: "시험날짜 빠른 순",
    JOBS_CNT: "채용공고 순",
  };

  const filterComponentProps: FilterComponentProps = {
    filter,
    setFilter,
  };

  return (
    <>
      <FilterDropDown
        options={FILTER_OPTIONS}
        componentProps={filterComponentProps}
      />
      <CertificationTable filterComponentProps={filterComponentProps} />
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
