"use client";

import { getRatedMovies } from "@/store/localStorage";
import MovieList from "@/components/MovieList/MovieList";
import MovieInfo from "@/types/MovieInfo";
import {
  Pagination,
  Image,
  Text,
  Button,
  Group,
  Title,
  Flex,
  Center,
} from "@mantine/core";
import classes from "./page.module.css";
import { useEffect, useState } from "react";
import no_ratedMovies from "../../../assets/no_rated_movies.svg";
import NextImage from "next/image";
import Search from "@/components/Search/Search";
import Loader from "@/components/Loader/Loader";
import NoMovies from "@/components/NoMovies/NoMovies";

export default function RatedMovies() {
  const [isLoading, setIsLoading] = useState(true);
  const [movies, setMovies] = useState<MovieInfo[]>([]);
  const [foundMovies, setFoundMovies] = useState<MovieInfo[]>([]);
  const [activePage, setPage] = useState(1);

  const handleSearchChange = (value: string) => {
    value = value.toLowerCase();

    const foundMovies = movies.filter((movie) =>
      movie.original_title.toLocaleLowerCase().includes(value),
    );

    setFoundMovies(foundMovies);
  };

  useEffect(() => {
    const ratedMovies = getRatedMovies().map((item) => item.movie);

    setMovies(ratedMovies);
    setFoundMovies(ratedMovies);
    setIsLoading(false);
  }, []);

  const getMoviesForPage = (movies: MovieInfo[], page: number): MovieInfo[] => {
    return movies.slice(4 * page, 4 * (page + 1));
  };

  const getNumberOfPages = (movies: MovieInfo[]) => {
    if (movies.length <= 4) {
      return 0;
    }

    return Math.ceil(movies.length / 4);
  };

  if (isLoading) {
    return <Loader />;
  }

  if (movies.length === 0) {
    return (
      <Flex>
        <Group className={classes.group}>
          <Image
            src={no_ratedMovies}
            alt="No rated movies image"
            component={NextImage}
          ></Image>
          <Text>You haven&apos;t rated any films yet</Text>
          <Button component="a" href="/" color="purple.1">
            Find movies
          </Button>
        </Group>
      </Flex>
    );
  }

  return (
    <Flex className={classes.container}>
      <Group className={classes.search}>
        <Title order={1}>Rated Movies</Title>
        <Search onChange={handleSearchChange} />
      </Group>
      {foundMovies.length !== 0 ? (
        <>
          <MovieList
            movies={
              getMoviesForPage(foundMovies, activePage - 1) as MovieInfo[]
            }
          />
          <Pagination
            classNames={classes}
            value={activePage}
            onChange={setPage}
            total={getNumberOfPages(foundMovies)}
            color="purple.1"
            boundaries={-1}
          />
        </>
      ) : (
        <NoMovies />
      )}
    </Flex>
  );
}
