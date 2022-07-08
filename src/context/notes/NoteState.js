import { useState } from "react";
import noteContext from "./noteContext";

const NoteState = (props) => {

  const mynotes = [
    {
      "_id": "62c3fe4115ac7182e25fdb5c0",
      "user": "62c01ecbeae8c04b8e7d4232",
      "title": "My title",
      "description": "This is the description",
      "tag": "this is the tag",
      "date": "2022-07-05T09:02:48.998Z",
      "__v": 0
    },
    {
      "_id": "62c6dc750203c95d4cefd828e",
      "user": "62c01ecbeae8c04b8e7d4232",
      "title": "New Note 1",
      "description": "Please delete this note my name is jalebi bai 1",
      "tag": "personal 1",
      "date": "2022-07-07T13:11:35.982Z",
      "__v": 0
    },
    {
      "_id": "62c6dc8002063c9d4cefd8290",
      "user": "62c01ecbeae8c04b8e7d4232",
      "title": "Beatiful Notes 1",
      "description": "Please delete this note my name is jalebi bai 1",
      "tag": "personal 1",
      "date": "2022-07-07T13:11:35.982Z",
      "__v": 0
    },
    {
      "_id": "62c6dc7570203c9d4cefd828e",
      "user": "62c01ecbeae8c04b8e7d4232",
      "title": "New Note 1",
      "description": "Please delete this note my name is jalebi bai 1",
      "tag": "personal 1",
      "date": "2022-07-07T13:11:35.982Z",
      "__v": 0
    },
    {
      "_id": "62c6dc7501203c9d4cefd828e",
      "user": "62c01ecbeae8c04b8e7d4232",
      "title": "New Note 1",
      "description": "Please delete this note my name is jalebi bai 1",
      "tag": "personal 1",
      "date": "2022-07-07T13:11:35.982Z",
      "__v": 0
    }, {
      "_id": "62c6dc750203c9d4cefd82d8e",
      "user": "62c01ecbeae8c04b8e7d4232",
      "title": "New Note 1",
      "description": "Please delete this note my name is jalebi bai 1",
      "tag": "personal 1",
      "date": "2022-07-07T13:11:35.982Z",
      "__v": 0
    }
  ]
  const [notes, setNotes] = useState(mynotes);

  // Add Note
  const addNote = (title,description) =>{
    const note= {
      "_id": `${title}62c6dc750203c9d4cefd82d8e`,
      "user": "62c01ecbeae8c04b8e7d4232",
      "title": title,
      "description": description,
      "tag": "personal 1",
      "date": "2022-07-07T13:11:35.982Z",
      "__v": 0
    }
    setNotes(mynotes.concat(note));
  }
  // Delete a note

  return (
    <noteContext.Provider value={{ notes, addNote}}>
      {props.children}
    </noteContext.Provider>
  )
}

export default NoteState;