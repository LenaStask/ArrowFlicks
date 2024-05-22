import { Button, Flex, Group, MultiSelect, NumberInput } from "@mantine/core";
import { useState } from "react";
import classes from "./Filters.module.css";
import { IconChevronDown } from "@tabler/icons-react";
import { YearPickerInput } from "@mantine/dates";
import { Genre, MovieListFilters } from "@/api/tmdb/types";

interface ChildProps {
  genres: Genre[];
  onChange: (value: MovieListFilters) => void;
}

const Filters = ({ onChange, genres }: ChildProps) => {
  const comboboxData = genres.map((item: Genre) => ({
    value: item.id.toString(),
    label: item.name,
  }));

  const [selectedGenres, setSelectedGenres] = useState<string[]>([]);

  const handleChangeGenres = (genres: string[]) => {
    setSelectedGenres(genres);
    triggerOnChange();
  };

  const triggerOnChange = () => {
    onChange({
      with_genres: selectedGenres.join(","),
    });
  };

  return (
    <Flex className={classes.container}>
      <MultiSelect
        classNames={{
          input: classes.input,
          label: classes.label
        }}
        label="Genres"
        data={comboboxData}
        value={selectedGenres}
        placeholder="Select genre"
        rightSection={
          <IconChevronDown
            stroke={1.5}
            size={24}
            className={classes.selectIcon}
          />
        }
        onChange={handleChangeGenres}
        withCheckIcon={false}
        clearable={true}
      />
      <YearPickerInput
        classNames={{
          input: classes.input,
          label: classes.label,
          }}
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
      <Group gap={8}>
        <NumberInput
          classNames={{
            input: classes.numberInput,
            section: classes.numberSection,
            control: classes.numberControl,
            label: classes.label,
          }}
          label="Ratings"
          placeholder="From"
          min={0}
          max={10}
          step={1}
        />
        <NumberInput
          classNames={{
            input: classes.numberInput,
            section: classes.numberSection,
            control: classes.numberControl,
            label: classes.label,
          }}
          label=" "
          placeholder="To"
        />
      </Group>
        <Button
          variant="transparent"
          className={classes.transporentButton}
        >Reset filters</Button>
    </Flex>
  );
};

export default Filters;
