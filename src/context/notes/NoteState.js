import { useState } from "react";
import noteContext from "./noteContext";

const NoteState = (props) => {
  const mynotes = []
  const [notes, setNotes] = useState(mynotes);
  const host = `http://localhost:5000`

  // Fetching all notes
  const getAllNotes = async () => {
    // Api Call
    const response = await fetch(`${host}/api/notes/fetchAll`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'auth-token': 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiNjJjMDFlY2JlYWU4YzA0YjhlN2Q0MjMyIn0sImlhdCI6MTY1NjkxOTcyMX0.WBaX5cg7LkiFydGD-y2PI9bwiMY0b8aBRZfCzyjHvaA'
      },
    });
    const json = await response.json();
    setNotes(json)
  }


  // Add Note
  const addNote = async (title, description, tag) => {
    // API Call
    const response = await fetch(`${host}/api/notes/addnotes`, {
      method: 'POST',

      headers: {
        'Content-Type': 'application/json',
        'auth-token': 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiNjJjMDFlY2JlYWU4YzA0YjhlN2Q0MjMyIn0sImlhdCI6MTY1NjkxOTcyMX0.WBaX5cg7LkiFydGD-y2PI9bwiMY0b8aBRZfCzyjHvaA'
      },
      body: JSON.stringify({ title: title, description: description, tag: tag })
    });

    const json = await response.json();
    console.log(json)
    const newnote = notes.concat(json);
    setNotes(newnote);
  }

  // Delete a note
  const delnote = async (id) => {
    // API Call
    const response = await fetch(`${host}/api/notes/deletenote/${id}`, {
      method: 'DELETE',

      headers: {
        'Content-Type': 'application/json',
        'auth-token': 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiNjJjMDFlY2JlYWU4YzA0YjhlN2Q0MjMyIn0sImlhdCI6MTY1NjkxOTcyMX0.WBaX5cg7LkiFydGD-y2PI9bwiMY0b8aBRZfCzyjHvaA'
      },
    });
    const json = await response.json();
    console.log(json)
    const newnote = notes.filter((note) => { return note._id !== id });
    // console.log(newnote)
    setNotes(newnote);
  }
  const editnote = async (id, title, description, tag) => {
    // API call
    const response = await fetch(`${host}/api/notes/updatenote/${id}`, {
      method: 'PUT',

      headers: {
        'Content-Type': 'application/json',
        'auth-token': 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiNjJjMDFlY2JlYWU4YzA0YjhlN2Q0MjMyIn0sImlhdCI6MTY1NjkxOTcyMX0.WBaX5cg7LkiFydGD-y2PI9bwiMY0b8aBRZfCzyjHvaA'
      },
      body: JSON.stringify({ title: title, description: description, tag: tag })
    });
    const json = await response.json();
    console.log(json);

    // Code to edit the notes on client side
    let newNotes = JSON.parse(JSON.stringify(notes));
    for (let index = 0; index < newNotes.length; index++) {
      const element = newNotes[index];
      if(element._id === id){
        newNotes[index].title = title;
        newNotes[index].description = description;
        newNotes[index].tag = tag;
        break;
      }
    }
    setNotes(newNotes);
    
  }

  return (
    <noteContext.Provider value={{ notes, addNote, delnote, getAllNotes, editnote }}>
      {props.children}
    </noteContext.Provider>
  )
}

export default NoteState;