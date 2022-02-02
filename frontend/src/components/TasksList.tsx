import { useMyEventsQuery } from "../generated/graphql";

function Task({ name }: { name: string }) {
  // TODO make this more detailed
  return (
    <div>
      <p>{name}</p>
    </div>
  );
}

export default function TasksList() {
  const { data, loading, error } = useMyEventsQuery({
    variables: { cursor: null },
  });

  if (loading) {
    return <p>Loading...</p>;
  }

  if (error) {
    return <p>Error: {error}</p>;
  }

  if (data.myEvents.length == 0) {
    return <p>No events... Why not create one?</p>;
  }

  return (
    <div>
      {data.myEvents.map((i) => (
        <Task key={i.id} name={i.name} />
      ))}
    </div>
  );
}
