import ArrowDropDown from "@mui/icons-material/ArrowDropDown";
import { Dropdown, Menu, MenuButton, MenuItem } from "@mui/joy";
import { useState } from "react";

export default function FilterDropDown({ options, componentProps }:FilterDropDownProps) {
  const { filter, setFilter } = componentProps;
  const [filterText, setFilterText] =
    useState<string>("자격증 필터를 설정해주세요");

  const handleSelect = (key: keyof FilterType, value: string) => {
    setFilter(value);
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
              onClick={() => handleSelect(key as keyof FilterType, options[key as keyof FilterType])}
              >
              {options[key as keyof FilterType]}
            </MenuItem>
          ))}
        </Menu>
      </Dropdown>
    </>
  );
}

interface FilterDropDownProps {
  options : FilterType;
  componentProps : FilterComponentProps;
}

interface FilterType {
  ALPHABETICAL : string;
  EXAM_DATE_ASC : string;
  JOB_COUNT : string;
}

interface FilterComponentProps {
  filter: FilterType[keyof FilterType];
  setFilter: (filter: FilterType[keyof FilterType]) => void;
}

