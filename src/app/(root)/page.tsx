"use client";

import { getGenres, getMovies } from "../../api/tmdb/TmdbApi";
import MovieList from "@/components/MovieList/MovieList";
import { Center, Flex, Loader, Pagination } from "@mantine/core";
import { useQuery } from "@tanstack/react-query";
import { useState } from "react";
import classes from "./page.module.css";
import Sorting from "@/components/Sorting/Sorting";
import Filters from "@/components/Filters/Filters";
import convertToMovieInfo from "@/helpers/convertToMovieInfo";
import { MovieListFilters } from "@/api/tmdb/types";

const MAX_TOTAL_PAGES = 500;

export default function Home() {
  const [activePage, setPage] = useState(1);
  const [sorting, setSorting] = useState("popularity.desc");
  const [filters, setFilters] = useState<MovieListFilters>({});

  const genresQuery = useQuery({
    queryFn: () => getGenres(),
    queryKey: ["genres"],
  });

  const { data, isLoading, isSuccess } = useQuery({
    queryFn: () => getMovies(filters, sorting, activePage),
    queryKey: ["movies", filters, sorting, activePage],
  });

  const handleSortingChange = (value: string) => {
    setSorting(value);
  };

  const handFiltersChange = (value: MovieListFilters) => {
    setFilters(value);
  };

  if (isLoading) {
    return (
      <Center>
        <Loader color="purple.1" size="xl" type="dots" />
      </Center>
    );
  }

  if (genresQuery.isSuccess && isSuccess) {
    return (
      <div className={classes.container}>
        <Filters
          onChange={handFiltersChange}
          genres={genresQuery.data.genres}
        />
        <Sorting value={sorting} onChange={handleSortingChange} />
        <MovieList
          movies={convertToMovieInfo(data.results, genresQuery.data.genres)}
        />
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
