import { ApolloServer } from "apollo-server";
import { HOST, PORT } from "./config";

function main() {
  const server = new ApolloServer({});

  server
    .listen(PORT, HOST)
    .then(({ url }) => console.log(`Listening at ${url}`));
}

main();
