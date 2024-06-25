import { useState, useEffect } from "react";
import {Button, Typography, Input, Stack} from "@mui/joy";



function SearchBox({ searchTerm, setSearchTerm}){
  const [input, setInput] = useState("");


  return(
    <>
  <Typography level="h2" sx={{ my: 5, ml: 2 }}>
        자격증 찾기
  </Typography>
    <Input 
    placeholder={'자격증을 검색해주세요'}
    sx={{ width: '100%' }}
    onChange={(e) => setInput(e.target.value)}
    endDecorator={<Button size="md" onClick={()=> setSearchTerm(input)}>검색</Button>}/>
    </> 
  )
}

export { SearchBox };
