import { useLogin } from "./LoginContext.js";

export function AddNoteForm({ setStatus, setDraft, onAdd }) {
  const IsLoggedIn = useLogin();

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
          {IsLoggedIn && (
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
