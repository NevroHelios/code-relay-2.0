"use client";

import { useEffect, useState, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";

export default function Preloader() {
    const [isVisible, setIsVisible] = useState(true);
    const el = useRef(null);

    return (
        <div className="flex items-center justify-center h-full w-full z-[700]">
            <AnimatePresence>
                {isVisible && (
                    <motion.div
                        ref={el}
                        initial={{ opacity: 1 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        transition={{ duration: 1 }}
                        className="flex items-center justify-center w-full h-full"
                    >
                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            transition={{ duration: 1 }}
                            className=" h-[400px] flex items-center justify-center"
                        >
                            <motion.svg 
                                xmlns="http://www.w3.org/2000/svg" 
                                viewBox="0 0 1817.33 1144"
                                className="w-full h-full"
                            >
                                <defs>
                                    <filter id="shadow">
                                        <feDropShadow 
                                            dx="2" 
                                            dy="2" 
                                            stdDeviation="3" 
                                            floodColor="black" 
                                            floodOpacity="0.6"
                                        />
                                    </filter>
                                    <filter id="glow">
                                        <feGaussianBlur stdDeviation="12" result="blackBlur"/>
                                        <feFlood floodColor="black" floodOpacity="0.5" result="blackFlood"/>
                                        <feComposite in="blackFlood" in2="blackBlur" operator="in" result="blackGlow"/>
                                        <feMerge>
                                            <feMergeNode in="blackGlow"/>
                                            <feMergeNode in="SourceGraphic"/>
                                        </feMerge>
                                    </filter>
                                </defs>
                                <style>
                                    {`.cls-1 { 
                                        fill: #89fda4; 
                                        filter: url(#shadow) url(#glow);
                                    }`}
                                </style>
                                <motion.g 
                                    id="line"
                                    initial={{ scaleX: 0 }}
                                    animate={{ scaleX: 1 }}
                                    transition={{ duration: 0.5, delay: 1 }}
                                >
                                    <path className="cls-1" d="M859,401.38q81.4,0,162.82,0c15.4,0,31.76.22,32.13,21.07.36,20.67-15.48,22.19-31.2,22.18q-165.29,0-330.56,0c-16.31,0-30.76-2.77-29.48-23.6,1.08-17.7,14.38-19.61,28.54-19.6Q775.11,401.48,859,401.38Z" />
                                </motion.g>
                                <motion.g 
                                    id="top"
                                    initial={{ y: -50, opacity: 0 }}
                                    animate={{ y: 0, opacity: 1.5 }}
                                    transition={{ duration: 0.5, delay: 1 }}
                                >
                                    <path className="cls-1" d="M681.24,383.24c-11.16-.14-20.55-4.54-22.89-17.07-2.75-14.69,4.72-23.49,18.72-27.05,31.82-8.07,63.5-16.74,95.56-23.7,13.81-3,24.34-5.7,18.83-23.11a4.63,4.63,0,0,1,0-2.45c9.36-37,45.1-25.37,68.45-36.23,14.87-6.91,27.9.59,31.75,17.25,3.31,14.28,10.72,12.56,21.62,9.64,30.91-8.29,62.26-14.95,93.18-23.21,15-4,27.14-1.77,31.88,13.63,4.79,15.61-4,24.74-19.15,28.51Q853,340.82,686.88,382.26C685.29,382.66,683.64,382.83,681.24,383.24Z" />
                                </motion.g>
                                <motion.g 
                                    id="dustbin"
                                    initial={{ scale: 0 }}
                                    animate={{ scale: 1 }}
                                    transition={{ 
                                        duration: 0.5, 
                                        delay: 0.5,
                                        type: "spring",
                                        stiffness: 200
                                    }}
                                >
                                    <path className="cls-1" d="M857.87,461.39c51.8,0,103.62.66,155.4-.39,16.92-.35,22.68,3.58,21.39,21.52-7.6,105.7-14.17,211.48-21,317.23-1.41,21.79-12.42,32.84-34.58,32.81-80.58-.11-161.16,0-241.75-.11-21.53,0-32.92-9.75-34.31-32.59-6.45-106.61-13.28-213.21-21.14-319.74-1.2-16.24,3.43-19.2,18.11-19C752.62,461.84,805.25,461.4,857.87,461.39ZM969.6,534l1,0c0-10.68.08-21.35,0-32-.08-7.7-4.24-12.64-11.73-13.24s-12.64,3.32-13.89,11a220.21,220.21,0,0,0-2.65,22q-7.41,120.43-14.65,240.88c-.63,10.27-1.27,21.44,12.25,22.53,13.36,1.08,14.89-9.35,15.53-20.08Q962.29,649.52,969.6,534ZM788.18,639.85l-4.86,0c-2-43.44-4.06-86.87-5.73-130.32-.41-10.83-2.24-21.2-15.2-20.42-11,.66-13.21,10.08-12.73,20.21Q755.74,637.12,761.48,765c.46,10.15.94,21.5,14.91,20.49,14.25-1,11.8-13,11.8-22.67Q788.16,701.32,788.18,639.85Zm58-4.38c0,43.63.12,87.26-.09,130.89,0,9.9,1.18,19.55,13,19.63s13.44-9.46,13.43-19.41q-.12-128.43,0-256.84c0-10.28-.38-21.55-14.37-20.76-12.1.68-12.11,11.16-12.1,20.54Q846.24,572.49,846.22,635.47Z" />
                                </motion.g>
                                <motion.g 
                                    id="circle"
                                    initial={{ pathLength: 0, opacity: 0, rotate: -40 }}
                                    animate={{ pathLength: 1, opacity: 1 ,rotate: 0}}
                                    transition={{ 
                                        duration: 1.5,
                                        delay: 1.7,
                                        ease: "easeInOut"
                                    }}
                                >
                                    <path className="cls-1" d="M1378.82,638.66c-65.21,33-119.91,80.52-175,127.38-33.23,28.28-64.73,58.54-92.68,92.22-6.88,8.3-12.9,18.07-26,14.3-14.14-4.06-14.56-16.93-15.62-28-4.9-51.15,5.5-100.06,25.61-146.69,49.12-113.91,134.64-186.16,253.93-219.34C1440.72,453,1534,440,1629,437.53c21.83-.58,29.93,2.44,24.47,28.2-30,141.25-72.87,276.89-165.08,391.46-57.44,71.38-130.56,117-223.77,126-28.27,2.71-56,0-82.46-10.31-11.86-4.63-20.41-3.85-31.43,3.32-313.12,203.64-720.7,36.36-801.27-328.54C286.87,364,483.25,74.3,770.11,27.16c244.79-40.23,485,92.27,573.78,316.26,5.37,13.55,9.41,26.54-.06,39.72-7.28,10.14-17.45,15.41-29.75,14.09-15.58-1.67-24.14-12-29.76-26.06-23.85-59.65-59-111.8-105-156.67-162.95-159-420.47-176.6-597.39-33.4C432,302.41,372.11,463.74,419.22,652.21c46.74,187,172.69,301.68,362.15,338.44,150.21,29.14,283.64-15.24,397.45-115.54,69.24-61,131.72-129,185.9-204.05,6.64-9.2,14.68-17.88,16.79-29.75q1.18-2.25,2.39-4.48Z" />
                                </motion.g>
                            </motion.svg>
                        </motion.div>
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    );
}