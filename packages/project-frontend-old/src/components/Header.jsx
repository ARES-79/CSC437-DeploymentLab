import React from 'react';
import './Header.css';
import { Link } from 'react-router';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHouse, faPenToSquare, faUser } from '@fortawesome/free-solid-svg-icons';

function Header() {
    return (
        <header>
            <div className="header-container">
                <h1 id="brand-logo">BurritoGram</h1>
                <nav>
                <Link to="/" className="nav-link">
                    <FontAwesomeIcon icon={faHouse} title="Home" />
                    <p>Home</p>
                </Link>
                <span className='nav-divider'/>
                <Link to="/post" className="nav-link">
                    <FontAwesomeIcon icon={faPenToSquare} title="Post" />
                    <p>Post</p>
                </Link>
                <span className='nav-divider'/>
                <Link to="/profile" className="nav-link">
                    <FontAwesomeIcon icon={faUser} title="Profile" />
                    <p>Profile</p>
                </Link>
                </nav>
            </div>
        </header>
    );
}

export default Header;