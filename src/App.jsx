import './App.css';
import React, { useState } from 'react';
import {Outlet} from "react-router-dom";
import axios from 'axios';

import Navbar from "./components/Navbar/Navbar.jsx";
import Footer from "./components/Footer/Footer.jsx";
function App() {
    const [user, setUser] = useState(null);

    const handleLogout = () => {
        axios
            .post('http://localhost:5000/auth/logout')
            .then((response) => {
                // Clear the user token from local storage
                localStorage.removeItem('usertoken');

                // Update the state to reflect that the user is now logged out
                setUser(null);

            })
            .catch((error) => {
                console.error('An error occurred during logout:', error);
            });
    };

    return (
        <div className="App">
            <Navbar user={user} handleLogout={handleLogout} />

            <Outlet/>
            <div className="container text-center">
            </div>
            <Footer/>

        </div>


    );
}

export default App;

