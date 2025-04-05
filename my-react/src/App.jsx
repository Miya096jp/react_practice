import { useState, useEffect, useRef } from "react";
import { useLocalStorage } from "./use_local_storage.jsx";
import { List } from "./list.jsx";
import { Add } from "./Add.jsx";
import { Edit } from "./Edit.jsx";
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

  const ids_titles = getIdsTitles();

  function getIdsTitles() {
    return notes.map((data) => {
      const ary = data.content.split("\n");
      const title = ary.shift();
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

  function handleSelectNote(id_title) {
    setSelectedId(id_title.id);
    setStatus("edit");
  }

  useEffect(() => {
    if (status === "add" || status === "edit") {
      inputRef.current.focus();
    }
  }, [selectedId, status]);

  return (
    <div class="container">
      <List ids_titles={ids_titles} onSelect={handleSelectNote} setStatus={setStatus} />

   {status === "edit" ? (
      <Edit
        status={status}
        setStatus={setStatus}
        selectedId={selectedId}
        draft={draft}
        setDraft={setDraft}
        onUpdate={handleUpdateNote}
        onDelete={handleDeleteNote}
        ref={inputRef}
      />
    ) : status === "add" ? (
      <Add
        status={status}
        setStatus={setStatus}
        selectedId={selectedId}
        setDraft={setDraft}
        onAdd={handleAddNote}
        ref={inputRef}
      />
    ): null}
    </div>
  );
}
