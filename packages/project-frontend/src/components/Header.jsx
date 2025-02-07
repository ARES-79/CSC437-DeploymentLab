import React from 'react';
import './Header.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHouse, faPenToSquare, faUser } from '@fortawesome/free-solid-svg-icons';

function Header() {
    return (
        // fixed top-0 left-0 z-50
        <header className='w-full bg-white shadow-md pb-2 flex justify-center items-center'> 
            <div className='inline-flex flex-col items-center mx-auto'>
                <h1 className='text-indigo-800 tracking-wide text-center' id="brand-logo">BurritoGram</h1>
                <nav className='flex justify-evenly w-full mt-1'>
                    <button className='flex items-center gap-x-2'>
                        <FontAwesomeIcon icon={faHouse} 
                        title="Home" />
                        <p>Home</p>
                    </button>                    
                    <div className="h-100% w-px bg-gray-400"></div>

                    <button className='flex items-center gap-x-2'>
                        <FontAwesomeIcon icon={faPenToSquare} 
                        title="Post" />
                        <p>Post</p>
                    </button>    
                    <div className="h-100% w-px bg-gray-400"></div>
                    
                    <button className='flex items-center gap-x-2'>
                        <FontAwesomeIcon icon={faUser} 
                        title="Profile" />
                        <p>Profile</p>
                    </button> 
                    
                </nav>
            </div>
        </header>
    );
}

export default Header;