import { useEffect, useState } from "react";
import { CertificationInfo } from "../../api/types/Qualification";
import { CertificationTable } from "./certification-table";
import FilterDropDown from "./filter-drop-down";

export default function CertificationFilterView({
  certifications,
}: {
  certifications: CertificationInfo[];
}) {
  const FILTER_OPTIONS = {
    ALPHABETICAL: "가나다순",
    // POPULARITY: "인기순",
    EXAM_DATE_ASC: "시험날짜 빠른 순",
    JOB_COUNT: "채용공고 순",
  };

  const [filter, setFilter] = useState<FilterType[keyof FilterType]>(FILTER_OPTIONS.ALPHABETICAL);
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


  const filterComponentProps: FilterComponentProps = {
    filter,
    setFilter,
  };

  useEffect(() => {
    const filterData = (filter: FilterType[keyof FilterType]) => {
      let filteredData = [];
      switch (filter) {
        case FILTER_OPTIONS.ALPHABETICAL:
          filteredData = [...certificationsAlphabetical];
          break;
        case FILTER_OPTIONS.EXAM_DATE_ASC:
          filteredData = [...certificationsByTime];
          break;
        case FILTER_OPTIONS.JOB_COUNT:
          filteredData = [...certificationsByJobCount];
          break;
        default:
          filteredData = [...certificationsAlphabetical];
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

  const getAlphabetical = (data: CertificationInfo[]) => {
    return [...data].slice(0, 10);
  };

  const getByTime = (data: CertificationInfo[]) => {
    return [...data]
      .filter((item) => item.pracExamStartDate !== "없음")
      .sort((a, b) => {
        const dateA = new Date(
          `${a.pracExamStartDate.slice(0, 4)}-${a.pracExamStartDate.slice(4, 6)}-${a.pracExamStartDate.slice(6, 8)}`,
        ).getTime();
        const dateB = new Date(
          `${b.pracExamStartDate.slice(0, 4)}-${b.pracExamStartDate.slice(4, 6)}-${b.pracExamStartDate.slice(6, 8)}`,
        ).getTime();
        return dateB - dateA;
      })
      .slice(0, 10);
  };

  const getByJobCount = (data: CertificationInfo[]) => {
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

interface FilterType {
  ALPHABETICAL : string;
  EXAM_DATE_ASC : string;
  JOB_COUNT : string;
}

interface FilterComponentProps {
  filter: FilterType[keyof FilterType];
  setFilter: (filter: FilterType[keyof FilterType]) => void;
}


