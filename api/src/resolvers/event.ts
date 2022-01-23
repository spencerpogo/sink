import { Arg, Ctx, Mutation, Resolver, UseMiddleware } from "type-graphql";
import { dateToTimestamp } from "../dates.js";
import { mustAuth } from "../middleware/isAuth.js";
import { Event, EventType, toEventType } from "../models/Event";
import { MyContext } from "../types.js";

@Resolver()
export class EventResolver {
  @Mutation(() => EventType)
  @UseMiddleware(mustAuth)
  async createEvent(
    @Ctx() ctx: MyContext,
    @Arg("name") name: string,
    @Arg("start") start: Date
  ): Promise<EventType> {
    const e = Event.create({
      user: { id: ctx.req.session.userId },
      name,
      start: dateToTimestamp(start),
    });
    await e.save();
    return toEventType(e);
  }
}
