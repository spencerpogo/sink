import * as env from "env-var";

export const HOST: string = env.get("HOST").default("127.0.0.1").asString();
export const PORT: number = env.get("PORT").default(8080).asPortNumber();
