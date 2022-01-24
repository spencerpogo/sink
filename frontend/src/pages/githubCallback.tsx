import { useRouter } from "next/dist/client/router";
import { useEffect, useState } from "react";
import { useGitHubLoginMutation } from "../generated/graphql";

function Error({ children }) {
  return <p>Something went wrong while logging you in: {children}</p>;
}

function CallbackHandler() {
  const {
    query: { code, state },
  } = useRouter();
  const [didCall, setDidCall] = useState(false);
  const [githubLogin, { data, loading, error }] = useGitHubLoginMutation();

  useEffect(() => {
    if (
      !didCall &&
      !loading &&
      typeof code === "string" &&
      typeof state === "string"
    ) {
      githubLogin({ variables: { code, state } });
      setDidCall(true);
    }
  }, [didCall, loading, code, state, githubLogin]);

  useEffect(() => {
    if (data && data.githubLogin.user) {
      window.location.href = "/";
    }
  }, [data]);

  if (error) {
    return <Error>{String(error.message)}</Error>;
  }

  if (data && data.githubLogin.error) {
    return <Error>{String(data.githubLogin.error)}</Error>;
  }

  return <p>Loading...</p>;
}

export default CallbackHandler;
