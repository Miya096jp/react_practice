export function List({ titles, onSelect, setStatus }) {
  return (
    <div class="list">
      <ul>
        {titles.map((title) => (
          <li class="yubi" key={title.id} onClick={() => onSelect(title)}>
            {title.title}
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
