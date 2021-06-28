import { ApolloServer } from "apollo-server";
import "reflect-metadata";
import { buildSchema } from "type-graphql";
import { HOST, PORT } from "./config";
import { HelloResolver } from "./resolvers/hello";

async function main() {
  const schema = await buildSchema({
    resolvers: [HelloResolver],
  });
  const server = new ApolloServer({ schema });

  server
    .listen(PORT, HOST)
    .then(({ url }) => console.log(`Listening at ${url}`));
}

main();
