import { Box, Flex, Heading } from "@chakra-ui/react";
import LoginButton from "./LoginButton";

export default function Landing() {
  return (
    <Flex justify="center" mt="2rem">
      <Box>
        <Heading>Sink</Heading>
        <LoginButton />
      </Box>
    </Flex>
  );
}
