"use client";

import { Burger, Flex, Paper, Transition } from "@mantine/core";
import { Logo } from "../Logo/Logo";
import classes from "./Navbar.module.css";
import { useState } from "react";
import { useDisclosure } from "@mantine/hooks";

const data = [
  { link: "", label: "Movies" },
  { link: "", label: "Rated movies" },
];

const Navbar = () => {
  const [active, setActive] = useState("Movies");
  const [opened, { toggle }] = useDisclosure(false);

  const links = data.map((item) => (
    <a
      className={classes.link}
      data-active={item.label === active || undefined}
      href={item.link}
      key={item.label}
      onClick={(event) => {
        event.preventDefault();
        setActive(item.label);
      }}
    >
      <span>{item.label}</span>
    </a>
  ));

  return (
    <Flex className={classes.navbar} bg="purple.5">
      <Logo />
      <Flex className={classes.navigation}>{links}</Flex>
      <Burger opened={opened} onClick={toggle} className={classes.burger} />
      <Transition
        mounted={opened}
        duration={200}
        transition="pop-top-right"
        timingFunction="ease"
      >
        {(styles) => (
          <Paper
            h={120}
            pos="absolute"
            top={50}
            right={0}
            left={0}
            className={classes.burgerMenu}
            style={{ ...styles, zIndex: 2 }}
            withBorder
          >
            {links}
          </Paper>
        )}
      </Transition>
    </Flex>
  );
};

export { Navbar };
