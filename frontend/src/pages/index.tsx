import Home from "../components/Home";
import Landing from "../components/Landing";
import { useMeQuery } from "../generated/graphql";

export function Index() {
  const { data, loading, error } = useMeQuery();

  if (loading) return <></>;
  if (error) return <p>Error: {String(error.message)}</p>;

  if (data?.me?.name) {
    // graphic design is my passion
    return <Home name={data.me.name} />;
  }

  return <Landing />;
}

export default Index;
