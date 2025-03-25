import { useState, useRef } from "react";
import "./App.css";

let nextId = 3;
const initial_data = [
  { id: 0, title: "松尾芭蕉", body: "古池や蛙飛び込む水の音" },
  { id: 1, title: "小林一茶", body: "痩せガエル負けるな一茶ここにあり" },
  { id: 2, title: "作者不詳", body: "富士山麓に鸚鵡鳴く" },
];

function App() {
  const [notes, setNotes] = useState(initial_data);
  const [draft, setDraft] = useState(""); 
  const [body, setBody] = useState(initial_body);
  const [selectedId, setSelectedId] = useState(0);
  const [showAdd, setShowAdd] = useState(false);
  const [showEdit, setShowEdit] = useState(false);
  const selectedNote = notes.find((note) => note.id === selectedId);
  const initial_body = selectedNote.body

  return (
    <>
      <h1>Note app</h1>
      <ul>
        {notes.map((note) => (
          <li
            key={note.id}
            onClick={() => {
              setSelectedId(note.id);
				      setShowEdit(true);
				      setShowAdd(false);
            }}
          >
            {note.title}
          </li>
        ))}
					{showAdd ? 
				   (
				   <>
            <textarea
				     placeholder={"enter"}
				     onChange={(e) => {
              setDraft(e.target.value)}}
				    />
				    <br/>
				    <button 
				     onClick={() => {
               const lines = draft.split("\n")
								const title = lines.shift();
								const body = lines.join();
				        setNotes([
								  ...notes,
								  {id: nextId++, title: title, body: body }
								])
								setDraft("");
								setShowAdd(!showAdd)}}
									 >
									 新規作成
									 </button>
				    </>
					 )
				:
				   (
            <li
				     onClick={() => {
										 setShowAdd(true);
										 setShowEdit(false);
						 }}
									 >+</li>
					 )
					}
      </ul>
      {showEdit &&
       (
       <>
        <textarea 
				  value={selectedNote.body}
				  onChange={(e) => {
				    setDraft(e.target.value);
					}}
        />
							 <br/>
        <button onClick={() => 

				  setShowEdit(!showEdit)}>更新</button>
        <button onClick={() => {
          setNotes(notes.filter(note => note.id !== selectedId));
          setShowEdit(!showEdit)}}>削除</button>
				<p>{draft}</p>
      </>
      )
     }
  </>
  );
}

export default App;
