import React from 'react';
import { Link, NavLink } from 'react-router-dom';


function Navbar({ user, handleLogout }) {


    const renderAuthButtons = () => {
        if (user) {
            return (
                <>
                    <li className="nav-item">
                        <span className="nav-link">Welcome, {user.name}</span>
                    </li>
                    <li className="nav-item">
                        <button className="nav-link btn btn-link" onClick={handleLogout}>
                            Logout
                        </button>
                    </li>
                </>
            );
        } else {
            return (
                <>
                    <li className="nav-item">
                        <NavLink className="nav-link" activeClassName="active" exact to="/">
                            Home
                        </NavLink>
                    </li>
                    <li className="nav-item">
                        <NavLink
                            className="nav-link"
                            activeClassName="active"
                            to="/login"
                        >
                            Login
                        </NavLink>
                    </li>
                    <li className="nav-item">
                        <NavLink
                            className="nav-link"
                            activeClassName="active"
                            to="/registration"
                        >
                            Registration
                        </NavLink>
                    </li>
                    <li className="nav-item">
                        <NavLink
                            className="nav-link"
                            activeClassName="active"
                            to="/dashboard/products"
                        >
                            Dashboard
                        </NavLink>
                    </li>
                    <li className="nav-item">
                        <NavLink
                            className="nav-link"
                            activeClassName="active"
                            to="/reservations"
                        >
                           Reservations
                        </NavLink>
                    </li>
                    <li className="nav-item">

                        <NavLink
                            className={({ isActive }) => isActive ? 'nav-link active' : 'nav-link'}
                            to="/"
                            onClick={handleLogout}
                        >
                            Logout
                        </NavLink>
                    </li>


                </>
            );
        }
    };

    return (
        <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
            <Link className="navbar-brand" to="/">
                VMC
            </Link>
            <button
                className="navbar-toggler"
                type="button"
                data-toggle="collapse"
                data-target="#navbarNav"
                aria-controls="navbarNav"
                aria-expanded="false"
                aria-label="Toggle navigation"
            >
                <span className="navbar-toggler-icon"></span>
            </button>
            <div className="collapse navbar-collapse" id="navbarNav">
                <ul className="navbar-nav">{renderAuthButtons()}</ul>
            </div>
        </nav>
    );
}

export default Navbar;
