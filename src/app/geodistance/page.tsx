"use client";

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FiCamera, FiRefreshCcw, FiCheck, FiPause, FiPlay, FiX, FiRotateCw } from 'react-icons/fi';
import { QrReader } from 'react-qr-reader';

export default function QRScanner() {
  const [data, setData] = useState<string | null>(null);
  const [isScanning, setIsScanning] = useState(false);
  const [isPaused, setIsPaused] = useState(false);
  const [facingMode, setFacingMode] = useState<'environment' | 'user'>('environment');

  const handleScan = (result: any) => {
    if (result) {
      setData(result?.text);
      setIsScanning(false);
    }
  };

  const handleError = (err: any) => {
    console.error("QR Scanning error:", err);
  };

  const startScanning = () => {
    setIsScanning(true);
    setData(null);
    setIsPaused(false);
  };

  const togglePause = () => {
    setIsPaused(!isPaused);
  };

  const stopScanning = () => {
    setIsScanning(false);
    setIsPaused(false);
  };

  const toggleCamera = () => {
    setFacingMode(prev => prev === 'environment' ? 'user' : 'environment');
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 to-black p-4 flex items-center justify-center">
      <div className="max-w-md w-full">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-black/40 backdrop-blur-xl rounded-2xl p-4 shadow-xl border border-green-500/20"
        >
          <AnimatePresence mode="wait">
            {!isScanning && !data && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="flex justify-center py-8"
              >
                <motion.button
                  whileTap={{ scale: 0.95 }}
                  onClick={startScanning}
                  className="px-8 py-4 bg-gradient-to-r from-green-500 to-green-600 
                    text-white rounded-lg flex items-center gap-3 
                    hover:from-green-600 hover:to-green-700 transition-all
                    shadow-lg hover:shadow-green-500/20"
                >
                  <FiCamera className="text-2xl" />
                  <span className="text-lg font-medium">Start QR Scanner</span>
                </motion.button>
              </motion.div>
            )}

            {isScanning && !data && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="space-y-4"
              >
                <div className="relative rounded-lg overflow-hidden">
                  <QrReader
                    constraints={{ facingMode }}
                    onResult={handleScan}
                    onError={handleError}
                    className="w-full"
                    scanDelay={isPaused ? undefined : 500}
                    videoStyle={{ objectFit: 'cover' }}
                    videoContainerStyle={{ 
                      paddingTop: '100%',
                      background: 'black',
                      borderRadius: '0.5rem'
                    }}
                  />
                  <div className="absolute inset-0 border-2 border-green-500/50 rounded-lg">
                    <div className="absolute inset-[20%] border-2 border-green-500 rounded-lg"></div>
                  </div>
                  
                  {/* Camera Controls */}
                  <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex gap-4">
                    <motion.button
                      whileTap={{ scale: 0.95 }}
                      onClick={togglePause}
                      className="p-3 bg-black/70 backdrop-blur-sm rounded-full
                        text-white hover:bg-black/90 transition-colors border border-green-500/30"
                    >
                      {isPaused ? (
                        <FiPlay className="text-xl text-green-500" />
                      ) : (
                        <FiPause className="text-xl text-green-500" />
                      )}
                    </motion.button>
                    <motion.button
                      whileTap={{ scale: 0.95 }}
                      onClick={toggleCamera}
                      className="p-3 bg-black/70 backdrop-blur-sm rounded-full
                        text-white hover:bg-black/90 transition-colors border border-green-500/30"
                    >
                      <FiRotateCw className="text-xl text-green-500" />
                    </motion.button>
                    <motion.button
                      whileTap={{ scale: 0.95 }}
                      onClick={stopScanning}
                      className="p-3 bg-black/70 backdrop-blur-sm rounded-full
                        text-white hover:bg-black/90 transition-colors border border-red-500/30"
                    >
                      <FiX className="text-xl text-red-500" />
                    </motion.button>
                  </div>
                </div>
                <p className="text-center text-green-400 text-sm">
                  {isPaused ? "Scanner Paused" : `Scanning with ${facingMode === 'environment' ? 'back' : 'front'} camera...`}
                </p>
              </motion.div>
            )}

            {data && (
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                className="space-y-4"
              >
                <div className="p-4 bg-green-500/10 rounded-lg border border-green-500/30">
                  <div className="flex items-center gap-2 mb-2">
                    <FiCheck className="text-green-500" />
                    <h3 className="text-green-400 font-medium">QR Code Detected:</h3>
                  </div>
                  <p className="text-gray-300 break-all font-mono text-sm">{data}</p>
                </div>
                <button
                  onClick={startScanning}
                  className="w-full px-4 py-2 bg-green-600 text-white rounded-lg 
                    flex items-center justify-center gap-2 hover:bg-green-700 transition-colors"
                >
                  <FiRefreshCcw className="text-xl" />
                  Scan Another Code
                </button>
              </motion.div>
            )}
          </AnimatePresence>
        </motion.div>
      </div>
    </div>
  );
}
