import {
  Button,
  Flex,
  Group,
  MultiSelect,
  NumberInput,
  Select,
  MultiSelectValueProps,
} from "@mantine/core";
import { useState } from "react";
import classes from "./Filters.module.css";
import { IconChevronDown, IconChevronUp } from "@tabler/icons-react";
import {
  Genre,
  MovieListFilterNames,
  MovieListFilters,
} from "@/api/tmdb/types";

interface ChildProps {
  genres: Genre[];
  value: MovieListFilters;
  onChange: (value: { [key in MovieListFilterNames]?: string }) => void;
  onReset: () => void;
}

const Filters = ({ genres, value, onChange, onReset }: ChildProps) => {
  const genresData = genres.map((item: Genre) => ({
    value: item.id.toString(),
    label: item.name,
  }));

  const [selectedGenres, setSelectedGenres] = useState<string[]>(
    value.with_genres?.split(",") ?? []
  );

  const [selectedYear, setSelectedYear] = useState<string | null>(
    value.primary_release_year?.toString() ?? null
  );

  const [selectedRatingFrom, setSelectedRatingFrom] = useState<string>(
    value["vote_average.gte"] ?? ""
  );

  const [selectedRatingTo, setSelectedRatingTo] = useState<string>(
    value["vote_average.lte"] ?? ""
  );

  const handleGenresChange = (genres: string[]) => {
    setSelectedGenres(genres);
    onChange({ [MovieListFilterNames.WithGenres]: genres.join(",") });
  };

  const handleYearChange = (year: string | null) => {
    year = year ?? "";

    setSelectedYear(year);
    onChange({ [MovieListFilterNames.PrimaryReleaseYear]: year });
  };

  const handleRatingFromChange = (rating: string | number) => {
    rating = rating.toString();

    setSelectedRatingFrom(rating);
    onChange({ [MovieListFilterNames.VoteAverageGte]: rating });
  };

  const handleRatingToChange = (rating: string | number) => {
    rating = rating.toString();

    setSelectedRatingTo(rating);
    onChange({ [MovieListFilterNames.VoteAverageLte]: rating });
  };

  const handleReset = () => {
    setSelectedGenres([]);
    setSelectedYear(null);
    setSelectedRatingFrom("");
    setSelectedRatingTo("");

    onReset();
  };

  const isDisabled = () => {
    return (
      selectedGenres.length === 0 &&
      selectedYear === null &&
      selectedRatingFrom === "" &&
      selectedRatingTo === ""
    );
  };

  const [expandedGenres, setExpandedGenres] = useState(false);
  const handleGenresDropdownOpen = () => setExpandedGenres(true);
  const handleGenresDropdownClose = () => setExpandedGenres(false);

  const [expandedYear, setExpandedYear] = useState(false);
  const handleYearDropdownOpen = () => setExpandedYear(true);
  const handleYearDropdownClose = () => setExpandedYear(false);

  const yearsData: string[] = [];
  for (let i = 2024; i >= 1800; i--) {
    yearsData.push(i.toString());
  }

  return (
    <Flex className={classes.container}>
      <MultiSelect
        classNames={{
          root: classes.root,
          input: classes.input,
          label: classes.label,
          pillsList: classes.pillsList,
          pill: classes.pill,
          inputField: classes.inputField,
          dropdown: classes.dropdown,
          option: classes.option,
        }}
        label="Genres"
        data={genresData}
        value={selectedGenres}
        onChange={(_value) => {
          handleGenresChange(_value);
        }}
        placeholder={selectedGenres.length === 0 ? "Select genre" : ""}
        withCheckIcon={false}
        clearable={true}
        rightSection={
          expandedGenres ? (
            <IconChevronUp stroke={1.5} size={24} className={classes.iconUp} />
          ) : (
            <IconChevronDown
              stroke={1.5}
              size={24}
              className={classes.iconDown}
            />
          )
        }
        onDropdownOpen={handleGenresDropdownOpen}
        onDropdownClose={handleGenresDropdownClose}
      />
      <Select
        data={yearsData}
        value={selectedYear}
        onChange={handleYearChange}
        placeholder="Select release year"
        label="Release year"
        classNames={{
          root: classes.root,
          input: classes.input,
          label: classes.label,
          dropdown: classes.dropdown,
          option: classes.option,
        }}
        rightSection={
          expandedYear ? (
            <IconChevronUp stroke={1.5} size={24} className={classes.iconUp} />
          ) : (
            <IconChevronDown
              stroke={1.5}
              size={24}
              className={classes.iconDown}
            />
          )
        }
        onDropdownOpen={handleYearDropdownOpen}
        onDropdownClose={handleYearDropdownClose}
      />
      <Group gap={8}>
        <NumberInput
          classNames={{
            root: classes.numberRoot,
            input: classes.numberInput,
            section: classes.numberSection,
            control: classes.numberControl,
            label: classes.label,
          }}
          value={selectedRatingFrom}
          onChange={handleRatingFromChange}
          label="Ratings"
          placeholder="From"
          min={0}
          max={10}
          step={1}
        />
        <NumberInput
          classNames={{
            root: classes.numberRoot,
            input: classes.numberInput,
            section: classes.numberSection,
            control: classes.numberControl,
            label: classes.label,
          }}
          value={selectedRatingTo}
          onChange={handleRatingToChange}
          label=" "
          placeholder="To"
        />
      </Group>
      <Button
        variant="transparent"
        className={classes.transparentButton}
        disabled={isDisabled()}
        onClick={handleReset}
      >
        Reset filters
      </Button>
    </Flex>
  );
};

export default Filters;
