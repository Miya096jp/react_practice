export function List({ ids_titles, onSelect, setStatus }) {
  return (
    <div class="list">
      <ul>
        {ids_titles.map((id_title) => (
          <li class="yubi" key={id_title.id} onClick={() => onSelect(id_title)}>
            {id_title.title}
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
