export function Edit({
  setStatus,
  selectedId,
  draft,
  setDraft,
  onUpdate,
  onDelete,
  ref
}) {

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
            key={selectedId}
            value={draft}
            onChange={(e) => {
              setDraft(e.target.value);
            }}
            ref={ref}
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
    </>
  );
}
