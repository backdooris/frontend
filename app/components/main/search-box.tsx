import { Button, Input, Typography } from "@mui/joy";
import { useState } from "react";

function SearchBox({ setSearchTerm, setShowCardList }:SearchBoxProps) {
  const [input, setInput] = useState("");

  return (
    <>
      <Typography level="h2" sx={{ my: 5, ml: 2 }}>
        자격증 찾기
      </Typography>
      <Input
        placeholder={"자격증을 검색해주세요"}
        sx={{ width: "100%" }}
        onChange={(e) => setInput(e.target.value)}
        endDecorator={
          <Button
            size="md"
            onClick={() => {
              setSearchTerm(input);
              setShowCardList(true);
            }}
          >
            검색
          </Button>
        }
      />
    </>
  );
}

export { SearchBox };

interface SearchBoxProps {
  searchTerm: string,
  setSearchTerm: React.Dispatch<React.SetStateAction<string>>;
  setShowCardList: React.Dispatch<React.SetStateAction<boolean>>;
}
