import React, { useContext } from "react";
import { NavLink, useHistory } from 'react-router-dom'
import { AuthContext } from "../../context/AuthContext";

export const Navbar = () => {
    const auth = useContext(AuthContext);
    const history = useHistory();

    const logoutHandler = event => {
        event.preventDefault();
        auth.logout();
        history.push('/');
    }

    return (
        <nav className="blue-grey">
            <div class="nav-wrapper">
                <a href="#" class="brand-logo">Minimize your url</a>
                <ul id="nav-mobile" class="right hide-on-med-and-down">
                    <li><NavLink to="/create">Create</NavLink></li>
                    <li><NavLink to="/links">Links</NavLink></li>
                    <li><a href="/" onClick={logoutHandler}>Exit</a></li>
                </ul>
            </div>
        </nav>
    );
}