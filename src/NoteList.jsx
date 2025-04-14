import { useLogin } from "./LoginContext.jsx";

export function NoteList({ noteList, onSelect, setStatus }) {
  const login = useLogin();

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
        {login && (
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
