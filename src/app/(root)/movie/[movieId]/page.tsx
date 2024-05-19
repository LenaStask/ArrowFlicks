"use client";

import { useQuery } from "@tanstack/react-query";
import { getMovie } from "../../../../api/tmdb";
import Movie from "@/components/Movie/Movie";
import Trailer from "@/components/Trailer/Trailer";
import classes from "./page.module.css";
import { Text } from '@mantine/core';

export default function MovieDetails({
  params,
}: {
  params: { movieId: string };
}) {
  const { data, isLoading, isSuccess } = useQuery({
    queryFn: () => getMovie(Number(params.movieId)),
    queryKey: ["movie", params.movieId],
  });

  if (isSuccess) {
    return (
      <div className={classes.container}>
        <Text>Movie / {data.title}</Text>
        <Movie movie={data} />
        <Trailer movie={data} />
      </div>
    );
  }
}
