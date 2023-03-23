import Note from "./components/Note";
import { useState } from "react";



const App = (props) => {
  const [notes, setNote] = useState(props.notes);
  const [newNotes, setNewNotes] = useState("");
  const [showAll, setShowAll] = useState(true);
  const notesToShow = showAll ? notes : notes.filter(note => note.important);

  const handelChange = (event) => {
    setNewNotes(event.target.value);
  }

  const addNote = (event) => {
    event.preventDefault();
    const newObject = {
      id: notes.length + 1,
      content: newNotes,
      important: Math.random() < 0.5,
    }
    setNote(notes.concat(newObject));
    setNewNotes('');
  }

  return (
    <div>
      <h1>Notes</h1>
      <button onClick={() => setShowAll(!showAll)}>
        show {showAll ? 'important' : 'all'}
      </button>
      <ul>
        {notesToShow.map(note =>
          <Note key={note.id} note={note} />
        )}
      </ul>
      <form onSubmit={addNote}>
        <input value={newNotes} onChange={handelChange} />
        <button type="submit">save</button>
      </form>
    </div>
  )
}

export default App
