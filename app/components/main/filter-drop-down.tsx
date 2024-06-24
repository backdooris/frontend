import ArrowDropDown from "@mui/icons-material/ArrowDropDown";
import { Dropdown, Menu, MenuButton, MenuItem } from "@mui/joy";
import { useState } from "react";

function FilterDropDown({ options, componentProps }) {
  const { filter, setFilter } = componentProps;
  const [filterText, setfilterText] =
    useState<string>("자격증 필터를 설정해주세요");

  const handleSelect = (key, value: string) => {
    setFilter(key);
    setfilterText(value);
  };

  return (
    <>
      <Dropdown>
        <MenuButton variant="soft" size="lg" endDecorator={<ArrowDropDown />}>
          {filterText}
        </MenuButton>
        <Menu variant="soft">
          {Object.keys(options).map((key) => (
            <MenuItem
              key={key}
              selected={filter === key}
              onClick={() => handleSelect(key, options[key])}
            >
              {options[key]}
            </MenuItem>
          ))}
        </Menu>
      </Dropdown>
    </>
  );
}

export { FilterDropDown };
