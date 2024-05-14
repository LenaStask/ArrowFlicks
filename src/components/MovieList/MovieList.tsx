import { Container, Flex, Group } from '@mantine/core';
import classes from "./MovieList.module.css";
import MovieListItem from '../MovieListItem/MovieListItem';
import IMovie from '@/app/interfaces/IMovie';

const MovieList = ({movies}:{movies: IMovie[]}) => {
  const children = movies.map((movie): React.ReactNode => 
    <MovieListItem key={movie.id} movie={movie}/>
  )
  return (
    <Container className={classes.container}>
      {children}
    </Container>
  );
}

export default MovieList;