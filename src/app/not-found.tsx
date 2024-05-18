import { Button, Flex, Group, Image, Text } from "@mantine/core";
import not_found1 from "../assets/not_found1.svg";
import not_found2 from "../assets/not_found2.svg";
import not_found3 from "../assets/not_found3.svg";
import NextImage from "next/image";
import { Logo } from '@/components/Logo/Logo';
import classes from './not-found.module.css';

const NotFound = () => {
  return (
    <div className={classes.container}>
      <div className={classes.logo}>
        <Logo/>
      </div>
        <Group className={classes.group}>
          <Image src={not_found1} alt="not found" component={NextImage}></Image>
          <Image src={not_found2} alt="not found" component={NextImage} className={classes.image}></Image>
          <Image src={not_found3} alt="not found" component={NextImage}></Image>
          <Text>We can’t find the page you are looking for</Text>
          <Button component="a" href="/" color="purple.1">
            Go home
          </Button>
        </Group>
    </div>
  );
};

export default NotFound;
