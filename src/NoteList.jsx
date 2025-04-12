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
        {login && (
          <li
            onClick={() => {
              setStatus("add");
            }}
          >
            +
          </li>
        )}
      </ul>
    </div>
  );
}
