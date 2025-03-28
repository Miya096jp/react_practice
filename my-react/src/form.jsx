import { useRef, useEffect } from "react";

export function Form({
  status,
  setStatus,
  selectedId,
  draft,
  setDraft,
  onAdd,
  onUpdate,
  onDelete,
}) {
  const inputRef = useRef(null);

  useEffect(() => {
    if (status === "add" || status === "edit") {
      inputRef.current.focus();
    }
  }, [selectedId, status]);

  return (
    <>
      {status === "edit" && (
        <div class="edit">
          <form
            onSubmit={(e) => {
              e.preventDefault();
              setStatus("list");
              onUpdate();
            }}
          >
            <textarea
              key={selectedId}
              value={draft}
              onChange={(e) => {
                setDraft(e.target.value);
              }}
              ref={inputRef}
            />
            <div class="update-delete">
              <button type="submit">更新</button>
              <button
                type="button"
                onClick={() => {
                  setStatus("list");
                  onDelete();
                }}
              >
                削除
              </button>
            </div>
          </form>
        </div>
      )}

      {status === "add" && (
        <div class="add">
          <form
            onSubmit={(e) => {
              e.preventDefault();
              setStatus("list");
              onAdd();
              setDraft("");
            }}
          >
            <textarea
              placeholder={"enter"}
              onChange={(e) => {
                setDraft(e.target.value);
              }}
              ref={inputRef}
            />
            <button type="submit">新規登録</button>
          </form>
        </div>
      )}
    </>
  );
}
