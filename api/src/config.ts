import * as env from "env-var";

export const HOST: string = env.get("HOST").default("127.0.0.1").asString();
export const PORT: number = env.get("PORT").default(8080).asPortNumber();
export const SESSION_SECRET = env.get("SESSION_SECRET").required().asString();
export const DATABASE_URL: string = env
  .get("DATABASE_URL")
  .required()
  .asUrlString();
export const REDIS_HOST: string = env
  .get("REDIS_HOST")
  .default("127.0.0.1")
  .asString();
export const REDIS_PORT: number = env
  .get("REDIS_PORT")
  .default(6379)
  .asPortNumber();
export const GITHUB_CLIENT_ID: string = env
  .get("GITHUB_CLIENT_ID")
  .required()
  .asString();
export const GITHUB_CLIENT_SECRET: string = env
  .get("GITHUB_CLIENT_SECRET")
  .required()
  .asString();
