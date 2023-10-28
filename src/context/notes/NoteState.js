import React, { useState } from "react";
import NoteContext from "./NoteContext";

const NoteState = (props) => {
  const host = "http://localhost:5000";
  const initialNotes = [];

  const [notes, setNotes] = useState(initialNotes);

  //Get all notes
  const getNotes = async () => {
    try {
      const response = await fetch(`${host}/api/notes/fetchallnotes`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          "auth-token":
            "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiNjUzNjFmNzdhM2YxOTNjM2RhYjJhMzZiIn0sImlhdCI6MTY5ODE1NDIxNn0.uTWvdkCS_5K9DLHOLXm8XJwGDJd7vvOF-XO_UK1t038",
        },
      });
      const json = await response.json();
      console.log(json);
      setNotes(json);
    } catch (error) {
      console.error("Error fetching notes:", error);
    }
  };

  //Add a note
  const addNote = async (title, description, tag) => {
    try {
      const response = await fetch(`${host}/api/notes/addnote`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "auth-token":
            "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiNjUzNjFmNzdhM2YxOTNjM2RhYjJhMzZiIn0sImlhdCI6MTY5ODE1NDIxNn0.uTWvdkCS_5K9DLHOLXm8XJwGDJd7vvOF-XO_UK1t038",
        },
        body: JSON.stringify({ title, description, tag }),
      });

      if (!response.ok) {
        throw new Error("Failed to add a note");
      }

      const newNote = await response.json();

      setNotes([...notes, newNote]);
    } catch (error) {
      console.error("Error adding note:", error);
    }
  };

  //Delete a note
  const deleteNote = async (id) => {
    try {
      //API CALL to delete note
      await fetch(`${host}/api/notes/deletenote/${id}`, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
          "auth-token":
            "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiNjUzNjFmNzdhM2YxOTNjM2RhYjJhMzZiIn0sImlhdCI6MTY5ODE1NDIxNn0.uTWvdkCS_5K9DLHOLXm8XJwGDJd7vvOF-XO_UK1t038",
        },
      });

      const newNotes = notes.filter((note) => note._id !== id);
      setNotes(newNotes);
    } catch (error) {
      console.error("Error deleting note:", error);
    }
  };

  //Edit a note
  const editNote = async (id, title, description, tag) => {
    try {
      const response = await fetch(`${host}/api/notes/updatenote/${id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          "auth-token": "your-auth-token-here",
        },
        body: JSON.stringify({ title, description, tag }),
      });

      if (!response.ok) {
        throw new Error("Failed to update note");
      }

      const updatedNote = await response.json();

      const updatedNotes = notes.map((note) =>
        note._id === id ? { ...note, ...updatedNote } : note
      );

      setNotes(updatedNotes);
    } catch (error) {
      console.error("Error updating note:", error);
    }
  };

  return (
    <NoteContext.Provider
      value={{ notes, addNote, deleteNote, editNote, getNotes }}
    >
      {props.children}
    </NoteContext.Provider>
  );
};

export default NoteState;
