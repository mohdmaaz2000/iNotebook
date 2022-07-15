import React from 'react'
import { useState } from 'react';
import { useContext } from 'react'
import noteContext from '../context/notes/noteContext'

export default function Addnote() {
  const context = useContext(noteContext);
  const { addNote } = context;
  const [note, setNote] = useState({ title: "", description: "", tag: ""});

  const submitnote = (e) => {
    e.preventDefault();
    addNote(note.title, note.description, note.tag);
    setNote({title: "", description: "", tag: ""});

  }
  const onchange = (e) => {
    setNote({ ...note, [e.target.name]: e.target.value })
  }
  return (
    <div>
      <h2 className='my-6'>Add Notes</h2>
      <form className='container my-6'>
        <div className="mb-3">
          <label htmlFor="title" className="form-label">Title</label>
          <input type="text" className="form-control" id="title" minLength={3} value={note.title} onChange={onchange} name='title' aria-describedby="emailHelp" />

        </div>
        <div className="mb-3">
          <label htmlFor="description" className="form-label">Description</label>
          <input type="text" className="form-control" minLength={5} value={note.description} onChange={onchange} name='description' id="description" />
        </div>
        <div className="mb-3">
          <label htmlFor="tag" className="form-label">Tag</label>
          <input type="text" className="form-control" value={note.tag} onChange={onchange} name='tag' id="tag" />
        </div>

        <button disabled={note.title.length < 3 || note.description.length < 5 ||note.tag.length < 1} type="submit" onClick={submitnote} className="btn btn-primary">Submit</button>
      </form>
    </div>
  )
}
