import CloseIcon from "@mui/icons-material/Close";
import { Table } from "@mui/joy";
import { Link } from "react-router-dom";
import { CertificationInfo } from "../../api/types/Qualification";
import { formatYYYYmmDD } from "../../utils/date-formater";
export default function CertificationCardList({
  certifications,
  setShowCardList,
}: CertificationCarListProps) {
  return (
    <>
      <Table
        borderAxis="xBetween"
        color="neutral"
        size="lg"
        stickyHeader={false}
        variant="outlined"
      >
        <thead>
          <tr>
            <th style={{ width: "40%" }}>자격명</th>
            <th>시험 날짜</th>
            <th>채용공고 수</th>
            <th align="right" style={{ width: "5%" }}>
              <CloseIcon
                onClick={() => setShowCardList(false)}
                aria-label="close"
              ></CloseIcon>
            </th>
          </tr>
        </thead>

        <tbody>
          {certifications?.map((certification) => (
            <tr key={certification.name}>
              <Link to={`/detail?jmcd=${certification.jmCode}`}>
                <td>{certification.name}</td>
              </Link>
              <td>{formatYYYYmmDD(certification.pracExamStartDate)}</td>
              <td>{certification.jobCount}</td>
            </tr>
          ))}
        </tbody>
      </Table>
    </>
  );
}

type CertificationCarListProps = {
  certifications: CertificationInfo[];
  setShowCardList: (value: boolean) => void;
};
