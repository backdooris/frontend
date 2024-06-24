import { Dropdown, Menu, MenuItem, MenuButton } from "@mui/joy";
import ArrowDropDown from '@mui/icons-material/ArrowDropDown';
import { useState } from 'react';

function FilterDropDown({ options, componentProps }){
  const { filter, setFilter } = componentProps;
  const [filterText, setfilterText] = useState<string>("자격증 필터를 설정해주세요");

  const handleSelect = (value: string) => {
    setFilter(value);
    setfilterText(value); 
  };
  
  return(
    <>
    <Dropdown>
      <MenuButton variant="soft" size="lg" endDecorator={<ArrowDropDown/>}>
      {filterText}
      </MenuButton>
      <Menu variant="soft">
        {options.map((value) => (
         <MenuItem
          key={value}
          selected={filter === value}
          onClick={() => handleSelect(value)}
        >
          {value}
       </MenuItem>
        ))}

      </Menu>
  </Dropdown>
    </>
  )
}

export { FilterDropDown };
