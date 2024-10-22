// src/Navbar.jsx
import React from "react";
import { Link, NavLink } from "react-router-dom";

const Navbar = () => {
    return (
        <nav className="bg-gray-800 p-4">
            <div className="container mx-auto flex justify-between items-center">
                <h1 className="text-white text-2xl font-bold">News Scraping</h1>
                <div className="space-x-4">
                    <NavLink
                        to={"/"}
                        className={({ isActive }) =>
                            isActive ? "text-blue-400 hover:text-blue-600" : "text-gray-300 hover:text-white"
                        }
                    >
                        Home
                    </NavLink>
                    <NavLink
                        to={"/news"}
                        // className="text-gray-300 hover:text-white"
                        className={({ isActive }) =>
                            isActive ? "text-blue-400 hover:text-blue-600" : "text-gray-300 hover:text-white"
                        }
                    >
                        News
                    </NavLink>
                </div>
            </div>
        </nav>
    );
};

export default Navbar;
