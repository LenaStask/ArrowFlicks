import { Select } from "@mantine/core";
import classes from "./Sorting.module.css";
import { IconChevronDown, IconChevronUp } from "@tabler/icons-react";
import { useState } from "react";

interface ChildProps {
  value: string;
  onChange: (value: string) => void;
}

const Sorting = ({ value, onChange }: ChildProps) => {
  const [selectedValue, setSelectedValue] = useState<string | null>(value);

  const handleChange = (newValue: string) => {
    setSelectedValue(newValue);
    onChange(newValue);
  };

  //rightSecton icon
  const [expanded, setExpanded] = useState(false);
  const handleDropdownOpen = () => setExpanded(true);
  const handleDropdownClose = () => setExpanded(false);

  return (
    <Select
      classNames={classes}
      label="Sort by"
      rightSection={
        expanded ? (
          <IconChevronUp stroke={1.5} size={24} className={classes.iconUp} />
        ) : (
          <IconChevronDown
            stroke={1.5}
            size={24}
            className={classes.iconDown}
          />
        )
      }
      onDropdownOpen={handleDropdownOpen}
      onDropdownClose={handleDropdownClose}
      data={[
        { value: "popularity.desc", label: "Most Popular" },
        { value: "popularity.asc", label: "Least Popular" },
        { value: "vote_average.desc", label: "Most Rated" },
        { value: "vote_average.asc", label: "Least Rated" },
        { value: "vote_count.desc", label: "Most Voted" },
        { value: "vote_count.asc", label: "Least Voted" },
        { value: "revenue.desc", label: "Highest revenue" },
        { value: "revenue.asc", label: "Lowest revenue" },
        { value: "primary_release_date.desc", label: "Newest" },
        { value: "primary_release_date.asc", label: "Oldest" },
        { value: "title.desc", label: "Title A-Z" },
        { value: "title.asc", label: "Title Z-A" },
        { value: "original_title.desc", label: "Original Title A-Z" },
        { value: "original_title.asc", label: "Original Title Z-A" },
      ]}
      value={selectedValue}
      onChange={(_value) => handleChange(_value as string)}
      allowDeselect={false}
      withCheckIcon={false}
    />
  );
};

export default Sorting;
