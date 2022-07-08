import React from 'react'

export default function notesItem(props) {
  const { note } = props
  return (
    <div className='col-md-3'>
      <div className="card" >
        <div className="card-body">
          <h5 className="card-title">{note.title}</h5>
          <p className="card-text">{note.description}</p>
          <i className="mx-3 fa-solid fa-trash-can"></i>
          <i className="mx-3 fa-solid fa-pen-to-square"></i>
        </div>
      </div>
    </div>
  )
}
