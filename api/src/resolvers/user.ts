import { Arg, Mutation, Query, Resolver } from "type-graphql";
import { User } from "../models/User";

@Resolver()
export class UserResolver {
  @Mutation(() => User)
  async debugRegister(
    @Arg("githubId") githubId: number,
    @Arg("name") name: string
  ) {
    const user = User.create({ githubId, name });
    await user.save();
    return user;
  }

  @Query(() => [User])
  async debugList() {
    return await User.find({});
  }
}
