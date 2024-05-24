"use client";

import { useQuery } from "@tanstack/react-query";
import { getMovie } from "../../../../api/tmdb/TmdbApi";
import Movie from "@/components/Movie/Movie";
import Trailer from "@/components/Trailer/Trailer";
import classes from "./page.module.css";
import { Center, Loader, Text } from "@mantine/core";

export default function MovieDetails({
  params,
}: {
  params: { movieId: string };
}) {
  const { data, isLoading, isSuccess } = useQuery({
    queryFn: () => getMovie(Number(params.movieId)),
    queryKey: ["movie", params.movieId],
  });

  if (isLoading) {
    return (
      <Center>
        <Loader color="purple.1" size="xl" type="dots" />
      </Center>
    );
  }

  if (isSuccess) {
    return (
      <div className={classes.container}>
        <div className={classes.path}>
          <span>Movies</span> / <span>{data.title}</span>
        </div>
        <Movie movie={data} />
        <Trailer movie={data} />
      </div>
    );
  }
}
