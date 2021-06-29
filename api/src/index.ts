import { ApolloServer } from "apollo-server";
import path from "path";
import "reflect-metadata";
import { buildSchema } from "type-graphql";
import { createConnection } from "typeorm";
import { DATABASE_URL, HOST, PORT } from "./config";
import { User } from "./models/User";
import { HelloResolver } from "./resolvers/hello";
import { UserResolver } from "./resolvers/user";

async function main() {
  const conn = await createConnection({
    type: "postgres",
    url: DATABASE_URL,
    logging: true,
    migrations: [path.join(__dirname, "migrations", "*")],
    entities: [User],
  });
  await conn.runMigrations();

  const schema = await buildSchema({
    resolvers: [HelloResolver, UserResolver],
  });
  const server = new ApolloServer({ schema });

  server
    .listen(PORT, HOST)
    .then(({ url }) => console.log(`Listening at ${url}`));
}

main();
