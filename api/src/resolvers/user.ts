import {
  Arg,
  Ctx,
  Field,
  Mutation,
  ObjectType,
  Query,
  Resolver,
  UseMiddleware,
} from "type-graphql";
import { getRepository } from "typeorm";
import { v4 as uuidv4 } from "uuid";
import { dateToTimestamp } from "../dates.js";
import {
  genGithubLoginURL,
  getGitHubInfo,
  LoginError,
  tokenFromCode,
} from "../githubAuth.js";
import { isAuthed, mustAuth } from "../middleware/isAuth.js";
import { Event, EventType, toEventType } from "../models/Event.js";
import { User } from "../models/User";
import { MyContext } from "../types";

@ObjectType()
class LoginResponse {
  @Field(() => String, { nullable: true })
  error?: string;

  @Field(() => User, { nullable: true })
  user?: User;
}

@Resolver()
export class UserResolver {
  @Query(() => String)
  genGitHubLoginURL(
    @Ctx() { req }: MyContext,
    @Arg("redirectUri") redirectUri: string
  ) {
    const state = uuidv4();
    req.session.authState = state;
    return genGithubLoginURL(redirectUri, state);
  }

  @Mutation(() => LoginResponse)
  async githubLogin(
    @Ctx() { req }: MyContext,
    @Arg("code") code: string,
    @Arg("state") state: string
  ): Promise<LoginResponse> {
    if (!code || !state) {
      return { error: "Missing paramaters" };
    }

    if (req.session.authState != state) {
      return { error: "State does not match" };
    }
    // Prevent duplicate login attempts
    delete req.session.authState;

    let name, githubId;
    try {
      const { token } = await tokenFromCode(code);
      const { name: cName, githubId: cId } = await getGitHubInfo(token);
      name = cName;
      githubId = cId;
    } catch (e) {
      if (e instanceof LoginError) {
        return { error: e.message };
      }
      throw e;
    }

    const existingUser = await User.findOne({ githubId });
    if (existingUser) {
      // log them in
      req.session.userId = existingUser.id;
      return { user: existingUser };
    }

    // register new user
    const newUser = User.create({ name, githubId });
    await newUser.save();
    req.session.userId = newUser.id;
    return { user: newUser };
  }

  @Mutation(() => Boolean)
  async logout(@Ctx() ctx: MyContext): Promise<boolean> {
    delete ctx.req.session.authState;
    delete ctx.req.session.userId;
    return true;
  }

  @Mutation(() => User)
  async createUser(
    @Ctx() ctx: MyContext,
    @Arg("name") name: string
  ): Promise<User> {
    const u = User.create({ name, githubId: 0 });
    await u.save();
    ctx.req.session.userId = u.id;
    return u;
  }

  @Query(() => User, { nullable: true })
  async me(@Ctx() ctx: MyContext): Promise<User | undefined> {
    if (!isAuthed(ctx)) return undefined;
    return User.findOne(ctx.req.session.userId);
  }

  @Query(() => [EventType])
  @UseMiddleware(mustAuth)
  async myEvents(
    @Ctx() ctx: MyContext,
    @Arg("limit") limit: number,
    @Arg("cursor", { nullable: true }) cursor: Date
  ): Promise<EventType[]> {
    // todo: support multiple directions
    const qb = getRepository(Event)
      .createQueryBuilder("e")
      .where("e.userId = :userId", { userId: ctx.req.session.userId })
      .orderBy("start", "DESC")
      .take(Math.min(limit, 50));

    if (cursor) {
      const cursorTs = dateToTimestamp(cursor);
      console.log({ cursor, cursorTs, nan: isNaN(cursorTs) });
      if (!isNaN(cursorTs)) qb.where("e.start > :cursor", { cursor: cursorTs });
    }

    return (await qb.getMany()).map((e) => toEventType(e));
  }
}
