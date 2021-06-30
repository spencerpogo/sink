import { Button, Icon } from "@chakra-ui/react";
import { GoMarkGithub } from "react-icons/go";

export function LoginButton() {
  return (
    <Button size="lg" leftIcon={<Icon as={GoMarkGithub} w={8} h={8} />}>
      Continue with GitHub
    </Button>
  );
}

export default LoginButton;
