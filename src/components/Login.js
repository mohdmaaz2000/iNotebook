import React from 'react'
import { useState } from 'react';
import { useNavigate} from 'react-router-dom';

export default function Login() {
  const [credentials, setCredentials] = useState({ email: '', password: '' })
  const navigate = useNavigate();

  const onchange = (e) => {
    setCredentials({ ...credentials, [e.target.name]: e.target.value });
  }
  
  const onsubmit = async (e) => {
    e.preventDefault();
    const response = await fetch(`http://localhost:5000/api/auth/login`, {
      method: 'POST',

      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ email: credentials.email, password: credentials.password })
    });
    const data = await response.json()
    if(data.success){
      // redirect
      localStorage.setItem('iNotebookToken',data.token);
      navigate('/');
    }
    else{
      alert("Enter valid credentials");
    }
  }

  return (
    <div>
      <form onSubmit={onsubmit}>
        <div className="mb-3">
          <label htmlFor="email" className="form-label">Email address</label>
          <input type="email" onChange={onchange} className="form-control" name='email' id="email" aria-describedby="emailHelp" />
        </div>
        <div className="mb-3">
          <label htmlFor="password" className="form-label">Password</label>
          <input onChange={onchange} type="password" name='password' className="form-control" id="pasword" />
        </div>
        <button type="submit" className="btn btn-primary">Submit</button>
      </form>
    </div>
  )
}
