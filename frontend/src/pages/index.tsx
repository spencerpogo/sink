import { Text } from "@chakra-ui/react";
import Landing from "../components/Landing";
import { useMeQuery } from "../generated/graphql";

export function Index() {
  const { data, loading, error } = useMeQuery();

  if (loading) return <></>;
  if (error) return <Text>Error: {String(error.message)}</Text>;

  if (data?.me?.name) {
    return <Text>Hello {data.me.name}</Text>;
  }

  return <Landing />;
}

export default Index;
