import { GoPlay } from "react-icons/go";
import { useCreateEventMutation } from "../../generated/graphql";

export default function CreateTask() {
  const [createEvent, { loading, error }] = useCreateEventMutation();

  return (
    <form
      onSubmit={(e) => {
        e.preventDefault();
        createEvent();
      }}
    >
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
