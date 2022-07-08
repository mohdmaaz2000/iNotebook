import React from 'react'
import Addnote from './Addnote'
import Notes from './Notes'

const Home = () => {

  return (
    <div>
      <Addnote />
      <hr />
      <div className="my-3">
        <Notes />
      </div>
    </div>
  )
}

export default Home
