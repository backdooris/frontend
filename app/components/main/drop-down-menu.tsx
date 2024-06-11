import {Dropdown, Menu, MenuItem, MenuButton} from "@mui/joy";
import ArrowDropDown from '@mui/icons-material/ArrowDropDown';

function DropDownMenu(){
  return(
    <>
    <Dropdown>
      <MenuButton variant="soft" size="lg" endDecorator={<ArrowDropDown/>}>
        자격증 필터를 설정해주세요
      </MenuButton>
      <Menu
        variant="soft">
        <MenuItem>실시간 인기 Up! Up!</MenuItem>
        <MenuItem>5060 시니어들이 보고 있는 HOT!</MenuItem>
        <MenuItem>실시간 인기 Up! Up!</MenuItem>
      </Menu>
  </Dropdown>
    </>
  )
}

export { DropDownMenu };
