import React, { useState, useContext } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import AuthContext from '../context/AuthContext'; // Import AuthContext

function NavBar() {
    const [isMenuOpen, setIsMenuOpen] = useState(false); // State for toggling menu
    const { isAuthenticated, logout } = useContext(AuthContext); // Access auth context
    const navigate = useNavigate();

    // Handle logout
    const handleLogout = () => {
        logout(); // Call logout from context
        navigate('/login'); // Redirect to login page
    };

    return (
        <nav className="bg-gray-800 text-white p-4">
            <div className="max-w-7xl mx-auto flex justify-between items-center">
                {/* Logo and Brand */}
                <div className="text-xl font-bold">
                    <Link to="/" className="hover:text-gray-300">
                        News Aggregator
                    </Link>
                </div>

                {/* Desktop Navigation Links */}
                <div className="hidden md:flex space-x-4 items-center">
                    <Link to="/" className="hover:text-gray-300">
                        News
                    </Link>

                    {/* Conditionally Render Profile or Login/Register */}
                    {isAuthenticated ? (
                        <>
                            <Link to="/profile" className="hover:text-gray-300">
                                Profile
                            </Link>
                            <button
                                onClick={handleLogout}
                                className="hover:text-gray-300 text-white"
                            >
                                Logout
                            </button>
                        </>
                    ) : (
                        <>
                            <Link to="/login" className="hover:text-gray-300">
                                Login
                            </Link>
                            <Link
                                to="/register"
                                className="hover:text-gray-300"
                            >
                                Register
                            </Link>
                        </>
                    )}
                </div>

                {/* Mobile Hamburger Icon */}
                <div className="md:hidden flex items-center">
                    <button
                        onClick={() => setIsMenuOpen(!isMenuOpen)}
                        className="text-white focus:outline-none"
                    >
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            fill="none"
                            viewBox="0 0 24 24"
                            stroke="currentColor"
                            className="w-6 h-6"
                        >
                            <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth="2"
                                d="M4 6h16M4 12h16M4 18h16"
                            />
                        </svg>
                    </button>
                </div>
            </div>

            {/* Mobile Menu - Toggleable */}
            <div
                className={`md:hidden ${
                    isMenuOpen ? 'block' : 'hidden'
                } bg-gray-800 p-4`}
            >
                <div className="flex flex-col space-y-4">
                    <Link to="/" className="text-white hover:text-gray-300">
                        Home
                    </Link>
                    <Link to="/news" className="text-white hover:text-gray-300">
                        News
                    </Link>

                    {/* Conditionally Render Profile or Login/Register for Mobile */}
                    {isAuthenticated ? (
                        <>
                            <Link
                                to="/profile"
                                className="text-white hover:text-gray-300"
                            >
                                Profile
                            </Link>
                            <button
                                onClick={handleLogout}
                                className="text-white hover:text-gray-300"
                            >
                                Logout
                            </button>
                        </>
                    ) : (
                        <>
                            <Link
                                to="/login"
                                className="text-white hover:text-gray-300"
                            >
                                Login
                            </Link>
                            <Link
                                to="/register"
                                className="text-white hover:text-gray-300"
                            >
                                Register
                            </Link>
                        </>
                    )}
                </div>
            </div>
        </nav>
    );
}

export default NavBar;
