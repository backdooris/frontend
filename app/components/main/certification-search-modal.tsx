import { KeyboardArrowDown } from "@mui/icons-material";
import {
  Button,
  Modal,
  ModalClose,
  ModalDialog,
  Option,
  Select,
  Stack,
  Typography,
} from "@mui/joy";
import { useEffect, useState } from "react";

async function fetchSubCategory(code) {
  return subTest;
}

async function fetchDetailCategory(subCode) {
  return detailTest;
}

function goToDetailPage(detailCategoryCode) {
  //페이지 이동
}

//테스트 데이터
let subTest = [
  { subCode: "1", name: "경영" },
  { subCode: "2", name: "경영(사회조사분석)" },
  { subCode: "3", name: "경영(소비자전문상담)" },
  { subCode: "4", name: "경영(컨벤션기획)" },
  { subCode: "5", name: "회계" },
  { subCode: "6", name: "사무" },
  { subCode: "7", name: "생산관리" },
];

let detailTest = [
  { detailCode: "1", name: "사회조사분석사1급" },
  { detailCode: "2", name: "사회조사분석사2급" },
  { detailCode: "3", name: "소비자전문상담사1급" },
  { detailCode: "4", name: "소비자전문상담사2급" },
  { detailCode: "5", name: "컨벤션기획사1급" },
  { detailCode: "6", name: "컨벤션기획사2급" },
];

function CertificationSearchModal({ open, setOpen, code }) {
  const [subCategoryCode, setSubCategoryCode] = useState("");
  const [detailCategoryCode, setDetailCategoryCode] = useState("");
  const [subCategoryList, setSubCategoryList] = useState([]);
  const [detailCategoryList, setDetailCategoryList] = useState([]);
  const [errorMessage, setErrorMessage] = useState("");

  useEffect(() => {
    const fetchSubCategoryData = async () => {
      try {
        const subCategory = await fetchSubCategory(code);
        setSubCategoryList(subCategory);
      } catch (error) {
        console.log("Failed to catch sub-categories", error);
      }
    };
    fetchSubCategoryData();
  }, [code]);

  useEffect(() => {
    if (!subCategoryCode) return;
    const fetchDetailCategoryData = async () => {
      try {
        const detailCategory = await fetchDetailCategory(subCategoryCode);
        setDetailCategoryList(detailCategory);
      } catch (error) {
        console.log("Failed to catch detail-categories", error);
      }
    };
    fetchDetailCategoryData();
  }, [subCategoryCode]);

  const handleSubCategoryChange = (
    event: React.SyntheticEvent | null,
    newValue: string | null,
  ) => {
    setSubCategoryCode(newValue);
  };

  const handleDetailCategoryChange = (
    event: React.SyntheticEvent | null,
    newValue: string | null,
  ) => {
    setDetailCategoryCode(newValue);
  };

  const handleSearch = () => {
    if (!detailCategoryCode) {
      setErrorMessage("자격증을 선택해주세요");
    } else {
      setErrorMessage("");
      setOpen(false);
      console.log("닫기 클릭", open);
      goToDetailPage();
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
          <ModalClose/>
          <Typography>대분류</Typography>

          <Select
            defaultValue="end"
            indicator={<KeyboardArrowDown />}
            sx={{}}
            onChange={handleSubCategoryChange}
          >
            {subCategoryList.map((subCategory) => (
              <Option key={subCategory.subCode} value={subCategory.subCode}>
                {subCategory.name}
              </Option>
            ))}
          </Select>
          <Select
            defaultValue="end"
            indicator={<KeyboardArrowDown />}
            sx={{}}
            onChange={handleDetailCategoryChange}
          >
            {detailCategoryList?.map((detailCategory) => (
              <Option
                key={detailCategory.detailCode}
                value={detailCategory.detailCode}
              >
                {detailCategory.name}
              </Option>
            ))}
          </Select>
          <div>{errorMessage}</div>
          <Button onClick={handleSearch}>검색</Button>
        </ModalDialog>
      </Modal>
    </>
  );
}

export { CertificationSearchModal };
