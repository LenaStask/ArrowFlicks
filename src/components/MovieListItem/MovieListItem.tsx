import NextImage from "next/image";
import { Card, Image, Text, Group, Flex } from "@mantine/core";
import classes from "./MovieListItem.module.css";
import { IconStarFilled } from "@tabler/icons-react";
import IMovie from "@/app/interfaces/IMovie";
import { useQuery } from "@tanstack/react-query";
import { getGenresList } from "@/app/api/discover";

const MovieListItem = ({ movie }: { movie: IMovie }) => {
  const { data, isSuccess } = useQuery({
    queryFn: getGenresList,
    queryKey: ["genres"],
  });
  return (
    <Card className={classes.card}>
        <Image
          priority={true}
          src={"https://image.tmdb.org/t/p/w185" + movie.poster_path}
          width={119}
          height={170}
          component={NextImage}
          alt="poster"
        />
      <Flex className={classes.info}>
        <Flex direction="column">
          <Text className={classes.title}>{movie.title}</Text>
          <Text className={classes.year}>{movie.release_date.slice(0, 4)}</Text>
          <Group className={classes.vote}>
            <IconStarFilled color="#FAB005" />
            <Text className={classes.average}>{movie.vote_average.toFixed(1)}</Text>
            <Text className={classes.count}>({movie.vote_count})</Text>
          </Group>
        </Flex>
        <Text className={classes.genres}>
          Genres <span>{isSuccess && data.reduce((res:string[], item) => {
            if(movie.genre_ids.includes(item.id)) {
              res.push(item.name)
            }
            return res;
          } ,[]).join(', ')}</span>
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
