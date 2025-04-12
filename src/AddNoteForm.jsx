import { useLogin } from "./LoginContext.jsx";

export function AddNoteForm({ setStatus, setDraft, onAdd }) {
  const login = useLogin();

  return (
    <>
      <div class="add">
        <form
          onSubmit={(e) => {
            e.preventDefault();
            setStatus("list");
            onAdd();
            setDraft("");
          }}
        >
          {login && (
            <>
              <textarea
                autoFocus
                placeholder={"enter"}
                onChange={(e) => {
                  setDraft(e.target.value);
                }}
              />
              <button type="submit">新規登録</button>
            </>
          )}
        </form>
      </div>
    </>
  );
}
