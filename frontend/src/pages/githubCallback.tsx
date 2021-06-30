import { Text } from "@chakra-ui/react";
import { useRouter } from "next/dist/client/router";
import { useEffect, useState } from "react";

function CallbackHandler() {
  const [didLogin, setDidLogin] = useState(false);
  const router = useRouter();

  const { code, state } = router.query;
  const paramsValid = Boolean(code) && Boolean(state);

  useEffect(() => {
    if (!didLogin && paramsValid) {
      setDidLogin(true);
      // TODO: Run login mutation
    }
  }, [didLogin, paramsValid]);

  if (!paramsValid) {
    return (
      <Text>
        Something went wrong while logging you in: Missing code/state query
        paramaters
      </Text>
    );
  }

  return <Text>Loading...</Text>;
}

export default CallbackHandler;
