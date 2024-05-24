"use client";

import { getGenres, getMovies } from "../../api/tmdb/TmdbApi";
import MovieList from "@/components/MovieList/MovieList";
import { Center, Text, Loader, Pagination, Image, Flex } from "@mantine/core";
import { useQuery } from "@tanstack/react-query";
import { useState } from "react";
import classes from "./page.module.css";
import Sorting from "@/components/Sorting/Sorting";
import Filters from "@/components/Filters/Filters";
import convertToMovieInfo from "@/helpers/convertToMovieInfo";
import { MovieListFilterNames, MovieListFilters } from "@/api/tmdb/types";
import no_movies from "../../assets/no_movies.svg";
import NextImage from "next/image";

const MAX_TOTAL_PAGES = 500;

export default function Home() {
  const [activePage, setPage] = useState(1);
  const [sorting, setSorting] = useState("popularity.desc");
  const [filters, setFilters] = useState<MovieListFilters>({});

  const genresQuery = useQuery({
    queryFn: () => getGenres(),
    queryKey: ["genres"],
  });

  const moviesQuery = useQuery({
    queryFn: () => getMovies(filters, sorting, activePage),
    queryKey: ["movies", filters, sorting, activePage],
  });

  const handleSortingChange = (value: string) => {
    setSorting(value);
  };

  const handleFiltersChange = (filter: { [key in MovieListFilterNames]?: string }) => {
    setFilters((prevState) => ({ ...prevState, ...filter }));
  };

  if(genresQuery.isError || moviesQuery.isError) {
    return (
      <div>
        {genresQuery.error?.message}
      </div>
    );
  }

  if (genresQuery.isLoading || moviesQuery.isLoading) {
    return (
      <Center>
        <Loader color="purple.1" size="xl" type="dots" />
      </Center>
    );
  }

  if (genresQuery.isSuccess && moviesQuery.isSuccess) {
    return (
      <div className={classes.container}>
        <Filters
          value={filters}
          onChange={handleFiltersChange}
          genres={genresQuery.data.genres}
        />
        <Sorting value={sorting} onChange={handleSortingChange} />
      {moviesQuery.data.results.length === 0?
      <Center classNames={{root: classes.centerRoot}}>
        <Image
          classNames={{root: classes.imageRoot}}
          src={no_movies}
          alt="No movies image"
          component={NextImage}
        ></Image>
          <Text>We don&apos;t have such movies, look for another one</Text>
      </Center>
      :
      <>
        <MovieList
          movies={convertToMovieInfo(
            moviesQuery.data.results,
            genresQuery.data.genres
          )}
        />
        <Pagination
        classNames={classes}
        value={activePage}
        onChange={setPage}
        total={Math.min(moviesQuery.data.total_pages, MAX_TOTAL_PAGES)}
        color="purple.1"
        boundaries={-1}
      />
      </>
      }
      </div>
    );
  }
}
