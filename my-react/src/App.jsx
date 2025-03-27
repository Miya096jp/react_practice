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
  const [selectedId, setSelectedId] = useState(0);
  const [status, setStatus] = useState("list");
  const [notes, setNotes] = useLocalStorage(initial_data);
  const inputRef = useRef(null);


  useEffect(() => {
    setDraft(notes.find((note) => note.id === selectedId).content);
  }, [notes, selectedId]);

  const titles = notes.map((data) => {
    let ary = data.content.split("\n");
    let title = ary.shift();
    return { id: data.id, title: title };
  });

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

  useEffect(() => {
    if (status === "add" || status === "edit")
    { inputRef.current.focus();}
  }, [selectedId, status]);

  return (
    <>
      <ul>
        {titles.map((title) => (
          <li
            key={title.id}
            onClick={() => {
              setSelectedId(title.id);
              setStatus("edit");
            }}
          >
            {title.title}
          </li>
        ))}
        <li onClick={() => {
          setStatus("add")
        }}>+</li>
      </ul>

      {status === "edit" && (
        <>
          <textarea
            key={selectedId}
            value={draft}
            onChange={(e) => {
              setDraft(e.target.value);
            }}
            ref={inputRef}
          />
          <button
            onClick={() => {
              setStatus("list");
              handleUpdateNote();
            }}
          >
            更新
          </button>
          <button
            onClick={() => {
              setStatus("list");
              setNotes(notes.filter((note) => note.id !== selectedId));
            }}
          >
            削除
          </button>
        </>
      )}

      {status === "add" && (
        <>
          <textarea
            placeholder={"enter"}
            onChange={(e) => {
              setDraft(e.target.value);
            }}
            ref={inputRef}
          />
          <button
            onClick={() => {
              setStatus("list");
              setNotes([...notes, { id: nextId++, content: draft }]);
              setDraft("");
            }}
          >
            新規登録
          </button>
        </>
      )}
    </>
  );
}
