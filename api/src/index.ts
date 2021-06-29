import { ApolloServer } from "apollo-server-express";
import connectRedis from "connect-redis";
import express from "express";
import session from "express-session";
import IORedis from "ioredis";
import path from "path";
import "reflect-metadata";
import { buildSchema } from "type-graphql";
import { createConnection } from "typeorm";
import {
  DATABASE_URL,
  HOST,
  PORT,
  REDIS_HOST,
  REDIS_PORT,
  SESSION_SECRET,
} from "./config";
import { User } from "./models/User";
import { HelloResolver } from "./resolvers/hello";
import { UserResolver } from "./resolvers/user";

const RedisStore = connectRedis(session);

async function main() {
  const app = express();

  const conn = await createConnection({
    type: "postgres",
    url: DATABASE_URL,
    logging: true,
    migrations: [path.join(__dirname, "migrations", "*")],
    entities: [User],
  });
  await conn.runMigrations();

  const redis = new IORedis({
    host: REDIS_HOST,
    port: REDIS_PORT,
  });
  app.use(
    session({
      store: new RedisStore({ client: redis }),
      saveUninitialized: false,
      secret: SESSION_SECRET,
      resave: false, // redis supports touch
      cookie: {
        maxAge: 1000 * 60 * 60 * 24 * 30, // 30 days
      },
    })
  );

  const schema = await buildSchema({
    resolvers: [HelloResolver, UserResolver],
  });
  const server = new ApolloServer({ schema });
  server.applyMiddleware({ app });

  app.listen({ host: HOST, port: PORT }, () =>
    console.log(`Listening on http://${HOST}:${PORT}${server.graphqlPath}`)
  );
}

main();
