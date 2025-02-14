"use client";

import React, { useState } from "react";
import { GrUpload } from "react-icons/gr";
import { motion } from "framer-motion";
import Link from "next/link"

const Page = () => {
  const [name, setName] = useState("");
  const [surname, setSurname] = useState("");
  const [aadharCard, setAadharCard] = useState<File | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    
  
    setTimeout(() => {
      setIsSubmitting(false);
      console.log({ name, surname, aadharCard });
    }, 4000);
  };

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
      className="min-h-screen flex items-start justify-center bg-white"
    >
      <div className="bg-white p-8 rounded-lg shadow-2xl w-full max-w-lg mx-4"> {/* Increased width to max-w-lg */}
        <motion.h1
          variants={itemVariant}
          className="text-2xl font-bold text-center text-green-600 mb-6"
        >
          USER INFORMATION
        </motion.h1>
        
        {isSubmitting ? (
          <div className="flex items-center justify-center h-64">
            <motion.div
              animate={{ rotate: 360 }}
              transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
              className="w-16 h-16 border-4 border-green-500 border-t-transparent rounded-full"
            />
          </div>
        ) : (
          <form onSubmit={handleSubmit}>
            <motion.div variants={itemVariant} className="mb-6"> 
              <label className="block text-gray-700 text-sm font-bold mb-3"> 
                Name
              </label>
              <input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="w-full px-4 py-3 rounded-lg border-2 focus:border-green-500 focus:outline-none"
                required
              />
            </motion.div>

            <motion.div variants={itemVariant} className="mb-6">
              <label className="block text-gray-700 text-sm font-bold mb-3">
                Surname
              </label>
              <input
                type="text"
                value={surname}
                onChange={(e) => setSurname(e.target.value)}
                className="w-full px-4 py-3 rounded-lg border-2 focus:border-green-500 focus:outline-none"
                required
              />
            </motion.div>

            <motion.div variants={itemVariant}>
              <label className="block text-gray-700 text-sm font-bold mb-3">
                Aadhar Card
              </label>
              <div className="flex items-center space-x-4">
                <label
                  htmlFor="aadharCard"
                  className="cursor-pointer flex flex-col items-center justify-center w-32 h-32 border-2 border-green-500 bg-green-50 rounded-lg hover:bg-green-100 transition-colors"
                >
                  <GrUpload className="text-green-600 text-2xl mb-2" />
                 
                </label>
                <input
                  type="file"
                  id="aadharCard"
                  onChange={(e) => setAadharCard(e.target.files?.[0] || null)}
                  className="hidden"
                  required
                />
                {/* {aadharCard && (
                  <span className="text-sm text-gray-600 truncate max-w-[200px]">
                    {aadharCard.name}
                  </span>
                )} */}
              </div>
            </motion.div>

            <motion.div
              variants={itemVariant}
              className="flex justify-center mt-8"
            >
              <Link href="/admin-new-google"
                
                className="bg-green-600 hover:bg-green-700 text-white font-bold py-3 px-8 rounded-lg transition-all transform hover:scale-105 focus:outline-none"
              >
                Submit
              </Link>
            </motion.div>
          </form>
        )}
      </div>
    </motion.div>
  );
};

export default Page;