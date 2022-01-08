import fetch, { Response } from "node-fetch";
import { stringify as querystringify } from "querystring";
import { version as serverVersion } from "../package.json";
import { CONFIG } from "./config.js";

const GITHUB_URL = "https://github.com";
const GITHUB_API_URL = "https://api.github.com";

const ACCEPT_JSON = { Accept: "application/json" };
const UA = {
  "User-Agent": `sink/${serverVersion} https://github.com/Scoder12/sink`,
};

export class LoginError extends Error {}

export async function validateResponse(
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

export async function tokenFromCode(
  githubCode: string
): Promise<{ token: string }> {
  const r = await fetch(GITHUB_URL + "/login/oauth/access_token", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      ...ACCEPT_JSON,
      ...UA,
    },
    body: JSON.stringify({
      client_id: CONFIG.GITHUB_CLIENT_ID,
      client_secret: CONFIG.GITHUB_CLIENT_SECRET,
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

export async function getGitHubInfo(
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

export function genGithubLoginURL(redirectUri: string, state: string) {
  return (
    `${GITHUB_URL}/login/oauth/authorize?` +
    querystringify({
      client_id: CONFIG.GITHUB_CLIENT_ID,
      redirect_uri: redirectUri,
      scope: "", // no scope gives access to public information
      state,
    })
  );
}
