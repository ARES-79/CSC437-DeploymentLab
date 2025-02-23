import React from 'react';
import './Header.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHouse, faPenToSquare, faUser } from '@fortawesome/free-solid-svg-icons';

function Header() {
    return (
        <header>
            <div className="header-container">
                <h1 id="brand-logo">BurritoGram</h1>
                <nav>
                    <button>
                        <FontAwesomeIcon icon={faHouse} title="Home" />
                        <p>Home</p>
                    </button>
                    <div className="nav-divider"></div>

                    <button>
                        <FontAwesomeIcon icon={faPenToSquare} title="Post" />
                        <p>Post</p>
                    </button>
                    <div className="nav-divider"></div>
                    
                    <button>
                        <FontAwesomeIcon icon={faUser} title="Profile" />
                        <p>Profile</p>
                    </button>
                </nav>
            </div>
        </header>
    );
}

export default Header;