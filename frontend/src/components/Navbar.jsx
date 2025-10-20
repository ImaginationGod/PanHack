import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";

const Navbar = () => {
    const [isLoggedIn, setIsLoggedIn] = useState(!!localStorage.getItem("token"));
    const navigate = useNavigate();

    // Poll localStorage every 500ms to detect login/logout in same tab
    useEffect(() => {
        const interval = setInterval(() => {
            const token = localStorage.getItem("token");
            setIsLoggedIn(!!token);
        }, 500);

        return () => clearInterval(interval);
    }, []);

    const handleLogout = () => {
        localStorage.removeItem("token");
        setIsLoggedIn(false);
        navigate("/login");
    };

    return (
        <nav className="bg-gray-800 text-white p-4 flex justify-between">
            <div className="text-xl font-bold">
                <Link to="/">MyApp</Link>
            </div>
            <div className="space-x-4">
                {!isLoggedIn && (
                    <>
                        <Link to="/login">Login</Link>
                        <Link to="/">Register</Link>
                    </>
                )}
                {isLoggedIn && (
                    <>
                        <Link to="/upload">Upload Resume</Link>
                        <button
                            onClick={handleLogout}
                            className="bg-red-600 px-3 py-1 rounded"
                        >
                            Logout
                        </button>
                    </>
                )}
            </div>
        </nav>
    );
};

export default Navbar;
