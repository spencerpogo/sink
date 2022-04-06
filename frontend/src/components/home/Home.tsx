import Head from "next/head";
import Header from "../Header";
import CreateTask from "./CreateTask";
import TasksList from "./TasksList";

export default function Home({ name }: { name: string }) {
  return (
    <>
      <Head>
        <title>Sink</title>
      </Head>
      <Header name={name} />
      <main className="mx-5">
        <div className="my-3">
          <CreateTask />
        </div>
        <div>
          <h1 className="text-3xl">Your events</h1>
          <TasksList />
        </div>
      </main>
    </>
  );
}
