import React from 'react';
import './Header.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHouse, faPenToSquare, faUser } from '@fortawesome/free-solid-svg-icons';

// new header suggested by ChatGpt to be responsive to page design 
// needs some styling changes still
function Header() {
    return (
        <header className="bg-white shadow-md md:h-screen md:w-64 md:fixed md:left-0 md:top-0 md:flex md:flex-col md:justify-start">
            {/* Mobile header */}
            <div className="w-full flex flex-col items-center py-2 md:hidden">
                <h1 className="text-indigo-800 tracking-wide text-center" id="brand-logo">BurritoGram</h1>
                <nav className="flex justify-evenly w-full mt-1">
                    <button className="flex items-center gap-x-2">
                        <FontAwesomeIcon icon={faHouse} title="Home" />
                        <p>Home</p>
                    </button>
                    <div className="h-full w-px bg-gray-400"></div>

                    <button className="flex items-center gap-x-2">
                        <FontAwesomeIcon icon={faPenToSquare} title="Post" />
                        <p>Post</p>
                    </button>
                    <div className="h-full w-px bg-gray-400"></div>

                    <button className="flex items-center gap-x-2">
                        <FontAwesomeIcon icon={faUser} title="Profile" />
                        <p>Profile</p>
                    </button>
                </nav>
            </div>

            {/* Sidebar for larger screens */}
            <nav className="hidden md:flex md:flex-col md:items-start md:p-4 md:gap-y-4">
                <h1 className="text-indigo-800" id="brand-logo">BurritoGram</h1>
                <button className="flex items-center gap-x-2 w-full p-2 hover:bg-gray-100 rounded-md">
                    <FontAwesomeIcon icon={faHouse} title="Home" />
                    <p>Home</p>
                </button>
                <button className="flex items-center gap-x-2 w-full p-2 hover:bg-gray-100 rounded-md">
                    <FontAwesomeIcon icon={faPenToSquare} title="Post" />
                    <p>Post</p>
                </button>
                <button className="flex items-center gap-x-2 w-full p-2 hover:bg-gray-100 rounded-md">
                    <FontAwesomeIcon icon={faUser} title="Profile" />
                    <p>Profile</p>
                </button>
            </nav>
        </header>
    );
}

export default Header;