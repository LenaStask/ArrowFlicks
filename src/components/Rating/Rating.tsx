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
import { useDisclosure } from "@mantine/hooks";
import { useState } from "react";
import {
  getRatedMovie,
  removeRatedMovie,
  setRatedMovie,
} from "@/store/localStorage";
import MovieInfo from "@/types/MovieInfo";

const Rating = ({ movie }: { movie: MovieInfo }) => {
  const ratedMovie = getRatedMovie(movie.id);

  const [opened, { open, close }] = useDisclosure(false);
  const [value, setValue] = useState(ratedMovie ? ratedMovie.rating : 0);

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
          <Text className={classes.modalTitle}>{movie.original_title}</Text>
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
                setRatedMovie(movie, value);
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
      {value !== 0 ? (
        <>
          <IconStarFilled
            color="var(--mantine-color-purple-1)"
            onClick={(event) => {
              event.preventDefault();
              open();
            }}
          />
          <span>{value}</span>
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
