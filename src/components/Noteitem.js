import React from 'react'
import { useContext } from 'react'
import noteContext from '../context/notes/noteContext'

export default function Noteitem(props) {
  const context = useContext(noteContext);
  const { delnote } = context;
  
  const deletenote = (id) =>{
    delnote(id);
  }
  const { note } = props
  return (
    <div className='col-md-3'>
      <div className="card my-3" >
        <div className="card-body">
          <h5 className="card-title">{note.title}</h5>
          <p className="card-text">{note.description}</p>
          <i className="mx-3 fa-solid fa-trash-can" onClick={()=>{deletenote(note._id)}}></i>
          <i className="mx-3 fa-solid fa-pen-to-square"></i>
        </div>
      </div>
    </div>
  )
}
