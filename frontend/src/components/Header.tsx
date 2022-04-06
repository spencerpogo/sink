import LogoutButton from "./LogoutButton";

export default function Header({ name }: { name: string }) {
  return (
    <nav className="nav rounded py-2.5 px-2 mb-2">
      <div className="flex justify-between items-center">
        <div>
          {/* TODO: logo? */}
          <h2 className="text-2xl">Sink</h2>
        </div>
        <div>
          {/* TODO: This should be a link to accounts page */}
          <span className="text-bold mr-2">{name}</span>
          <LogoutButton />
        </div>
      </div>
    </nav>
  );
}
