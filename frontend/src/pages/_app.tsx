import { ApolloClient, ApolloProvider, InMemoryCache } from "@apollo/client";
import { AppProps } from "next/dist/next-server/lib/router/router";
import { Chakra } from "../chakra";

const client = new ApolloClient({
  uri: process.env.NEXT_PUBLIC_API_URL + "/graphql",
  cache: new InMemoryCache(),
});

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <ApolloProvider client={client}>
      <Chakra cookies={pageProps.cookies}>
        <Component {...pageProps} />
      </Chakra>
    </ApolloProvider>
  );
}

export default MyApp;
export { getServerSideProps } from "../chakra";
