import { Center, Text } from "@chakra-ui/react";
import Landing from "../components/Landing";
import LogoutButton from "../components/LogoutButton";
import { useMeQuery } from "../generated/graphql";

export function Index() {
  const { data, loading, error } = useMeQuery();

  if (loading) return <></>;
  if (error) return <Text>Error: {String(error.message)}</Text>;

  if (data?.me?.name) {
    // graphic design is my passion
    return (
      <Center>
        <Text>Hello {data.me.name}</Text>
        <LogoutButton />
      </Center>
    );
  }

  return <Landing />;
}

export default Index;
