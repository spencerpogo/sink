import LoginButton from "./LoginButton";

export default function Landing() {
  return (
    <div className="h-full flex justify-center items-center">
      <div>
        <h1 className="text-3xl font-bold underline">Sink</h1>
        <LoginButton />
      </div>
    </div>
  );
}
