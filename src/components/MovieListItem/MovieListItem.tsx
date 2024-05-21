import NextImage from "next/image";
import { Card, Image, Text, Group, Flex, Title } from "@mantine/core";
import classes from "./MovieListItem.module.css";
import { IconStarFilled } from "@tabler/icons-react";
import no_poster from "../../assets/no_poster.svg";
import Rating from "../Rating/Rating";
import MovieInfo from "@/types/MovieInfo";

const MovieListItem = ({ movie }: { movie: MovieInfo }) => {
  return (
    <Card className={classes.card} component="a" href={`/movie/${movie.id}`}>
      {movie.poster_path === null ? (
        <Image
          priority={true}
          src={no_poster}
          width={119}
          height={170}
          component={NextImage}
          alt="poster"
        />
      ) : (
        <Image
          priority={true}
          src={"https://image.tmdb.org/t/p/w185" + movie.poster_path}
          width={119}
          height={170}
          component={NextImage}
          alt="poster"
        />
      )}
      <Flex className={classes.info}>
        <Flex direction="column" className={classes.infoSection}>
          <Title className={classes.cardTitle} order={2}>
            {movie.original_title}
          </Title>
          <Text className={classes.year}>{movie.release_date.slice(0, 4)}</Text>
          <Group className={classes.vote}>
            <IconStarFilled color="#FAB005" />
            <Text className={classes.average}>
              {movie.vote_average.toFixed(1)}
            </Text>
            <Text className={classes.count}>({movie.vote_count})</Text>
          </Group>
        </Flex>
        <Text className={classes.genres}>
          Genres{" "}
          <span>{movie.genres.map((genre) => genre.name).join(", ")}</span>
        </Text>
      </Flex>
      <Rating movie={movie} />
    </Card>
  );
};

export default MovieListItem;
