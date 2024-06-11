import {Button, Typography, Input,} from "@mui/joy";

function SearchBox(){
  return(
    <>
      <Typography level="h2" sx={{ my: 5, ml: 2 }}>
        자격증 찾기
      </Typography>
      <Typography>자격명</Typography>
      <Input endDecorator={<Button size="md">검색</Button>}/>
    </> 
  )
}

export { SearchBox };
