import React from 'react'
import { useEffect } from 'react';
import { useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import authContext from '../context/auth/authContext';


export default function Profile() {
  const navigate = useNavigate();
  const context = useContext(authContext);
  // const {getuserDetails,data} = context;

  // useEffect(()=>{
  //   getuserDetails();
  // },[])

  const logout = () => {
    localStorage.removeItem('iNotebookToken');
    navigate('/login');
  }
  return (
    <div className='container my-3 my-container'>
      <h2 className='heading'>My Profile</h2>
      <div className="details"><b>Name : </b><p>data.name</p></div>
      <div className="details"><b>Email : </b><p>data.email</p></div>
      <div className="details"><b>Number of notes : </b><p>4</p></div>
      <div className="details"><b>Account created  on : </b><p>data.date</p></div>
      <div className="details"><b>Notes Categories : </b><p>Personal</p></div>

      <button className="btn btn-primary my-btn">Edit <i style={{ color: "white" }} className="fa-solid fa-pen-to-square"></i></button>
      <button onClick={logout} className="btn btn-primary my-btn">Logout <i style={{ color: "white" }} className="fa-solid fa-arrow-right-from-bracket"></i></button>
      <button className="btn btn-primary my-btn">Delete Account <i style={{ color: "white" }} className="fa-solid fa-trash-can"></i></button>

    </div>
  )
}
