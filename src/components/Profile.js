import React from 'react'
import { useEffect } from 'react';
import { useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import authContext from '../context/auth/authContext';
import { confirmAlert } from 'react-confirm-alert'; // Import
import 'react-confirm-alert/src/react-confirm-alert.css'; // Import css
import { useRef } from 'react';
import { useState } from 'react';

export default function Profile(props) {
  const navigate = useNavigate();
  const ref = useRef(null);
  const closeref = useRef(null);
  const context = useContext(authContext);
  const [pass, setPass] = useState({ cpass: "", newPass: "", rnewPass: "" })
  // const {getuserDetails,data} = context;

  // useEffect(()=>{
  //   getuserDetails();
  // },[])

  const editPass = () => {
    ref.current.click();
  }

  const changePassword = async () => {
    if (pass.newPass !== pass.rnewPass) {
      props.showAlert("Password did not match", "danger");
    }
    else {
      const response = await fetch(`http://localhost:5000/api/auth/editPassword`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          'auth-token': localStorage.getItem('iNotebookToken')
        },
        body: JSON.stringify({ cpassword: pass.cpass, password: pass.newPass })
      });
      const json = await response.json();
      if (json.sucess) {
        props.showAlert("Password Changed Successfully", "success")
      }
      else {
        props.showAlert(json.error, "danger");
      }
    }
    closeref.current.click();
    setPass({ cpass: "", newPass: "", rnewPass: "" });
  }

  const onchange = (e) => {
    setPass({ ...pass, [e.target.name]: e.target.value });
  }

  // Code to logout user
  const logout = () => {
    localStorage.removeItem('iNotebookToken');
    navigate('/login');
  }


  // Code to delete user account and their respective notes
  const delAccount = () => {
    confirmAlert({
      title: 'Are you sure to delete account',
      message: 'All the notes will be permanently deleted',
      buttons: [
        {
          label: 'Yes',
          onClick: async () => {
            const host = "http://localhost:5000";
            const response1 = await fetch(`${host}/api/notes/deleteAllNote`, {
              method: 'DELETE',
              headers: {
                'Content-Type': 'application/json',
                'auth-token': localStorage.getItem('iNotebookToken')
              },
            });
            const json1 = await response1.json();
            console.log(json1);

            const response2 = await fetch(`${host}/api/auth/delUser`, {
              method: 'DELETE',
              headers: {
                'Content-Type': 'application/json',
                'auth-token': localStorage.getItem('iNotebookToken')
              }
            });

            const json2 = await response2.json();
            console.log(json2);
            navigate('/login');
            localStorage.removeItem('iNotebookToken');
            props.showAlert("Account deleted successfully", "danger");
          }
        },
        {
          label: 'No',
        }
      ]
    });
  }
  return (
    <>
      {/* Modal for changing password */}
      <button ref={ref} type="button" className="d-none btn btn-primary" data-bs-toggle="modal" data-bs-target="#exampleModal">
        Launch demo modal
      </button>
      <div className="modal fade" id="exampleModal" tabIndex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
        <div className="modal-dialog">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title" id="exampleModalLabel">Change Password</h5>
              <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
            </div>
            <div className="modal-body">
              <form className='container my-6'>
                <div className="mb-3">
                  <label htmlFor="cpass" className="form-label">Current Password</label>
                  <input placeholder='Enter current password' type="password" onChange={onchange} value={pass.cpass} className="form-control" id="cpass" name='cpass' aria-describedby="emailHelp" />

                </div>
                <div className="mb-3">
                  <label htmlFor="newPass" className="form-label" >New Password</label>
                  <input placeholder='Minimum 8 characters' type="password" onChange={onchange} value={pass.newPass} className="form-control" name='newPass' id="newPass" />
                </div>
                <div className="mb-3">
                  <label htmlFor="rnewPass" className="form-label" >Re-write Password </label>
                  <input placeholder='Re-enter your password' required type="password" value={pass.rnewPass} onChange={onchange} className="form-control" name='rnewPass' id="rnewPass" />
                </div>
              </form>
            </div>
            <div className="modal-footer">
              <button type="button" ref={closeref} className="btn btn-secondary" data-bs-dismiss="modal">Close</button>
              <button disabled={pass.cpass.length < 8 || pass.newPass.length < 8 || pass.rnewPass.length < 8} type="button" onClick={changePassword} className="btn btn-primary" >Change Password</button>
            </div>
          </div>
        </div>
      </div>

      <div className='container my-3 my-container'>
        <h2 className='heading'>My Profile</h2>
        <div className="details"><b>Name : </b><p>data.name</p></div>
        <div className="details"><b>Email : </b><p>data.email</p></div>
        <div className="details"><b>Number of notes : </b><p>4</p></div>
        <div className="details"><b>Account created  on : </b><p>data.date</p></div>
        <div className="details"><b>Notes Categories : </b><p>Personal</p></div>

        <button onClick={editPass} className="btn btn-primary my-btn">Change Password <i style={{ color: "white" }} className="fa-solid fa-pen-to-square"></i></button>
        <button onClick={logout} className="btn btn-primary my-btn">Logout <i style={{ color: "white" }} className="fa-solid fa-arrow-right-from-bracket"></i></button>
        <button onClick={delAccount} className="btn btn-primary my-btn">Delete Account  <i style={{ color: "white" }} className="fa-solid fa-trash-can"></i></button>

      </div>
    </>
  )
}
