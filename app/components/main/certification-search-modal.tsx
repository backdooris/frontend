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
import { useNavigate } from "react-router-dom";
import { supabase } from "../../utils/supabase";

async function fetchDetailCategoryList(obligfldcd) {
  const { data, error } = await supabase
    .from("certification")
    .select("mdobligfldcd, mdobligfldnm")
    .eq("obligfldcd", obligfldcd);

  if (error) {
    console.error("Error fetching data:", error);
    return [];
  }
  const formattedData = data.map((item) => ({
    code: item.mdobligfldcd,
    name: item.mdobligfldnm,
  }));

  const uniqueData = formattedData.filter(
    (value, index, self) =>
      index ===
      self.findIndex((t) => t.code === value.code && t.name === value.name),
  );
  return uniqueData;
}

async function fetchCertificationList(mdobligfldcd) {
  const { data, error } = await supabase
    .from("certification")
    .select("code_kor, jmcd")
    .eq("mdobligfldcd", mdobligfldcd);

  if (error) {
    console.error("Error fetching data:", error);
    return [];
  }
  const formattedData = data.map((item) => ({
    code: item.jmcd,
    name: item.code_kor,
  }));

  const uniqueData = formattedData.filter(
    (value, index, self) =>
      index ===
      self.findIndex((t) => t.code === value.code && t.name === value.name),
  );
  return uniqueData;
}

//테스트 데이터
const detailCategoryList = [
  { detailCode: "1", name: "경영" },
  { detailCode: "2", name: "경영(사회조사분석)" },
  { detailCode: "3", name: "경영(소비자전문상담)" },
  { detailCode: "4", name: "경영(컨벤션기획)" },
  { detailCode: "5", name: "회계" },
  { detailCode: "6", name: "사무" },
  { detailCode: "7", name: "생산관리" },
];

const certificationList = [
  { certificationCode: "1", name: "사회조사분석사1급" },
  { certificationCode: "2", name: "사회조사분석사2급" },
  { certificationCode: "3", name: "소비자전문상담사1급" },
  { certificationCode: "4", name: "소비자전문상담사2급" },
  { certificationCode: "5", name: "컨벤션기획사1급" },
  { certificationCode: "6", name: "컨벤션기획사2급" },
];

function CertificationSearchModal({ open, setOpen, category }) {
  const navigate = useNavigate();
  const [detailCategoryCode, setDetailCategoryCode] = useState("");
  const [certificationCode, setCertificationCode] = useState("");
  const [detailCategoryList, setDetailCategoryList] = useState([]);
  const [certificationList, setCertificationList] = useState([]);
  const [errorMessage, setErrorMessage] = useState("");

  useEffect(() => {
    const fetchDetailCategoryData = async () => {
      try {
        const detailCategoryData = await fetchDetailCategoryList(category.code);
        setDetailCategoryList(detailCategoryData);
      } catch (error) {
        console.log("Failed to catch sub-categories", error);
      }
    };
    fetchDetailCategoryData();
  }, [category.code]);

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
    console.log("닫기 클릭", newValue);
    if (newValue) {
      setCertificationCode(newValue);
      navigate(`/detail?jmcd=${newValue}`);
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
          <Typography>대분류 : {category.name} </Typography>

          <Select
            defaultValue=""
            indicator={<KeyboardArrowDown />}
            sx={{}}
            onChange={handleDetailCategoryChange}
          >
            {detailCategoryList.map((detailCategory) => (
              <Option key={detailCategory.code} value={detailCategory.code}>
                {detailCategory.name}
              </Option>
            ))}
          </Select>
          <Select
            defaultValue=""
            indicator={<KeyboardArrowDown />}
            sx={{}}
            onChange={handleCertificationCodeChange}
          >
            {certificationList?.map((certification) => (
              <Option key={certification.code} value={certification.code}>
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
