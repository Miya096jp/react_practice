export function NoteList({ noteList, onSelect, setStatus }) {
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
        <li
          onClick={() => {
            setStatus("add");
          }}
        >
          +
        </li>
      </ul>
    </div>
  );
}
