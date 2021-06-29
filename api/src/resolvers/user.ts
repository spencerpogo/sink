import * as querystring from "querystring";
import { Arg, Ctx, Query, Resolver } from "type-graphql";
import { v4 as uuidv4 } from "uuid";
import { GITHUB_CLIENT_ID } from "../config";
import { MyContext } from "../types";

const GITHUB_URL = "https://github.com";

@Resolver()
export class UserResolver {
  @Query(() => String)
  genGitHubLoginURL(
    @Ctx() ctx: MyContext,
    @Arg("redirectUri") redirectUri: string
  ) {
    const state = uuidv4();
    ctx.req.session.authState = state;
    return (
      `${GITHUB_URL}/login/oauth/authorize?` +
      querystring.stringify({
        client_id: GITHUB_CLIENT_ID,
        redirect_uri: redirectUri,
        scope: "", // no scope gives access to public information
        state,
      })
    );
  }
}
