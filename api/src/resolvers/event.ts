import {
  Arg,
  Ctx,
  Mutation,
  Query,
  Resolver,
  UseMiddleware,
} from "type-graphql";
import { getRepository } from "typeorm";
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

  @Query(() => [EventType])
  @UseMiddleware(mustAuth)
  async myEvents(
    @Ctx() ctx: MyContext,
    @Arg("limit") limit: number,
    @Arg("cursor", { nullable: true }) cursor: Date
  ): Promise<EventType[]> {
    // Sorts from newest to oldest
    // todo: support multiple directions
    const qb = getRepository(Event)
      .createQueryBuilder("e")
      .where("e.userId = :userId", { userId: ctx.req.session.userId })
      .orderBy("start", "DESC")
      .take(Math.min(limit, 50));

    if (cursor) {
      const cursorTs = dateToTimestamp(cursor);
      if (!isNaN(cursorTs)) qb.where("e.start < :cursor", { cursor: cursorTs });
    }

    return (await qb.getMany()).map((e) => toEventType(e));
  }
}
