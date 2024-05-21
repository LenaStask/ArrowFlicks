"use client";

import { getMovie } from "@/api/tmdb/TmdbApi";
import { getRatedMovies } from "@/store/localStorage";
import MovieList from "@/components/MovieList/MovieList";
import MovieInfo from "@/types/MovieInfo";
import { useQueries } from "@tanstack/react-query";
import { Pagination } from "@mantine/core";
import classes from "./page.module.css";
import { useEffect, useState } from "react";
import RatedMovie from "@/types/RatedMovie";

export default function RatedMovies() {
  const [movies, setMovies] = useState<RatedMovie[]>([]);
  const [activePage, setPage] = useState(1);

  useEffect(() => {
    setMovies(getRatedMovies());
  }, []);

  const getMoviesForPage = (
    movies: RatedMovie[],
    page: number
  ): RatedMovie[] => {
    return movies.slice(4 * page, 4 * (page + 1));
  };

  const getNumberOfPages = (movies: RatedMovie[]) => {
    if (movies.length <= 4) {
      return 0;
    }

    return Math.ceil(movies.length / 4);
  };

  const queries = useQueries({
    queries: getMoviesForPage(movies, activePage - 1).map(({ id }) => {
      return {
        queryKey: ["getMovie", id],
        queryFn: () => getMovie(Number(id)),
      };
    }),
    combine: (results) => {
      return {
        data: results.map((result) => result.data),
        pending: results.some((result) => result.isPending),
      };
    },
  });

  if (!queries.pending) {
    return (
      <div>
        <MovieList movies={queries.data as MovieInfo[]} />
        <Pagination
          classNames={classes}
          value={activePage}
          onChange={setPage}
          total={getNumberOfPages(movies)}
          color="purple.1"
          boundaries={-1}
        />
      </div>
    );
  }
}
