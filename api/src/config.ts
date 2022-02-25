import { z } from "zod";

const PORT_REGEX = /^[0-9]+$/;
const schema = z.object({
  HOST: z.string(),
  PORT: z.string().regex(PORT_REGEX),
  FRONTEND_URL: z.string().url(),
  SESSION_SECRET: z.string(),
  DATABASE_FILENAME: z.string(),
  REDIS_HOST: z.string(),
  REDIS_PORT: z.string().regex(PORT_REGEX),
  REDIS_PASSWORD: z.string().optional(),
  GITHUB_CLIENT_ID: z.string(),
  GITHUB_CLIENT_SECRET: z.string(),
});
export const CONFIG = schema.parse(process.env);
