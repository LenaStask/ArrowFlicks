import {
  Button,
  Flex,
  Group,
  Modal,
  Text,
  Rating as MantineRating,
} from "@mantine/core";
import classes from "./Rating.module.css";
import { IconStarFilled } from "@tabler/icons-react";
import MovieShortInfo from "@/app/types/MovieShortInfo";
import { useDisclosure } from "@mantine/hooks";
import { useState } from "react";
import {
  getRatedMovie,
  getRatedMovies,
  removeRatedMovie,
  setRatedMovie,
} from "@/app/store/localStorage";

const Rating = ({ movie }: { movie: MovieShortInfo }) => {
  const [opened, { open, close }] = useDisclosure(false);
  const [value, setValue] = useState(getRatedMovie(movie.id));

  const ratedMovies = getRatedMovies();

  return (
    <Flex className={classes.iconStar}>
      <Modal
        classNames={classes}
        opened={opened}
        onClose={close}
        title="Your rating"
        centered
      >
        <Flex direction={"column"} gap={16}>
          <Text className={classes.modalTitle}>{movie.title}</Text>
          <MantineRating
            value={value}
            onChange={setValue}
            count={10}
            size={"lg"}
          />
          <Group>
            <Button
              className={classes.fillButton}
              onClick={() => {
                setRatedMovie(movie.id, value);
                close();
              }}
            >
              Save
            </Button>
            <Button
              variant="transparent"
              className={classes.transporentButton}
              onClick={() => {
                removeRatedMovie(movie.id);
                setValue(0);
                close();
              }}
            >
              Remove rating
            </Button>
          </Group>
        </Flex>
      </Modal>
      {ratedMovies[movie.id] ? (
        <>
          <IconStarFilled
            color="var(--mantine-color-purple-1)"
            onClick={(event) => {
              event.preventDefault();
              open();
            }}
          />
          <span>{getRatedMovie(movie.id)}</span>
        </>
      ) : (
        <>
          <IconStarFilled
            color="var(--mantine-color-grey-4)"
            onClick={(event) => {
              event.preventDefault();
              open();
            }}
          />
        </>
      )}
    </Flex>
  );
};

export default Rating;
