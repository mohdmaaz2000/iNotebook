import React from 'react';
import { useLocation, Link } from "react-router-dom";
import { useNavigate} from 'react-router-dom';

const Navbar = () => {
    let location = useLocation();
    const navigate = useNavigate();


    const logout = () =>{
        localStorage.removeItem('iNotebookToken');
        navigate('/login');
    }
    return (
        <>
            <nav className="navbar navbar-expand-lg bg-dark ">
                <div className="container-fluid">
                    <Link className="navbar-brand" to="/" style={{ color: 'white' }}>iNotebook</Link>
                    <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                        <span className="navbar-toggler-icon"></span>
                    </button>
                    <div className="collapse navbar-collapse" id="navbarSupportedContent">
                        <ul className="navbar-nav me-auto mb-2 mb-lg-0">
                            <li className="nav-item">
                                <Link className={`nav-link ${location.pathname==="/"?"active":""}`} aria-current="page" style={{ color: 'white' }} to="/">Home</Link>
                            </li>
                            <li className="nav-item">
                                <Link className={`nav-link ${location.pathname==="/about"?"active":""}`} to="/about" style={{ color: 'white' }}>About</Link>
                            </li>
                        </ul>
                        {!localStorage.getItem('iNotebookToken')?<form className="d-flex" role="search">
                            
                        <Link className="btn btn-primary mx-1" role="button" to="/login">Login</Link>
                        <Link className="btn btn-primary mx-1" role="button" to="/signup">Signup</Link>
                    
                        </form>:<><button className='btn btn-primary mx-1' onClick={logout}>Logout <i style={{color:"white"}} className="fa-solid fa-arrow-right-from-bracket"></i></button>
                        <i className="fa-solid fa-user mx-2" onClick={()=>{navigate('/profile')}} style={{color:"white",fontSize:"27px"}}></i></>}
                    </div>
                </div>
            </nav>
        </>
    )
}

export default Navbar
