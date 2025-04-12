import { useLogin } from "./LoginContext.jsx";

export function List({ titles, onSelect, setStatus }) {
  const login = useLogin();

  return (
    <div class="list">
      <ul>
        {titles.map((title) => (
          <li class="yubi" key={title.id} onClick={() => onSelect(title)}>
            {title.title}
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
