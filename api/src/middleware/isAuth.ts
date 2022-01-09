import { MiddlewareFn } from "type-graphql/dist/interfaces/Middleware";
import { MyContext } from "../types";

export const isAuthed = (context: MyContext) => !!context.req.session.userId;

export const mustAuth: MiddlewareFn<MyContext> = ({ context }, next) => {
  if (!isAuthed(context)) {
    throw new Error("Not authenticated");
  }

  return next();
};
