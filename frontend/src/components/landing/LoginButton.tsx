import { useEffect } from "react";
import { GoMarkGithub } from "react-icons/go";
import { useGenGitHubLoginUrlLazyQuery } from "../../generated/graphql";

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
      className={
        "text-white bg-blue-700 hover:bg-blue-800 rounded-lg px-5 py-2.5" +
        " text-center inline-flex items-center"
      }
      disabled={loading}
      onClick={() => {
        if (data && data.genGitHubLoginURL) {
          // no need to use router as this is an external URL (github.com)
          window.location.href = data.genGitHubLoginURL;
        }
      }}
    >
      <GoMarkGithub className="mr-2 w-8 h-8" />
      Continue with GitHub
    </button>
  );
}

export default LoginButton;
