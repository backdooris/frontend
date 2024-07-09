import { KeyboardArrowDown } from "@mui/icons-material";
import {
  Modal,
  ModalClose,
  ModalDialog,
  Option,
  Select,
  Stack,
  Typography,
} from "@mui/joy";
import { useEffect, useState } from "react";

async function fetchDetailCategoryList(code) {
  return detailCategoryList;
}

async function fetchCertificationList(detailCode) {
  return certificationList;
}

function goToDetailPage(certificationCode) {
  //페이지 이동
}

//테스트 데이터
let detailCategoryList = [
  { detailCode: "1", name: "경영" },
  { detailCode: "2", name: "경영(사회조사분석)" },
  { detailCode: "3", name: "경영(소비자전문상담)" },
  { detailCode: "4", name: "경영(컨벤션기획)" },
  { detailCode: "5", name: "회계" },
  { detailCode: "6", name: "사무" },
  { detailCode: "7", name: "생산관리" },
];

let certificationList = [
  { certificationCode: "1", name: "사회조사분석사1급" },
  { certificationCode: "2", name: "사회조사분석사2급" },
  { certificationCode: "3", name: "소비자전문상담사1급" },
  { certificationCode: "4", name: "소비자전문상담사2급" },
  { certificationCode: "5", name: "컨벤션기획사1급" },
  { certificationCode: "6", name: "컨벤션기획사2급" },
];

function CertificationSearchModal({ open, setOpen, code }) {
  const [detailCategoryCode, setDetailCategoryCode] = useState("");
  const [certificationCode, setCertificationCode] = useState("");
  const [detailCategoryList, setDetailCategoryList] = useState([]);
  const [certificationList, setCertificationList] = useState([]);
  const [errorMessage, setErrorMessage] = useState("");

  useEffect(() => {
    const fetchDetailCategoryData = async () => {
      try {
        const detailCategoryData = await fetchDetailCategoryList(code);
        setDetailCategoryList(detailCategoryData);
      } catch (error) {
        console.log("Failed to catch sub-categories", error);
      }
    };
    fetchDetailCategoryData();
  }, [code]);

  useEffect(() => {
    if (!detailCategoryCode) return;
    const fetchCertificationData = async () => {
      try {
        const certificationCodeData =
          await fetchCertificationList(detailCategoryCode);
        setCertificationList(certificationCodeData);
      } catch (error) {
        console.log("Failed to catch detail-categories", error);
      }
    };
    fetchCertificationData();
  }, [detailCategoryCode]);

  const handleDetailCategoryChange = (
    event: React.SyntheticEvent | null,
    newValue: string | null,
  ) => {
    console.log("중분류 선택");
    setDetailCategoryCode(newValue);
  };

  const handleCertificationCodeChange = (
    event: React.SyntheticEvent | null,
    newValue: string | null,
  ) => {
    setCertificationCode(newValue);
    // setOpen(false);
    console.log("닫기 클릭", newValue);
    goToDetailPage(newValue);
  };

  const handleSearch = () => {
    if (!certificationCode) {
      setErrorMessage("자격증을 선택해주세요");
    } else {
      setErrorMessage("");
      setOpen(false);
      console.log("닫기 클릭", open);
      goToDetailPage(certificationCode);
    }
  };

  return (
    <>
      <Stack
        sx={{
          display: "flex",
          flexDirection: "row",
          alignItems: "center",
          justifyContent: "space-between",
        }}
      />
      <Modal
        aria-labelledby="modal-title"
        aria-describedby="modal-desc"
        open={open}
        onClose={() => setOpen(false)}
        sx={{ display: "flex", justifyContent: "center", alignItems: "center" }}
      >
        <ModalDialog variant="soft">
          <ModalClose />
          <Typography>대분류</Typography>

          <Select
            defaultValue="end"
            indicator={<KeyboardArrowDown />}
            sx={{}}
            onChange={handleDetailCategoryChange}
          >
            {detailCategoryList.map((detailCategory) => (
              <Option
                key={detailCategory.detailCode}
                value={detailCategory.detailCode}
              >
                {detailCategory.name}
              </Option>
            ))}
          </Select>
          <Select
            defaultValue="end"
            indicator={<KeyboardArrowDown />}
            sx={{}}
            onChange={handleCertificationCodeChange}
          >
            {certificationList?.map((certification) => (
              <Option
                key={certification.certificationCode}
                value={certification.certificationCode}
              >
                {certification.name}
              </Option>
            ))}
          </Select>
          <div>{errorMessage}</div>
        </ModalDialog>
      </Modal>
    </>
  );
}

export { CertificationSearchModal };
