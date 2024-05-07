import NextImage from 'next/image';
import { Box, Center, Image, Text } from '@mantine/core';
import icon from '../../../public/icon.svg';
import { Poppins } from "next/font/google";
import classes from './Logo.module.css';

const poppins = Poppins({subsets: ['latin'], weight: ['600']});

const Logo = () => {
  return (
    <Box  className={classes.logo} component='a' href='/'>
      <Center className={classes.center}>
        <Image className={classes.image} component={NextImage} src={icon} alt='icon'/>
        <Text className={poppins.className}  span c='purple.0' >ArrowFlicks</Text>
      </Center>
    </Box>
  );
}

export {Logo};