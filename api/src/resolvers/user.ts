import fetch, { Response } from "node-fetch";
import * as querystring from "querystring";
import {
  Arg,
  Ctx,
  Field,
  Mutation,
  ObjectType,
  Query,
  Resolver,
} from "type-graphql";
import { v4 as uuidv4 } from "uuid";
import { version as serverVersion } from "../../package.json";
import { GITHUB_CLIENT_ID, GITHUB_CLIENT_SECRET } from "../config";
import { User } from "../models/User";
import { MyContext } from "../types";

const GITHUB_URL = "https://github.com";
const GITHUB_API_URL = "https://api.github.com";

const ACCEPT_JSON = { Accept: "application/json" };
const UA = {
  "User-Agent": `sink/${serverVersion} https://github.com/Scoder12/sink`,
};

@ObjectType()
class LoginResponse {
  @Field(() => String, { nullable: true })
  error?: string;

  @Field(() => User, { nullable: true })
  user?: User;
}

class LoginError extends Error {}

async function validateResponse(
  r: Response,
  remote: string,
  method: string
): Promise<void> {
  if (r.status != 200) {
    const error = `Got status ${r.status} ${r.statusText} from ${remote} during ${method}`;
    let text = "";
    try {
      text = await r.text();
    } catch (e) {
      text = e;
    }
    console.error({ error, text });
    throw new LoginError(error);
  }
}

async function tokenFromCode(githubCode: string): Promise<{ token: string }> {
  const r = await fetch(GITHUB_URL + "/login/oauth/access_token", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      ...ACCEPT_JSON,
      ...UA,
    },
    body: JSON.stringify({
      client_id: GITHUB_CLIENT_ID,
      client_secret: GITHUB_CLIENT_SECRET,
      code: githubCode,
    }),
  });

  await validateResponse(r, "GitHub", "login");

  const data = await r.json();
  if (typeof data !== "object" || !data.access_token) {
    const error = "Unexpected response from GitHub";
    console.error({ error, data });
    throw new LoginError(error);
  }
  return { token: data.access_token };
}

async function getGitHubInfo(
  token: string
): Promise<{ name: string; githubId: number }> {
  const r = await fetch(GITHUB_API_URL + "/user", {
    headers: { Authorization: `token ${token}`, ...ACCEPT_JSON, ...UA },
  });
  await validateResponse(r, "GitHub", "fetch user info");
  const { login, id } = await r.json();
  if (!login || !id)
    throw new LoginError("Received invalid user data from GitHub");
  return { name: login, githubId: id };
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
}
