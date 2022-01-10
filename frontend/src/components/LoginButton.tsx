import { Button, Icon, Spinner, Text } from "@chakra-ui/react";
import { useEffect } from "react";
import { GoMarkGithub } from "react-icons/go";
import { useGenGitHubLoginUrlLazyQuery } from "../generated/graphql";

export function LoginButton() {
  const [getLoginURL, { loading, data, error }] =
    useGenGitHubLoginUrlLazyQuery();

  // SSR: Check for window object before querying
  useEffect(() => {
    if (typeof window === "object" && !error && !loading && !data) {
      getLoginURL({
        variables: { redirectUri: window.location.origin + "/githubCallback" },
      });
    }
  }, [getLoginURL, loading, data, error]);

  return error ? (
    <Text>Oops, an error occurred: {String(error)}</Text>
  ) : (
    <Button
      isDisabled={loading}
      size="lg"
      leftIcon={
        loading ? (
          <Spinner mr="0.5rem" /> // margin prevents width changes
        ) : (
          <Icon as={GoMarkGithub} w={8} h={8} />
        )
      }
      onClick={() => {
        if (data && data.genGitHubLoginURL) {
          // no need to use router as this is an external URL (github.com)
          window.location.href = data.genGitHubLoginURL;
        }
      }}
    >
      Continue with GitHub
    </Button>
  );
}

export default LoginButton;
