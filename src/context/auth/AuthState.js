import { useState } from "react";
import authContext from "./authContext"

const AuthState = (props) => {
  const host = "http://localhost:5000";
  const [data, setData] = useState(null);

  const getuserDetails = async () => {
    const response = await fetch(`${host}/api/auth/fetchUser`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'auth-token': localStorage.getItem('iNotebookToken')
      },
    });
    const json = await response.json();
    setData(json);
  }

  return (
    <authContext.Provider value={{ getuserDetails, data }}>
      {props.children}
    </authContext.Provider>
  )
}

export default AuthState
