import Head from "next/head";
import LoginButton from "./LoginButton";

export default function Landing() {
  return (
    <>
      <Head>
        <title>Sink</title>
      </Head>
      <div className="h-full flex justify-center items-center">
        <div>
          <h1 className="text-4xl font-bold">Sink</h1>
          <p>Work-in-progress time-tracking app</p>
          <LoginButton />
        </div>
      </div>
    </>
  );
}
