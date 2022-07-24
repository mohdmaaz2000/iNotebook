import React from 'react'
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

export default function Signup(props) {
  const [credentials, setCredentials] = useState({ name: '', email: '', password: '', cpassword: '' })
  const navigate = useNavigate();

  const onchange = (e) => {
    setCredentials({ ...credentials, [e.target.name]: e.target.value });
  }

  const submit = async (e) => {
    e.preventDefault();
    if (credentials.password === credentials.cpassword) {
      const response = await fetch(`http://localhost:5000/api/auth/createUser`, {
        method: 'POST',

        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ name: credentials.name, email: credentials.email, password: credentials.password })
      });


      const data = await response.json()
      if (data.success) {
        // redirect
        localStorage.setItem('iNotebookToken', data.token);
        navigate('/');
        props.showAlert("Signed up successfully", "success");
      }
      else {
        props.showAlert("Enter valid credentials", "danger");
      }
    }
    else {
      props.showAlert("Password did not match", "danger")
    }
  }

  return (
    <div className='container box' >
      <h2 style={{ textAlign: "center" }}>Sign Up</h2>
      <form onSubmit={submit}>
        <div className="mb-3">
          <label htmlFor="name" className="form-label">Name</label>
          <input placeholder='Enter yor name' type="text" className="form-control" onChange={onchange} name='name' id="name" aria-describedby="emailHelp" required minLength={3} />
        </div>
        <div className="mb-3">
          <label htmlFor="email" className="form-label">Email address</label>
          <input placeholder='Enter yor email' type="email" className="form-control" onChange={onchange} name='email' id="email" aria-describedby="emailHelp" required />
        </div>
        <div className="mb-3">
          <label placeholder='Enter your password' htmlFor="password" className="form-label">Password</label>
          <input type="password" name='password' className="form-control" onChange={onchange} id="password" required minLength={8} />
        </div>
        <div className="mb-3">
          <label htmlFor="cpassword" className="form-label">Confirm Password</label>
          <input placeholder='Re-enter your password' type="password" name='cpassword' className="form-control" onChange={onchange} id="cpassword" required minLength={8} />
        </div>

      </form>
      <button type="submit" className="btn btn-primary">Sign up</button>
      <p className='my-2'>Already have an account</p>
      <button role="button" className="btn btn-primary">Login</button>
    </div>
  )
}
