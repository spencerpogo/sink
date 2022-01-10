import { Arg, Ctx, Mutation, Resolver, UseMiddleware } from "type-graphql";
import { mustAuth } from "../middleware/isAuth.js";
import { Event } from "../models/Event";
import { MyContext } from "../types.js";

@Resolver()
export class EventResolver {
  @Mutation(() => Event)
  @UseMiddleware(mustAuth)
  async createEvent(
    @Ctx() ctx: MyContext,
    @Arg("name") name: string,
    @Arg("start") start: Date
  ): Promise<Event> {
    const e = Event.create({
      user: { id: ctx.req.session.userId },
      name,
      start,
    });
    await e.save();
    console.log({ e });
    return e;
  }
}
