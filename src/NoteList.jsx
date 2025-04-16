import { useAuth } from "./useAuth.jsx";

export function NoteList({ noteList, onSelect, setStatus }) {
  const { isLoggedIn } = useAuth();

  return (
    <div class="list">
      <ul>
        {noteList.map((note) => (
          <li
            key={note.id}
            onClick={() => {
              onSelect(note.id);
            }}
          >
            {note.title}
          </li>
        ))}
      </ul>
      {isLoggedIn && (
        <button
          onClick={() => {
            setStatus("add");
          }}
        >
          +
        </button>
      )}
    </div>
  );
}
