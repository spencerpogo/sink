import { Button, Icon, Spinner } from "@chakra-ui/react";
import { useRouter } from "next/dist/client/router";
import { useEffect } from "react";
import { GoSignOut } from "react-icons/go";
import { useLogoutMutation } from "../generated/graphql";

export function LogoutButton() {
  const [logout, { data, loading }] = useLogoutMutation();
  const router = useRouter();

  // no need to handle errors -> they'll just be a no-op
  useEffect(() => {
    if (!loading && data?.logout) {
      router.push("/");
    }
  }, [loading, data, router]);

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
