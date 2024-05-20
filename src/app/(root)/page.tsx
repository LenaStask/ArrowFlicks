"use client";

import { getMovies } from "../../api/tmdb/TmdbApi";
import MovieList from "@/components/MovieList/MovieList";
import { Pagination } from "@mantine/core";
import { useQuery } from "@tanstack/react-query";
import { useState } from "react";
import classes from "./page.module.css";
import Sorting from "@/components/Sorting/Sorting";
import Filters from "@/components/Filters/Filters";

const MAX_TOTAL_PAGES = 500;

interface IFilters {
  genres: string[];
  year: number;
}

export default function Home() {
  const [activePage, setPage] = useState(1);
  const [sorting, setSorting] = useState("popularity.desc");
  const [filters, setFilters] = useState<IFilters>({
    genres: [],
    year: 0,
  });

  const { data, isLoading, isSuccess } = useQuery({
    queryFn: () => getMovies(activePage, sorting),
    queryKey: ["movies", activePage, sorting],
  });

  const handleSortingChange = (value: string) => {
    setSorting(value);
  };
  const handFiltersChange = (value: IFilters) => {
    setFilters(value);
  };

  if (isSuccess) {
    return (
      <div className={classes.container}>
        <Filters onChange={handFiltersChange} />
        <Sorting onChange={handleSortingChange} />
        <MovieList movies={data.results} />
        <Pagination
          classNames={classes}
          value={activePage}
          onChange={setPage}
          total={Math.min(data.total_pages, MAX_TOTAL_PAGES)}
          color="purple.1"
          boundaries={-1}
        />
      </div>
    );
  }
}
