import React from 'react'
import { useState } from 'react';
import { useNavigate} from 'react-router-dom';

export default function Login(props) {
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
      props.showAlert("Logged in Successfully","success");
    }
    else{
      props.showAlert("Enter valid credentials","danger");
    }
  }
  
  const toSignup = () =>{
    navigate('/signup');
  }
  return (
    <div className="container box">
      <form onSubmit={onsubmit}>
        <div className="mb-3" >
          <h2 style={{textAlign:"center"}}>Login</h2>
          <label htmlFor="email" className="form-label">Email address</label>
          <input placeholder='example@email.com' type="email" onChange={onchange} className="form-control" name='email' id="email" aria-describedby="emailHelp" />
        </div>
        <div className="mb-3">
          <label htmlFor="password" className="form-label">Password</label>
          <input placeholder='Enter password' onChange={onchange} type="password" name='password' className="form-control" id="pasword" />
        </div>
        <button type="submit" className="btn btn-primary mx-1 my-1">Login</button>
      </form>
      <p className='my-2'>Already have an account</p>
        <button onClick={toSignup} role="button" className="btn btn-primary mx-1 my-1">Sign Up</button>
    </div>
  )
}
