export function Add({ setStatus, setDraft, onAdd, ref}) {

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
          <textarea
            placeholder={"enter"}
            onChange={(e) => {
              setDraft(e.target.value);
            }}
            ref={ref}
          />
          <button type="submit">新規登録</button>
        </form>
      </div>
    </>
  );
}
