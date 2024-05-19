import NextImage from "next/image";
import { Card, Image, Text, Group, Flex, Title } from "@mantine/core";
import classes from "./MovieListItem.module.css";
import { IconStarFilled } from "@tabler/icons-react";
import { useQuery } from "@tanstack/react-query";
import { getGenresList } from "@/api/tmdb";
import no_poster from "../../assets/no_poster.svg";
import IMovie from '@/app/interfaces/IMovie';

const MovieListItem = ({ movie }: { movie: IMovie }) => {
  const { data, isSuccess } = useQuery({
    queryFn: () => getGenresList(),
    queryKey: ["genres"],
  });

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
        <Flex direction="column">
          <Title className={classes.title} order={2}>{movie.title}</Title>
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
          <span>
            {isSuccess &&
              data.genres
                .reduce((res: string[], item) => {
                  if (movie.genre_ids.includes(item.id)) {
                    res.push(item.name);
                  }
                  return res;
                }, [])
                .join(", ")}
          </span>
        </Text>
      </Flex>
      <Flex className={classes.iconStar}>
        <IconStarFilled color="var(--mantine-color-grey-3)" />
        <span>9</span>
      </Flex>
    </Card>
  );
};

export default MovieListItem;
