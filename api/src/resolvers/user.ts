import { Query, Resolver } from "type-graphql";
import { GITHUB_CLIENT_ID } from "../config";

@Resolver()
export class UserResolver {
  @Query(() => String)
  gitHubClientId() {
    return GITHUB_CLIENT_ID;
  }
}
