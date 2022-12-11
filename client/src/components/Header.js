import React, {useState} from 'react';
import {Link, useNavigate} from "react-router-dom";

const Header = () => {
    const navigate = useNavigate();
    const token = localStorage.getItem("token");

    const logout = () => {
        localStorage.clear();
        navigate("/")
    }
    return (
        <nav className="navbar navbar-expand-lg navbar-light bg-light">
            <a className="navbar-brand" href="#">DEMO</a>
            <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
                <span className="navbar-toggler-icon"></span>
            </button>
            <div className="collapse navbar-collapse" id="navbarNav">
                <ul className="navbar-nav">
                <li className="nav-item active">
                    <Link to="/dashboard" className="nav-link">Home</Link>
                </li>
                {
                    token ? null : 
                    <li className="nav-item">
                        <Link className="nav-link" to="/">Login</Link>
                    </li>
                }
                {
                    token ? null : 
                    <li className="nav-item">
                        <Link className="nav-link" to="/register">Register</Link>
                    </li>
                }
                {
                    token ? 
                    <li className="nav-item">
                        <a className="nav-link" href="#"><button onClick={()=> logout()}>Logout</button></a>
                    </li>
                    : null
                }
                </ul>
            </div>
        </nav>
    )
}

export default Header;
