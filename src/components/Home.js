import React from 'react'
import Addnote from './Addnote'
import Notes from './Notes'

const Home = (props) => {

  return (
    <div>
      <Addnote showAlert={props.showAlert} />
      <hr />
      <div className="my-3">
        <Notes showAlert={props.showAlert}/>
      </div>
    </div>
  )
}

export default Home
