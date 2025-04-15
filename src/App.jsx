import { useState, useContext } from "react";
import { useLocalStorage } from "../hooks/useLocalStorage.jsx";
import { NoteList } from "./NoteList.jsx";
import { AddNoteForm } from "./AddNoteForm.jsx";
import { EditNoteForm } from "./EditNoteForm.jsx";
import { LoginContext } from "./LoginContext.js";
import "./App.css";

const initialData = [
  { id: 0, content: "松尾芭蕉\n古池や蛙飛び込む水の音" },
  { id: 1, content: "小林一茶\n痩せガエル負けるな一茶ここにあり" },
  { id: 2, content: "作者不詳\n富士山麓に鸚鵡鳴く" },
];

export default function App() {
  const [draft, setDraft] = useState("");
  const [selectedId, setSelectedId] = useState(null);
  const [status, setStatus] = useState("list");
  const [notes, setNotes] = useLocalStorage(initialData);
  const [login, setLogin] = useContext(LoginContext);

  const noteList = getNoteList();

  function getNoteList() {
    return notes.map((data) => {
      const array = data.content.split("\n");
      const title = array.shift();
      return { id: data.id, title: title };
    });
  }

  function handleAddNote() {
    setNotes([...notes, { id: window.crypto.randomUUID(), content: draft }]);
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
      <div class="header">
        <button onClick={() => setLogin(!login)}>
          {login ? "ログアウト" : "ログイン"}
        </button>
      </div>
      <div class="main">
        <NoteList
          noteList={noteList}
          onSelect={handleSelectNote}
          setStatus={setStatus}
        />
        {status === "edit" ? (
          <EditNoteForm
            status={status}
            setStatus={setStatus}
            selectedId={selectedId}
            draft={draft}
            setDraft={setDraft}
            onUpdate={handleUpdateNote}
            onDelete={handleDeleteNote}
          />
        ) : status === "add" ? (
          <AddNoteForm
            status={status}
            setStatus={setStatus}
            selectedId={selectedId}
            setDraft={setDraft}
            onAdd={handleAddNote}
          />
        ) : null}
      </div>
    </div>
  );
}
