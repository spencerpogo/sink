import { Button, Icon, Spinner } from "@chakra-ui/react";
import { useEffect } from "react";
import { GoSignOut } from "react-icons/go";
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
    <Button
      size="lg"
      leftIcon={
        loading ? (
          <Spinner mr="0.5rem" /> // margin prevents width changes
        ) : (
          <Icon as={GoSignOut} w={8} h={8} />
        )
      }
      onClick={() => logout()}
    >
      Logout
    </Button>
  );
}

export default LogoutButton;
