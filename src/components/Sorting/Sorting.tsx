import { Select } from "@mantine/core";
import classes from "./Sorting.module.css";
import { IconChevronDown } from "@tabler/icons-react";
import { useState } from "react";

interface ChildProps {
  onChange: (value: string) => void;
}

const Sorting = ({onChange}:ChildProps) => {
  const [value, setValue] = useState<string | null>("popularity.desc");

  const sendOptionValue = (value:string) => {
    setValue(value);
    onChange(value);
  }

  return (
    <Select
      classNames={classes}
      label="Sort by"
      rightSection={
        <IconChevronDown
          stroke={1.5}
          size={24}
          className={classes.selectIcon}
        />
      }
      placeholder="Pick value"
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
      value={value}
      onChange={(_value) => sendOptionValue(_value as string)}
      allowDeselect={false}
      withCheckIcon={false}
    /> 
  );
};

export default Sorting;
