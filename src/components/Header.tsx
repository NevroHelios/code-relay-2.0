"use client";

import React, { useState } from "react";
import { FaBell, FaShareAlt, FaGlobe, FaBars } from "react-icons/fa";
import { navbarItems, dropdownItems } from "@/utilis/navbar";
import { motion, AnimatePresence } from "framer-motion";

const Navbar = () => {
  const [dropdownOpen, setDropdownOpen] = useState(false);

  const containerVariants = {
    hidden: { y: -100, opacity: 0 },
    visible: { 
      y: 0, 
      opacity: 1,
      transition: {
        duration: 0.8,
        staggerChildren: 0.1
      }
    }
  };

  const itemVariants = {
    hidden: { y: -20, opacity: 0 },
    visible: { 
      y: 0, 
      opacity: 1,
      transition: { duration: 0.5 }
    }
  };

  return (
    <motion.nav
      variants={containerVariants}
      initial="hidden"
      animate="visible"
      className="fixed top-0 left-0 right-0 z-[100] bg-transparent"
    >
      <div className="container mx-auto flex justify-between items-center p-6">
        {/* Logo */}
        <motion.div
          variants={itemVariants}
          className="text-green-500 text-3xl font-bold"
        >
          GreenSync
        </motion.div>

        {/* Nav Items */}
        <div className="hidden md:flex items-center space-x-8">
          {navbarItems.map((item, index) => (
            <motion.a
              key={index}
              variants={itemVariants}
              whileHover={{ scale: 1.1 }}
              href={item.link}
              className="nav-item text-green-500 hover:text-green-400 transition-colors text-lg"
            >
              {item.name}
            </motion.a>
          ))}
          
          {/* Icons */}
          <motion.div
            variants={itemVariants}
            className="flex items-center space-x-4"
          >
            <motion.div whileHover={{ scale: 1.2 }}>
              <FaBell className="text-green-500 hover:text-green-400 cursor-pointer" />
            </motion.div>
            <motion.div whileHover={{ scale: 1.2 }}>
              <FaShareAlt className="text-green-500 hover:text-green-400 cursor-pointer" />
            </motion.div>
            <motion.div whileHover={{ scale: 1.2 }}>
              <FaGlobe className="text-green-500 hover:text-green-400 cursor-pointer" />
            </motion.div>
          </motion.div>
        </div>

        <motion.div
          variants={itemVariants}
          whileHover={{ scale: 1.1 }}
          onClick={() => setDropdownOpen(!dropdownOpen)}
          className="md:hidden"
        >
          <FaBars className="text-green-500 text-2xl cursor-pointer" />
        </motion.div>
      </div>

      {/* Mobile Dropdown */}
      <AnimatePresence>
        {dropdownOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="absolute top-full left-0 right-0 bg-white shadow-lg md:hidden"
          >
            {navbarItems.map((item, index) => (
              <motion.a
                key={index}
                variants={itemVariants}
                whileHover={{ backgroundColor: "#f3f4f6" }}
                href={item.link}
                className="block px-6 py-3 text-gray-700"
              >
                {item.name}
              </motion.a>
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </motion.nav>
  );
};

export default Navbar;