import { useLogin } from "./LoginContext.js";

export function EditNoteForm({
  setStatus,
  selectedId,
  draft,
  setDraft,
  onUpdate,
  onDelete,
}) {
  const login = useLogin();

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
          {login && (
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
