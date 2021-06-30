import { AppProps } from "next/dist/next-server/lib/router/router";
import { Chakra } from "../chakra";

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <Chakra cookies={pageProps.cookies}>
      <Component {...pageProps} />
    </Chakra>
  );
}

export default MyApp;
export { getServerSideProps } from "../chakra";
