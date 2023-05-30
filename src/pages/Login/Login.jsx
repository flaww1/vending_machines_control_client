import React from 'react';
import {useNavigate} from "react-router-dom";
import './Login.css';

/*
const navigate = useNavigate();

const handleLogin = () => {
    console.log("User logged in")
    navigate('/');

}*/
function loginForm() {
    return (
        <div className="login-wrapper d-flex align-items-center justify-content-center">
            <form className="border p-5">
                <h3 className="mb-4">Login</h3>
                <div className="form-group">
                    <label>Email address</label>
                    <input type="email" className="form-control" placeholder="Enter email" />
                </div>
                <div className="form-group">
                    <label>Password</label>
                    <input type="password" className="form-control" placeholder="Enter password" />
                </div>
                <button /*onClick={handleLogin}*/ type="submit" className="btn btn-primary btn-block">Submit</button>
            </form>
        </div>
    )
}

export default loginForm;
