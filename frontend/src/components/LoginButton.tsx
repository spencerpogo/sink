import { Button, Icon, Spinner, Text } from "@chakra-ui/react";
import { useEffect, useState } from "react";
import { GoMarkGithub } from "react-icons/go";
import { useGenGitHubLoginUrlLazyQuery } from "../generated/graphql";

export function LoginButton() {
  const [didQuery, setDidQuery] = useState(false);
  const [getLoginURL, { loading, data, error }] =
    useGenGitHubLoginUrlLazyQuery();

  // SSR: Check for window object before querying
  useEffect(() => {
    console.log(didQuery, typeof window);
    if (!didQuery && typeof window === "object") {
      setDidQuery(true);
      getLoginURL({
        variables: { redirectUri: window.location.origin + "/githubCallback" },
      });
    }
  }, [didQuery, getLoginURL]);

  return error ? (
    <Text>Oops, an error occurred: {String(error)}</Text>
  ) : (
    <Button
      //isDisabled={LOADING}
      size="lg"
      leftIcon={
        didQuery && !loading ? (
          <Icon as={GoMarkGithub} w={8} h={8} />
        ) : (
          <Spinner mr="0.5rem" /> // margin prevent width changes
        )
      }
      onClick={() => {
        if (data) {
          window.location.href = data.genGitHubLoginURL;
        }
      }}
    >
      Continue with GitHub
    </Button>
  );
}

export default LoginButton;
