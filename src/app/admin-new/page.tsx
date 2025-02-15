"use client";

import React, { useState } from "react";
import { FaUpload } from "react-icons/fa";
import { motion } from "framer-motion";

const Page = () => {
  const [name, setName] = useState("");
  const [surname, setSurname] = useState("");
  const [aadharCard, setAadharCard] = useState<File | null>(null);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Handle form submission logic here
    console.log({ name, surname, aadharCard });
  };

  // Animation variants for the container and form elements
  const containerVariant = {
    hidden: { opacity: 0, y: -20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.6, ease: "easeOut" },
    },
  };

  const itemVariant = {
    hidden: { opacity: 0, x: -20 },
    visible: {
      opacity: 1,
      x: 0,
      transition: { duration: 0.4, ease: "easeOut" },
    },
  };

  return (
    <motion.div
      initial="hidden"
      animate="visible"
      variants={containerVariant}
      className="min-h-screen flex items-center justify-center  font-play"
    >
      <div className=" p-8 bg-black rounded shadow-lg w-full max-w-md">
        <motion.h1
          variants={itemVariant}
          className="text-2xl font-bold text-center text-green-600 mb-6"
        >
          USER INFORMATION
        </motion.h1>
        <form onSubmit={handleSubmit}>
          <motion.div variants={itemVariant} className="mb-4">
            <label
              className="block text-gray-700 text-sm font-bold mb-2"
              htmlFor="name"
            >
              Name
            </label>
            <input
              type="text"
              id="name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              required
            />
          </motion.div>
          <motion.div variants={itemVariant} className="mb-4">
            <label
              className="block text-gray-700 text-sm font-bold mb-2"
              htmlFor="surname"
            >
              Surname
            </label>
            <input
              type="text"
              id="surname"
              value={surname}
              onChange={(e) => setSurname(e.target.value)}
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              required
            />
          </motion.div>
          <motion.div variants={itemVariant} className="mb-4">
            <label
              className="block text-gray-700 text-sm font-bold mb-2"
              htmlFor="aadharCard"
            >
              Aadhar Card
            </label>
            <div className="flex items-center">
              <label
                htmlFor="aadharCard"
                className="cursor-pointer block w-32 p-4 border-2 border-green-500 bg-green-100 rounded text-center"
              >
                
                <FaUpload
                  className="text-green-600 mt-2 mx-auto"
                  size="1.5em"
                />
              </label>
              <input
                type="file"
                id="aadharCard"
                onChange={(e) =>
                  setAadharCard(e.target.files ? e.target.files[0] : null)
                }
                className="hidden"
                required
              />
              {aadharCard && (
                <span className="ml-2 text-gray-700">{aadharCard.name}</span>
              )}
            </div>
          </motion.div>
          <motion.div
            variants={itemVariant}
            className="flex items-center justify-center"
          >
            <button
              type="submit"
              className="bg-green-600 hover:bg-green-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
            >
              Submit
            </button>
          </motion.div>
        </form>
      </div>
    </motion.div>
  );
};

export default Page;
