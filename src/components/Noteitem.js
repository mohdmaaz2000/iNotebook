import React from 'react'
import { useContext } from 'react'
import noteContext from '../context/notes/noteContext'

export default function Noteitem(props) {
  const context = useContext(noteContext);
  const { delnote } = context;

  const deletenote = (id) => {
    delnote(id);
  }

  const { note, updatenote } = props
  return (
    <div className='col-md-3'>
      <div className="card my-3" >
        <div className="card-body">
          <h5 className="card-title">{note.title}</h5>
          <p className="card-text">{note.description}</p>
          <h6 className='card-text' style={{ float: "right", fontSize: "10px" }}>{note.tag}</h6>
          <i className="mx-3 fa-solid fa-trash-can" onClick={() => { deletenote(note._id);props.showAlert("Notes Deleted Successfully","success") }}></i>
          <i className="mx-3 fa-solid fa-pen-to-square" onClick={() => { updatenote(note) }}></i>
        </div>
      </div>
    </div>
  )
}
