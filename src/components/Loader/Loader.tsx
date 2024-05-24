import { Center, Loader as MantineLoader } from "@mantine/core";

const Loader = () => {
  return (
    <Center>
      <MantineLoader color="purple.1" size="xl" type="dots" />
    </Center>
  );
};

export default Loader;
