import React from 'react'
import { useState } from 'react';
import { useContext } from 'react'
import noteContext from '../context/notes/noteContext'

export default function Addnote() {
  const context = useContext(noteContext);
  const { addNote } = context;
  const [note,setNote] = useState({title:"",description:""});

  const submitnote = (e) =>{
    e.preventDefault();
    addNote(note.title,note.description);

  }
  const onchange = (e) =>{
    setNote({...note ,[e.target.name] : e.target.value})
  }
  return (
    <div>
      <h2 className='my-6'>Add Notes</h2>
      <form className='container my-6'>
        <div className="mb-3">
          <label htmlFor="title" className="form-label">Title</label>
          <input type="text" className="form-control" id="title" onChange={onchange} name='title' aria-describedby="emailHelp"/>
            
        </div>
        <div className="mb-3">
          <label htmlFor="description" className="form-label">Description</label>
          <input type="description" className="form-control" onChange={onchange} name='description' id="description" />
        </div>
        
        <button type="submit" onClick={submitnote} className="btn btn-primary">Submit</button>
      </form>
    </div>
  )
}
