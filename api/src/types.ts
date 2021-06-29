export type MyContext = {
  req: Express.Request;
};

declare module "express-session" {
  interface SessionData {
    authState?: string;
  }
}
