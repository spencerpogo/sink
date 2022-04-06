import { useEffect } from "react";
import { useLogoutMutation } from "../generated/graphql";

export function LogoutButton() {
  const [logout, { data, loading }] = useLogoutMutation();

  // no need to handle errors -> they'll just be a no-op
  useEffect(() => {
    if (!loading && data?.logout) {
      window.location.href = "/";
    }
  }, [loading, data]);

  return (
    <button className="underline" onClick={() => logout()}>
      Logout
    </button>
  );
}

export default LogoutButton;
