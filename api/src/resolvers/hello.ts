import { Arg, Query, Resolver } from "type-graphql";
import { Hello } from "../models/Hello";

@Resolver()
export class HelloResolver {
  @Query(() => Hello)
  greet(@Arg("name") name: string) {
    return { message: `Hello, ${name}!` };
  }
}
