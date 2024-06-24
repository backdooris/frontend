import { useState } from "react";
import { FilterDropDown } from "./filter-drop-down";
import { CertificationTable } from "./certification-table";


export default function CertificationFilterView(){
  const [filter, setFilter] = useState(null);
  const filterOptions = ["인기순", "시험날짜 빠른 순"];

  const filterComponentProps: FilterComponentProps = {
    filter,
    setFilter
  };

  return(
    <>
      <FilterDropDown options={filterOptions} componentProps={filterComponentProps}/>
      <CertificationTable filterComponentProps={filterComponentProps} />
    </>
  )

}

enum FilterType {
  Popularity = "인기도순",
  Recruitment = "채용순",
  ExamDate ="시험 날짜 순"
}

interface FilterComponentProps {
  filter: string;
  setFilter: (filter: FilterType) => void;
}