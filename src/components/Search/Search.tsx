import { Button, TextInput, rem } from "@mantine/core";
import { IconSearch } from "@tabler/icons-react";
import classes from "./Search.module.css";
import { useState } from "react";

interface ChildProps {
  onChange: (value: string) => void;
}

const Search = ({ onChange }: ChildProps) => {
  const [value, setValue] = useState("");

  const handleButtonClick = (value: string) => {
    onChange(value);
  };

  return (
    <TextInput
      value={value}
      onChange={(event) => setValue(event.currentTarget.value)}
      classNames={classes}
      radius="xl"
      size="md"
      placeholder="Search movie title"
      rightSectionWidth={42}
      leftSection={
        <IconSearch style={{ width: rem(18), height: rem(18) }} stroke={1.5} />
      }
      rightSection={
        <Button className={classes.fillButton} color="purple.1" onClick={() => handleButtonClick(value)}>
          Search
        </Button>
      }
    />
  );
};

export default Search;
