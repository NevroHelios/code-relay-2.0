"use client";

import React, { useState } from "react";
import { FaBell, FaShareAlt, FaGlobe, FaBars } from "react-icons/fa";
import { navbarItems, dropdownItems } from "@/utilis/navbar";

const Navbar = () => {
  const [dropdownOpen, setDropdownOpen] = useState(false);

  const toggleDropdown = () => {
    setDropdownOpen(!dropdownOpen);
  };

  return (
    <nav className="w-full z-[100] sticky top-0 text-black shadow-md">
      <div className="container mx-auto flex justify-between items-center p-4">
        {/* Left Side: Logo & Nav Items */}
        <div className="flex items-center space-x-6">
          <img src="/logo.png" alt="Website Logo" className="h-10" />
          <div className="hidden md:flex space-x-6">
            {navbarItems.map((item, index) => (
              <a
                key={index}
                href={item.link}
                className="text-gray-700 hover:text-blue-600 transition duration-300"
              >
                {item.name}
              </a>
            ))}
          </div>
        </div>

        {/* Right Side: Search & Icons */}
        <div className="flex items-center space-x-4">
          <input
            type="text"
            placeholder="Search..."
            className="border border-gray-300 rounded-md px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-400"
          />
          <FaBell className="text-gray-600 hover:text-blue-600 cursor-pointer text-lg" />
          <FaShareAlt className="text-gray-600 hover:text-blue-600 cursor-pointer text-lg" />
          <FaGlobe className="text-gray-600 hover:text-blue-600 cursor-pointer text-lg" />
          <FaBars
            onClick={toggleDropdown}
            className="cursor-pointer text-lg md:hidden"
          />
        </div>
      </div>

      {/* Dropdown for Mobile Menu */}
      {dropdownOpen && (
        <div className="absolute right-4 mt-2 w-48 bg-white shadow-lg rounded-lg overflow-hidden transition-all duration-300 ease-in-out md:hidden">
          {dropdownItems.map((item, index) => (
            <a
              key={index}
              href={item.link}
              className="block px-4 py-3 text-gray-700 hover:bg-gray-100"
            >
              {item.name}
            </a>
          ))}
        </div>
      )}
    </nav>
  );
};

export default Navbar;