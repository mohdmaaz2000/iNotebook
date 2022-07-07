import React from 'react'
import { useContext } from 'react'
import noteContext from '../context/notes/noteContext'
import Noteitem from './Noteitem.js'

export default function Notes() {
    const context = useContext(noteContext);
    const { notes } = context;
    return (
        <div className='row my-3'>
            <h2 className='my-6'>Your Notes</h2>
            
                {
                    notes.map((note) => {
                        return <Noteitem note={note} />
                    })
                }
            
        </div>
    )
}
