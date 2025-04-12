import { useState, useEffect } from "react";
import { useLocalStorage } from "./use_local_storage.jsx";
import { List } from "./list.jsx";
import { Form } from "./form.jsx";
import { UserLogin } from "./UserLogin.jsx";
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
  const [login, setLogin] = useState(false);

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

  function handleSelectNote(title) {
    setSelectedId(title.id);
    setStatus("edit");
  }

  return (
    <div class="container">
      <div class="header">
        <button onClick={() => setLogin(!login)}>
          {login ? "ログアウト" : "ログイン"}
        </button>
      </div>
      <UserLogin login={login}>
        <List
          titles={titles}
          onSelect={handleSelectNote}
          setStatus={setStatus}
        />
        <Form
          status={status}
          setStatus={setStatus}
          selectedId={selectedId}
          draft={draft}
          setDraft={setDraft}
          onAdd={handleAddNote}
          onUpdate={handleUpdateNote}
          onDelete={handleDeleteNote}
        />
      </UserLogin>
    </div>
  );
}
