"use client";

import React, { useState, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";
import { useDropzone } from "react-dropzone";
import { FiUpload, FiFile, FiX, FiCheck, FiAlertCircle, FiCheckCircle } from "react-icons/fi";
import { useRouter } from 'next/navigation';

interface FormData {
  name: string;
  surname: string;
  aadharCard: File | null;
}

const ErrorPopup: React.FC<{ message: string; onClose: () => void }> = ({ message, onClose }) => (
  <motion.div
    initial={{ opacity: 0, y: 50 }}
    animate={{ opacity: 1, y: 0 }}
    exit={{ opacity: 0, y: 50 }}
    className="fixed bottom-4 right-4 bg-red-500/90 text-white px-6 py-4 rounded-lg shadow-lg backdrop-blur-sm flex items-center gap-3"
  >
    <FiAlertCircle className="text-2xl" />
    <p>{message}</p>
    <button onClick={onClose} className="ml-4 hover:text-red-200">
      <FiX />
    </button>
  </motion.div>
);

const SuccessPopup: React.FC = () => (
  <motion.div
    initial={{ opacity: 0, y: 50 }}
    animate={{ opacity: 1, y: 0 }}
    exit={{ opacity: 0, y: 50 }}
    className="fixed bottom-4 right-4 bg-green-500/90 text-white px-6 py-4 rounded-lg shadow-lg backdrop-blur-sm flex items-center gap-3"
  >
    <motion.div
      initial={{ scale: 0 }}
      animate={{ scale: 1 }}
      transition={{ type: "spring", stiffness: 200 }}
    >
      <FiCheckCircle className="text-2xl" />
    </motion.div>
    <p>Verification successful!</p>
  </motion.div>
);

const Page = () => {
  const router = useRouter();
  const [formData, setFormData] = useState<FormData>({
    name: "",
    surname: "",
    aadharCard: null,
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [verificationStatus, setVerificationStatus] = useState<'idle' | 'success' | 'error'>('idle');
  const [dragActive, setDragActive] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);

  const onDrop = useCallback((acceptedFiles: File[]) => {
    if (acceptedFiles[0]) {
      setFormData(prev => ({
        ...prev,
        aadharCard: acceptedFiles[0]
      }));
    }
  }, []);

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: {
      'image/*': ['.jpeg', '.jpg', '.png'],
      'application/pdf': ['.pdf']
    },
    maxSize: 5242880, // 5MB
    multiple: false
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setVerificationStatus('idle');
    setShowSuccess(false);

    try {
      // Simulate API call with random success/failure
      await new Promise(resolve => setTimeout(resolve, 2000));
      const isVerified = Math.random() > 0.5; // Simulate random verification result

      if (!isVerified) {
        throw new Error("Verification failed. Please check your documents and try again.");
      }

      setVerificationStatus('success');
      setShowSuccess(true);
      // Redirect after 2 seconds on success
      setTimeout(() => {
        router.push('/login');
      }, 2000);

    } catch (error) {
      setVerificationStatus('error');
      setError(error instanceof Error ? error.message : "An unexpected error occurred");
    } finally {
      setIsSubmitting(false);
    }
  };

  const removeFile = () => {
    setFormData(prev => ({
      ...prev,
      aadharCard: null
    }));
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="min-h-screen flex items-center justify-center p-4 font-play bg-gradient-to-br "
    >
      <div className="w-full max-w-md p-8 bg-black/40 backdrop-blur-xl rounded-2xl shadow-xl border border-green-500/20">
        <motion.h1
          initial={{ y: -20 }}
          animate={{ y: 0 }}
          className="text-3xl font-bold text-center text-green-400 mb-8"
        >
          Verification Portal
        </motion.h1>

        <AnimatePresence mode="wait">
          {isSubmitting ? (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="flex flex-col items-center justify-center h-64 space-y-4"
            >
              <div className="w-16 h-16 border-4 border-green-500 border-t-transparent rounded-full animate-spin" />
              <p className="text-green-400">Verifying your information...</p>
            </motion.div>
          ) : (
            <motion.form
              onSubmit={handleSubmit}
              className="space-y-6"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
            >
              {/* Input fields */}
              <div className="space-y-4">
                <input
                  type="text"
                  value={formData.name}
                  onChange={(e) => setFormData(prev => ({ ...prev, name: e.target.value }))}
                  placeholder="Enter your name"
                  className={`w-full px-4 py-3 rounded-lg bg-black/20 border 
                    ${verificationStatus === 'error' 
                      ? 'border-red-500/50 text-red-400' 
                      : 'border-green-500/30 text-green-400'} 
                    placeholder-green-600/50 focus:outline-none focus:border-green-500 transition-colors`}
                  required
                />
                <input
                  type="text"
                  value={formData.surname}
                  onChange={(e) => setFormData(prev => ({ ...prev, surname: e.target.value }))}
                  placeholder="Enter your surname"
                  className={`w-full px-4 py-3 rounded-lg bg-black/20 border 
                    ${verificationStatus === 'error' 
                      ? 'border-red-500/50 text-red-400' 
                      : 'border-green-500/30 text-green-400'} 
                    placeholder-green-600/50 focus:outline-none focus:border-green-500 transition-colors`}
                  required
                />
              </div>

              {/* Drag & Drop */}
              <div className="mt-6">
                <div
                  {...getRootProps()}
                  className={`border-2 border-dashed rounded-lg p-6 transition-colors ${
                    isDragActive 
                      ? 'border-green-500 bg-green-500/10' 
                      : verificationStatus === 'error'
                        ? 'border-red-500/50 bg-red-500/5'
                        : 'border-green-500/50'
                  }`}
                >
                  <input {...getInputProps()} />
                  <div className="flex flex-col items-center space-y-4">
                    <FiUpload className="text-3xl text-green-500" />
                    <p className="text-center text-green-400">
                      {isDragActive
                        ? "Drop your files here"
                        : "Drag & drop your Aadhar card here, or click to select"}
                    </p>
                    <p className="text-xs text-green-600">
                      Supported formats: JPEG, PNG, PDF (max 5MB)
                    </p>
                  </div>
                </div>
              </div>

              {/* Status Indicator */}
              {verificationStatus === 'error' && (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="mt-4 p-3 bg-red-500/10 border border-red-500/30 rounded-lg"
                >
                  <p className="text-red-400 text-sm flex items-center gap-2">
                    <FiAlertCircle />
                    Verification failed. Please check your information and try again.
                  </p>
                </motion.div>
              )}

              {/* Success Indicator */}
              {verificationStatus === 'success' && (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="mt-4 p-3 bg-green-500/10 border border-green-500/30 rounded-lg"
                >
                  <p className="text-green-400 text-sm flex items-center gap-2">
                    <motion.div
                      initial={{ rotate: -180, opacity: 0 }}
                      animate={{ rotate: 0, opacity: 1 }}
                      transition={{ duration: 0.5, type: "spring" }}
                    >
                      <FiCheckCircle />
                    </motion.div>
                    Verification successful! Redirecting to login...
                  </p>
                </motion.div>
              )}

              {/* File Preview */}
              {formData.aadharCard && (
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="flex items-center justify-between p-3 bg-green-500/10 rounded-lg border border-green-500/30"
                >
                  <div className="flex items-center space-x-3">
                    <FiFile className="text-green-500" />
                    <span className="text-green-400 text-sm truncate">
                      {formData.aadharCard.name}
                    </span>
                  </div>
                  <button
                    type="button"
                    onClick={removeFile}
                    className="text-red-400 hover:text-red-500"
                  >
                    <FiX />
                  </button>
                </motion.div>
              )}

              <div className="flex justify-end space-x-4 mt-8">
                <Link
                  href="/login"
                  className="px-6 py-2 rounded-lg bg-gray-800 text-gray-300 hover:bg-gray-700 transition-colors"
                >
                  Cancel
                </Link>
                <button
                  type="submit"
                  disabled={!formData.aadharCard || !formData.name || !formData.surname || isSubmitting}
                  className={`px-6 py-2 rounded-lg transition-all flex items-center space-x-2 ${
                    verificationStatus === 'success'
                      ? 'bg-green-500 hover:bg-green-600'
                      : 'bg-green-600 hover:bg-green-700'
                  } text-white disabled:opacity-50 disabled:cursor-not-allowed`}
                >
                  <span>{verificationStatus === 'success' ? 'Verified' : 'Submit'}</span>
                  {verificationStatus === 'success' ? (
                    <motion.div
                      initial={{ scale: 0 }}
                      animate={{ scale: 1 }}
                      transition={{ type: "spring", stiffness: 200 }}
                    >
                      <FiCheckCircle />
                    </motion.div>
                  ) : (
                    <FiCheck />
                  )}
                </button>
              </div>
            </motion.form>
          )}
        </AnimatePresence>
      </div>

      {/* Success Popup */}
      <AnimatePresence>
        {showSuccess && <SuccessPopup />}
      </AnimatePresence>

      {/* Error Popup */}
      <AnimatePresence>
        {error && (
          <ErrorPopup 
            message={error} 
            onClose={() => setError(null)} 
          />
        )}
      </AnimatePresence>
    </motion.div>
  );
};

export default Page;