import { ApolloServer } from "apollo-server-express";
import express from "express";
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

  const app = express();
  server.applyMiddleware({ app });

  app.listen({ host: HOST, port: PORT }, () =>
    console.log(`Listening on http://${HOST}:${PORT}${server.graphqlPath}`)
  );
}

main();
