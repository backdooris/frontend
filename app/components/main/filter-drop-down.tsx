import ArrowDropDown from "@mui/icons-material/ArrowDropDown";
import { Dropdown, Menu, MenuButton, MenuItem } from "@mui/joy";
import { useState } from "react";

function FilterDropDown({ options, componentProps }:FilterDropDownProps) {
  const { filter, setFilter } = componentProps;
  const [filterText, setFilterText] =
    useState<string>("자격증 필터를 설정해주세요");

  const handleSelect = (key: string, value: string) => {
    setFilter(key);
    setFilterText(value);
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

// enum FilterType {
//   Popularity = "인기도순",
//   Recruitment = "채용순",
//   ExamDate = "시험 날짜 순",
// }

interface FilterDropDownProps {
  options: FilterType
  componentProps: FilterComponentProps
}


interface FilterComponentProps {
  filter: string;
  setFilter: (filter: FilterType) => void;
}
