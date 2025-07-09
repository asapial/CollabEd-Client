import React, { useState, useContext } from 'react';
import { Link } from 'react-router';
import PrimaryButton from './Buttons/PrimaryButton';
import { AuthContext } from '../main';

const Navbar = () => {
    const [isOpen, setIsOpen] = useState(false);
    const { user, logout } = useContext(AuthContext);

    const toggleMenu = () => {
        setIsOpen(!isOpen);
    };

    return (
        <nav className="bg-base-100 shadow-md sticky top-0 z-50">
            <div className="container mx-auto px-4">
                <div className="flex justify-between items-center py-4">
                    <div className="flex items-center">
                        <Link to="/" className="text-2xl font-bold text-primary">CollabEd</Link>
                    </div>
                    <div className="hidden md:flex items-center space-x-4">
                        <Link to="/tutors" className="text-base-content hover:text-primary">Tutors</Link>
                        <Link to="/sessions" className="text-base-content hover:text-primary">Study Sessions</Link>
                        {user ? (
                            <div className="flex items-center space-x-4">
                                <Link to="/dashboard" className="text-base-content hover:text-primary">Dashboard</Link>
                                <button onClick={logout} className="btn btn-primary">Logout</button>
                                <img src={user.photoURL} alt="profile" className="w-10 h-10 rounded-full" />
                            </div>
                        ) : (
                            <div className="flex items-center space-x-2">
                                <Link to="/login"><PrimaryButton>Login</PrimaryButton></Link>
                                <Link to="/signup"><PrimaryButton>Sign Up</PrimaryButton></Link>
                            </div>
                        )}
                    </div>
                    <div className="md:hidden flex items-center">
                        <button onClick={toggleMenu} className="text-base-content">
                            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16m-7 6h7"></path>
                            </svg>
                        </button>
                    </div>
                </div>
            </div>
            {isOpen && (
                <div className="md:hidden bg-base-100">
                    <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
                        <Link to="/tutors" className="block px-3 py-2 rounded-md text-base font-medium text-base-content hover:text-primary hover:bg-base-200">Tutors</Link>
                        <Link to="/sessions" className="block px-3 py-2 rounded-md text-base font-medium text-base-content hover:text-primary hover:bg-base-200">Study Sessions</Link>
                        {user ? (
                            <div className="pt-4 pb-3 border-t border-base-200">
                                <div className="flex items-center px-5">
                                    <div className="flex-shrink-0">
                                        <img className="h-10 w-10 rounded-full" src={user.photoURL} alt="" />
                                    </div>
                                    <div className="ml-3">
                                        <div className="text-base font-medium text-base-content">{user.displayName}</div>
                                        <div className="text-sm font-medium text-base-content">{user.email}</div>
                                    </div>
                                </div>
                                <div className="mt-3 px-2 space-y-1">
                                    <Link to="/dashboard" className="block px-3 py-2 rounded-md text-base font-medium text-base-content hover:text-primary hover:bg-base-200">Dashboard</Link>
                                    <button onClick={logout} className="block w-full text-left px-3 py-2 rounded-md text-base font-medium text-base-content hover:text-primary hover:bg-base-200">Logout</button>
                                </div>
                            </div>
                        ) : (
                            <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
                                <Link to="/login" className="block"><PrimaryButton>Login</PrimaryButton></Link>
                                <Link to="/signup" className="block mt-2"><PrimaryButton>Sign Up</PrimaryButton></Link>
                            </div>
                        )}
                    </div>
                </div>
            )}
        </nav>
    );
};

export default Navbar;