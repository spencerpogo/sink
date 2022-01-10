import { ApolloServer } from "apollo-server-express";
import connectRedis from "connect-redis";
import express from "express";
import session from "express-session";
import IORedis from "ioredis";
import path from "path";
import "reflect-metadata";
import { buildSchema } from "type-graphql";
import { createConnection } from "typeorm";
import { CONFIG } from "./config.js";
import { Event } from "./models/Event.js";
import { User } from "./models/User";
import { EventResolver } from "./resolvers/event.js";
import { HelloResolver } from "./resolvers/hello";
import { UserResolver } from "./resolvers/user";

const RedisStore = connectRedis(session);

async function main() {
  const app = express();

  const conn = await createConnection({
    type: "better-sqlite3",
    database: CONFIG.DATABASE_FILENAME,
    logging: true,
    synchronize: false,
    migrations: [path.join(__dirname, "migrations", "*")],
    entities: [User, Event],
  });
  await conn.runMigrations();

  const redis = new IORedis({
    host: CONFIG.REDIS_HOST,
    port: Number(CONFIG.REDIS_PORT),
    password: CONFIG.REDIS_PASSWORD,
  });
  app.use(
    session({
      store: new RedisStore({ client: redis }),
      saveUninitialized: false,
      secret: CONFIG.SESSION_SECRET,
      resave: false, // redis supports touch
      cookie: {
        maxAge: 1000 * 60 * 60 * 24 * 30, // 30 days
      },
    })
  );

  const schema = await buildSchema({
    resolvers: [HelloResolver, UserResolver, EventResolver],
  });
  const server = new ApolloServer({
    schema,
    context: ({ req }) => ({
      req,
    }),
  });
  server.applyMiddleware({ app });

  app.listen({ host: CONFIG.HOST, port: CONFIG.PORT }, () =>
    console.log(
      `Listening on http://${CONFIG.HOST}:${CONFIG.PORT}${server.graphqlPath}`
    )
  );
}

main();
