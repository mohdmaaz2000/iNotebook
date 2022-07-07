import { useState } from "react";
import noteContext from "./noteContext";


const NoteState = (props) =>{
   const mynotes=[
    {
      "_id": "62c3fe4115ac7182e25fdbc0",
      "user": "62c01ecbeae8c04b8e7d4232",
      "title": "My title",
      "description": "This is the description",
      "tag": "this is the tag",
      "date": "2022-07-05T09:02:48.998Z",
      "__v": 0
    },
    {
      "_id": "62c6dc750203c9d4cefd828e",
      "user": "62c01ecbeae8c04b8e7d4232",
      "title": "New Note 1",
      "description": "Please delete this note my name is jalebi bai 1",
      "tag": "personal 1",
      "date": "2022-07-07T13:11:35.982Z",
      "__v": 0
    },
    {
      "_id": "62c6dc800203c9d4cefd8290",
      "user": "62c01ecbeae8c04b8e7d4232",
      "title": "Beatiful Notes 1",
      "description": "Please delete this note my name is jalebi bai 1",
      "tag": "personal 1",
      "date": "2022-07-07T13:11:35.982Z",
      "__v": 0
    },
    {
      "_id": "62c6dc750203c9d4cefd828e",
      "user": "62c01ecbeae8c04b8e7d4232",
      "title": "New Note 1",
      "description": "Please delete this note my name is jalebi bai 1",
      "tag": "personal 1",
      "date": "2022-07-07T13:11:35.982Z",
      "__v": 0
    },
    {
      "_id": "62c6dc750203c9d4cefd828e",
      "user": "62c01ecbeae8c04b8e7d4232",
      "title": "New Note 1",
      "description": "Please delete this note my name is jalebi bai 1",
      "tag": "personal 1",
      "date": "2022-07-07T13:11:35.982Z",
      "__v": 0
    },{
      "_id": "62c6dc750203c9d4cefd828e",
      "user": "62c01ecbeae8c04b8e7d4232",
      "title": "New Note 1",
      "description": "Please delete this note my name is jalebi bai 1",
      "tag": "personal 1",
      "date": "2022-07-07T13:11:35.982Z",
      "__v": 0
    }
  ]

  const [notes,setNotes] = useState(mynotes) ;
    return(
        <noteContext.Provider value={{notes,setNotes}}>
            {props.children}
        </noteContext.Provider>
    )
}

export default NoteState;