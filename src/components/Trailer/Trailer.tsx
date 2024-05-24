import { Card, Group, Title, Text, Image } from "@mantine/core";
import classes from "./Trailer.module.css";
import no_logo from "../../assets/no_logo.svg";
import { Movie } from "@/api/tmdb/types";
import NextImage from "next/image";

const Trailer = ({ movie }: { movie: Movie }) => {
  const items = movie.production_companies.map((item) => (
    <div key={item.name} className={classes.group}>
      {item.logo_path === null ? (
        <Image
          className={classes.image}
          src={no_logo}
          alt="production companies logo"
          component={NextImage}
        />
      ) : (
        <Image
          className={classes.image}
          src={"https://image.tmdb.org/t/p/w185" + item.logo_path}
          alt="production companies logo"
        ></Image>
      )}
      <span>{item.name}</span>
    </div>
  ));

  return (
    <Card className={classes.card}>
      <Group className={classes.section}>
        <Title order={3} className={classes.title}>
          Trailer
        </Title>
        {movie.videos.results.length !== 0 ? (
          <iframe
            className={classes.video}
            src={`https://www.youtube.com/embed/${movie.videos.results[0].key}`}
            allow="fullscreen"
          ></iframe>
        ) : (
          <></>
        )}
      </Group>
      <Group className={classes.description}>
        <Title order={3} className={classes.title}>
          Description
        </Title>
        <Text>{movie.overview}</Text>
      </Group>
      <Group className={classes.section}>
        <Title order={3} className={classes.title}>
          Production
        </Title>
        {items}
      </Group>
    </Card>
  );
};

export default Trailer;
