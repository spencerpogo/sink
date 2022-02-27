import { GoPlay } from "react-icons/go";

export default function CreateTask() {
  return (
    <form onSubmit={(e) => e.preventDefault()}>
      <div className="flex">
        <input
          type="text"
          placeholder="What are you working on?"
          className="grow p-1 mr-1"
        />
        <button type="submit" className="p-0.5">
          <GoPlay role="img" aria-label="Start Timer" className="w-8 h-8" />
        </button>
      </div>
    </form>
  );
}
