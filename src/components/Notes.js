//Type raf
import React, { useContext, useEffect } from "react";
import noteContext from "../context/notes/NoteContext";
import Noteitem from "./Noteitem";
import AddNote from "./AddNote";

const Notes = () => {
  const context = useContext(noteContext);
  const { notes, getNotes } = context;
  useEffect(() => {
    getNotes();
  }, []);

  return (
    <>
      <AddNote />
      <div className="row my-3">
        <h2>Your Notes</h2>
        {Array.isArray(notes) && notes.length > 0 ? (
          notes.map((note) => <Noteitem key={note._id} note={note} />)
        ) : (
          <p>No notes available</p>
        )}
      </div>
    </>
  );
};

export default Notes;
