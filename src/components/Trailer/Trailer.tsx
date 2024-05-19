import { Card, Group, Title, Text, Image } from "@mantine/core";
import classes from "./Trailer.module.css";
import { useQuery } from "@tanstack/react-query";
import { getVideos } from "@/api/tmdb";
import IMovie from "@/app/interfaces/IMovie";
import no_logo from "../../assets/no_logo.png";

const Trailer = ({ movie }: { movie: IMovie }) => {
  const { data, isSuccess } = useQuery({
    queryFn: () => getVideos(movie.id),
    queryKey: ["vedios", movie.id],
  });

  const items = movie.production_companies.map((item) => (
    <div key={item.name} className={classes.group}>
      {item.logo_path === null ? (
        <Image
          className={classes.image}
          src={no_logo}
          alt="production companies logo"
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

  if (isSuccess) {
    return (
      <Card className={classes.card}>
        <Group className={classes.section}>
          <Title order={2} className={classes.title}>
            Trailer
          </Title>
          <iframe
            className={classes.video}
            src={`https://www.youtube.com/embed/${data.results[0].key}`}
          ></iframe>
        </Group>
        <Group className={classes.section}>
          <Title order={2} className={classes.title}>
            Description
          </Title>
          <Text>{movie.overview}</Text>
        </Group>
        <Group className={classes.section}>
          <Title order={2} className={classes.title}>
            Production
          </Title>
          {items}
        </Group>
      </Card>
    );
  }
};

export default Trailer;
