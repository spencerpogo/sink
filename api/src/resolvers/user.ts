import * as querystring from "querystring";
import { Arg, Query, Resolver } from "type-graphql";
import { GITHUB_CLIENT_ID } from "../config";

const GITHUB_URL = "https://github.com";

@Resolver()
export class UserResolver {
  @Query(() => String)
  genGitHubLoginURL(@Arg("redirectUri") redirectUri: string) {
    return (
      `${GITHUB_URL}/login/oauth/authorize?` +
      querystring.stringify({
        client_id: GITHUB_CLIENT_ID,
        redirect_uri: redirectUri,
        scope: "", // no scope gives access to public information
        state: "TODO", // TODO: generate uuid and store it in session
      })
    );
  }
}
