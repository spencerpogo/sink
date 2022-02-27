import Header from "../Header";
import CreateTask from "./CreateTask";
import TasksList from "./TasksList";

export default function Home({ name }: { name: string }) {
  return (
    <>
      <Header name={name} />
      <main className="ml-2">
        <div>
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
