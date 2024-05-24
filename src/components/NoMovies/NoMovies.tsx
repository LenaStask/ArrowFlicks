import NextImage from "next/image";
import { Center, Image, Text } from "@mantine/core";
import classes from "./NoMovies.module.css";
import no_movies from "../../assets/no_movies.svg";

const NoMovies = () => {
  return (
    <Center classNames={{ root: classes.centerRoot }}>
      <Image
        classNames={{ root: classes.imageRoot }}
        src={no_movies}
        alt="No movies image"
        component={NextImage}
      ></Image>
      <Text>We don&apos;t have such movies, look for another one</Text>
    </Center>
  );
};

export default NoMovies;
