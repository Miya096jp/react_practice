import { useLogin } from "./LoginContext.js";
import { LoginContext } from "./LoginContext.js";

export function NoteList({ noteList, onSelect, setStatus }) {
  const isLoggedIn = useLogin();

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
