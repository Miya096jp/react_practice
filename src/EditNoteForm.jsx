import { useContext } from "react";
import { LoginContext } from "./LoginContext.js";

export function EditNoteForm({
  setStatus,
  selectedId,
  draft,
  setDraft,
  onUpdate,
  onDelete,
}) {
  const [isLoggedIn, setLogin] = useContext(LoginContext);

  return (
    <>
      <div class="edit">
        <form
          onSubmit={(e) => {
            e.preventDefault();
            setStatus("list");
            onUpdate();
          }}
        >
          <textarea
            autoFocus
            key={selectedId}
            value={draft}
            onChange={(e) => {
              setDraft(e.target.value);
            }}
          />
          {isLoggedIn && (
            <div class="update-delete">
              <button type="submit">更新</button>
              <button
                type="button"
                onClick={() => {
                  setStatus("list");
                  onDelete(selectedId);
                }}
              >
                削除
              </button>
            </div>
          )}
        </form>
      </div>
    </>
  );
}
