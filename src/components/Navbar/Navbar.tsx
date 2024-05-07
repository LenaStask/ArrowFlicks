"use client";
import { Flex } from "@mantine/core";
import { Logo } from "../Logo/Logo";
import classes from "./Navbar.module.css";
import { useState } from "react";

const data = [
  { link: "", label: "Movies" },
  { link: "", label: "Rated movies" },
];

const Navbar = () => {
  const [active, setActive] = useState("Movies");

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
    </Flex>
  );
};

export { Navbar };
