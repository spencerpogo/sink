import { useEffect } from "react";
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
    <p>Oops, an error occurred: {String(error)}</p>
  ) : (
    <button
      className=""
      disabled={loading}
      onClick={() => {
        if (data && data.genGitHubLoginURL) {
          // no need to use router as this is an external URL (github.com)
          window.location.href = data.genGitHubLoginURL;
        }
      }}
    >
      Continue with GitHub
    </button>
  );
}

export default LoginButton;
