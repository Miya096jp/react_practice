import { useState } from "react";
import { useLocalStorage } from "./use_local_storage.jsx";
import { v4 as uuid } from "uuid";
import { List } from "./List.jsx";
import { Add } from "./Add.jsx";
import { Edit } from "./Edit.jsx";
import "./App.css";

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

  const ids_titles = getIdsTitles();

  function getIdsTitles() {
    return notes.map((data) => {
      const ary = data.content.split("\n");
      const title = ary.shift();
      return { id: data.id, title: title };
    });
  }

  function handleAddNote() {
    setNotes([...notes, { id: uuid(), content: draft }]);
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

  function handleDeleteNote(id) {
    const nextUpdate = notes.filter((note) => note.id !== id);
    setNotes(nextUpdate);
  }

  function handleSelectNote(id) {
    setSelectedId(id);
    setStatus("edit");
    const item = notes.find((note) => note.id === id);
    item ? setDraft(item.content) : setDraft(null);
  }

  return (
    <div class="container">
      <List
        ids_titles={ids_titles}
        onSelect={handleSelectNote}
        setStatus={setStatus}
      />

      {status === "edit" ? (
        <Edit
          status={status}
          setStatus={setStatus}
          selectedId={selectedId}
          draft={draft}
          setDraft={setDraft}
          onUpdate={handleUpdateNote}
          onDelete={handleDeleteNote}
        />
      ) : status === "add" ? (
        <Add
          status={status}
          setStatus={setStatus}
          selectedId={selectedId}
          setDraft={setDraft}
          onAdd={handleAddNote}
        />
      ) : null}
    </div>
  );
}
