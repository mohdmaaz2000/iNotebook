import React from 'react'

export default function Alert(props) {
    return (
        <div>
            <div className="alert alert-danger" role="alert">
                {props.message}
            </div>
        </div>
    )
}
