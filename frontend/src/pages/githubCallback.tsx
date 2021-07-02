import { Text } from "@chakra-ui/react";
import { useRouter } from "next/dist/client/router";
import { useGitHubLoginMutation } from "../generated/graphql";

function Error({ children }) {
  return <Text>Something went wrong while logging you in: {children}</Text>;
}

function CallbackHandler() {
  const [githubLogin, { data, loading, error }] = useGitHubLoginMutation();
  const router = useRouter();
  const { code, state } = router.query;

  if (error) {
    return <Error>{String(error.message)}</Error>;
  }

  if (data && data.githubLogin.error) {
    return <Error>{String(data.githubLogin.error)}</Error>;
  }

  if (data && data.githubLogin.user) {
    return <Text>Hi {String(data.githubLogin.user.name)}</Text>;
  }

  if ((!loading && typeof code === "string") || typeof state === "string") {
    console.log("calling");
    githubLogin({
      variables: { code: code as string, state: state as string },
    });
  }

  return <Text>Loading...</Text>;
}

export default CallbackHandler;
