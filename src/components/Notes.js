import React, { useEffect, useContext, useState, useRef } from 'react';
import noteContext from '../context/notes/noteContext'
import Noteitem from './Noteitem.js'

export default function Notes(props) {
    const context = useContext(noteContext);
    const { notes, getAllNotes, editnote } = context;
    const [note, setNote] = useState({ id: "", etitle: "", edescription: "", etag: "" });
    const ref = useRef(null);
    const closeref = useRef(null);

    useEffect(() => {
        getAllNotes();
    }, []);

    const handleClick = (e) => {
        // e.preventDefault();
        editnote(note.id, note.etitle, note.edescription, note.etag);
        closeref.current.click();
    }
    const onchange = (e) => {
        setNote({ ...note, [e.target.name]: e.target.value })
    }

    const updatenote = (enote) => {
        ref.current.click();
        setNote({ id: enote._id, etitle: enote.title, edescription: enote.description, etag: enote.tag });
    }

    return (
        <>
            {/*  Code for editing note */}
            <button type="button" ref={ref} className="d-none btn btn-primary" data-bs-toggle="modal" data-bs-target="#exampleModal">
                Launch demo modal
            </button>

            <div className="modal fade" id="exampleModal" tabIndex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
                <div className="modal-dialog">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h5 className="modal-title" id="exampleModalLabel">Edit Note</h5>
                            <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                        </div>
                        <div className="modal-body">
                            <form className='container my-6'>
                                <div className="mb-3">
                                    <label htmlFor="etitle" className="form-label">Title</label>
                                    <input type="text" className="form-control" id="etitle" onChange={onchange} name='etitle' aria-describedby="emailHelp" value={note.etitle} />

                                </div>
                                <div className="mb-3">
                                    <label htmlFor="edescription" className="form-label" >Description</label>
                                    <input type="text" className="form-control" onChange={onchange} name='edescription' id="edescription" value={note.edescription} />
                                </div>
                                <div className="mb-3">
                                    <label htmlFor="etag" className="form-label" >Tag</label>
                                    <input required type="text" className="form-control" value={note.etag} onChange={onchange} name='etag' id="etag" />
                                </div>
                            </form>
                        </div>
                        <div className="modal-footer">
                            <button type="button" ref={closeref} className="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                            <button disabled={note.etitle.length < 3 || note.edescription.length < 5 || note.etag.length < 1} type="button" className="btn btn-primary" onClick={()=>{handleClick();props.showAlert("Note Edited Successfully","success")}} >Update Note</button>
                        </div>
                    </div>
                </div>
            </div>

            {/* Printing the saved note */}
            <div className='row my-3'>
                <h2 className='my-6'>Your Notes</h2>
                <div className="container mx-2 my-2">
                {notes.length === 0 && "No notes, add notes above to see"}
                </div>
                {
                    notes.map((note) => {
                        return <Noteitem key={note._id} showAlert={props.showAlert} note={note} updatenote={updatenote} />
                    })
                }

            </div>
        </>
    )
}
