import { useState, useRef, useEffect } from "react";
import { useLocalStorage } from "./use_local_storage.jsx";
import "./App.css";

let nextId = 3;
const initial_data = [
  { id: 0, content: "松尾芭蕉\n古池や蛙飛び込む水の音" },
  { id: 1, content: "小林一茶\n痩せガエル負けるな一茶ここにあり" },
  { id: 2, content: "作者不詳\n富士山麓に鸚鵡鳴く" },
];

export default function App() {
  const [draft, setDraft] = useState("");
  const [selectedId, setSelectedId] = useState(null);
  const [status, setStatus] = useState("list");
  const [notes, setNotes] = useLocalStorage(initial_data);
  const inputRef = useRef(null);

  useEffect(() => {
    const item = notes.find((note) => note.id === selectedId);
    item ? setDraft(item.content) : setDraft(null);
  }, [notes, selectedId]);

  const titles = getTitles();

  function getTitles() {
    return notes.map((data) => {
      let ary = data.content.split("\n");
      let title = ary.shift();
      return { id: data.id, title: title };
    });
  }

  function handleAddNote() {
    setNotes([...notes, { id: nextId++, content: draft }]);
  }

  function handleUpdateNote() {
    const nextUpdate = notes.map((note) => {
      if (note.id === selectedId) {
        return { id: note.id, content: draft };
      } else {
        return note;
      }
    });
    setNotes(nextUpdate);
  }

  function handleDeleteNote() {
    const nextUpdate = notes.filter((note) => note.id !== selectedId);
    setNotes(nextUpdate);
  }

  useEffect(() => {
    if (status === "add" || status === "edit") {
      inputRef.current.focus();
    }
  }, [selectedId, status]);

  return (
    <div class="container">
      <div class="list">
        <ul>
          {titles.map((title) => (
            <li
              class="yubi"
              key={title.id}
              onClick={() => {
                setSelectedId(title.id);
                setStatus("edit");
              }}
            >
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

      {status === "edit" && (
        <div class="edit">
          <form
            onSubmit={(e) => {
              e.preventDefault();
              setStatus("list");
              handleUpdateNote();
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
                  handleDeleteNote();
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
              handleAddNote();
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
    </div>
  );
}
