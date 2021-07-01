import { MiddlewareFn } from "type-graphql/dist/interfaces/Middleware";
import { MyContext } from "../types";

export const isAuth: MiddlewareFn<MyContext> = ({ context }, next) => {
  if (!context.req.session.userId) {
    throw new Error("Not authenticated");
  }

  return next();
};
