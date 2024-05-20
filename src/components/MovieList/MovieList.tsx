import { Container } from "@mantine/core";
import classes from "./MovieList.module.css";
import MovieListItem from "../MovieListItem/MovieListItem";
import { MovieListItem as IMovieListItem } from "@/api/tmdb/types";

const MovieList = ({ movies }: { movies: IMovieListItem[] }) => {
  const children = movies.map(
    (movie): React.ReactNode => <MovieListItem key={movie.id} movie={movie} />
  );
  return <Container className={classes.container}>{children}</Container>;
};

export default MovieList;
