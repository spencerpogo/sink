import Header from "./Header";

export default function Home({ name }: { name: string }) {
  return (
    <>
      <Header name={name} />
      <main className="ml-2">
        <h1 className="text-3xl">Your tasks</h1>
      </main>
    </>
  );
}
