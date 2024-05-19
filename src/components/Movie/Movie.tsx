import NextImage from "next/image";
import { Card, Image, Text, Group, Flex, Title } from "@mantine/core";
import classes from "./Movie.module.css";
import { IconStarFilled } from "@tabler/icons-react";
import no_poster from "../../assets/no_poster.svg";
import IMovie from '@/app/interfaces/IMovie';

const convertDate = (date: string): string => {
  const newDate = new Date(date);
  const month = newDate.toLocaleString("en-US", { month: "long" });
  const day = newDate.getDate();
  const year = newDate.getFullYear();

  return `${month} ${day}, ${year}`;
};
const Movie = ({ movie }: { movie: IMovie }) => {
  return (
    <Card className={classes.card}>
      {movie.poster_path === null ? (
        <Image
          priority={true}
          src={no_poster}
          width={250}
          height={352}
          component={NextImage}
          alt="poster"
        />
      ) : (
        <Image
          priority={true}
          src={"https://image.tmdb.org/t/p/w185" + movie.poster_path}
          width={250}
          height={352}
          component={NextImage}
          alt="poster"
        />
      )}
      <Flex className={classes.header}>
        <Flex direction="column">
          <Title order={2} className={classes.title}>{movie.title}</Title>
          <Text className={classes.year}>{movie.release_date}</Text>
          <Group className={classes.vote}>
            <IconStarFilled color="#FAB005" />
            <Text className={classes.average}>
              {movie.vote_average.toFixed(1)}
            </Text>
            <Text className={classes.count}>({movie.vote_count})</Text>
          </Group>
        </Flex>
        <Group className={classes.info}>
          <Text className={classes.genres}>
            <div className={classes.label}>Duration</div>
            <span>{`${Math.trunc(movie.runtime / 60)}h ${
              movie.runtime - Math.trunc(movie.runtime / 60) * 60
            }min`}</span>
          </Text>
          <Text className={classes.genres}>
            <div className={classes.label}>Premiere</div>
            <span>{convertDate(movie.release_date)}</span>
          </Text>
          <Text className={classes.genres}>
            <div className={classes.label}>Gross worldwide </div>
            <span>${movie.revenue.toLocaleString()}</span>
          </Text>
          <Text className={classes.genres}>
            <div className={classes.label}>Budget</div>
            <span>${movie.budget.toLocaleString()}</span>
          </Text>
          <Text className={classes.genres}>
            <div className={classes.label}>Genres</div>
            <span>{movie.genres.map((item) => item.name).join(", ")}</span>
          </Text>
        </Group>
      </Flex>
      <Flex className={classes.iconStar}>
        <IconStarFilled color="var(--mantine-color-grey-3)" />
        <span>9</span>
      </Flex>
    </Card>
  );
};

export default Movie;
