import * as env from "env-var";

export const HOST: string = env.get("HOST").default("127.0.0.1").asString();
export const PORT: number = env.get("PORT").default(8080).asPortNumber();
export const DATABASE_URL: string = env
  .get("DATABASE_URL")
  .required()
  .asUrlString();
export const GITHUB_CLIENT_ID: string = env
  .get("GITHUB_CLIENT_ID")
  .required()
  .asString();
export const GITHUB_CLIENT_SECRET: string = env
  .get("GITHUB_CLIENT_SECRET")
  .required()
  .asString();
