import { Flex, MultiSelect, Select } from "@mantine/core";
import { useState } from "react";
import classes from "./Filters.module.css";
import { useQuery } from "@tanstack/react-query";
import { getGenresList } from "@/api/tmdb";
import IGenre from "@/app/interfaces/IGenre";
import { IconChevronDown } from "@tabler/icons-react";
import { YearPickerInput } from "@mantine/dates";

interface IFilters {
  genres: string[];
  year: number;
}

interface ChildProps {
  onChange: (value: IFilters) => void;
}

const Filters = ({ onChange }: ChildProps) => {
  const { data, isSuccess } = useQuery({
    queryFn: () => getGenresList(),
    queryKey: ["genres"],
  });

  const sendOptionValue = (genres: string[]) => {
    setFilters(filters);
    onChange(filters);
  };

  const genresList = isSuccess && data.genres.map((item: IGenre) => item.name);
  const [filters, setFilters] = useState<IFilters>({ genres: [], year: 0 });

  return (
    <Flex className={classes.container}>
      <MultiSelect
        classNames={classes}
        label="Genres"
        data={genresList}
        value={filters.genres}
        placeholder="Select genre"
        rightSection={
          <IconChevronDown
            stroke={1.5}
            size={24}
            className={classes.selectIcon}
          />
        }
        onChange={(_value) => sendOptionValue(_value as string[])}
        withCheckIcon={false}
        clearable={true}
      />
      <YearPickerInput
        classNames={classes}
        placeholder="Select release year"
        label="Release year"
        rightSection={
          <IconChevronDown
            stroke={1.5}
            size={24}
            className={classes.selectIcon}
          />
        }
      />
    </Flex>
  );
};

export default Filters;
