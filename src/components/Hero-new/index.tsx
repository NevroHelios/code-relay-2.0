import { motion, AnimatePresence } from 'framer-motion';
import { TypeAnimation } from 'react-type-animation';
import Preloader from '../Logo';
import Link from 'next/link';

const Hero = ({ heroTopRef }: { heroTopRef: (node?: Element | null | undefined) => void }) => {
  return (
    <motion.div 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.3 }}
      className="flex min-h-screen w-full flex-col items-center justify-center px-4 py-8 sm:px-6 lg:px-8"
    >
      <AnimatePresence>
        <div id="hero" ref={heroTopRef} className="flex w-full max-w-7xl flex-col justify-center gap-6 sm:gap-8 lg:gap-12">
          <div className="flex w-full flex-col items-center justify-center">
            <motion.div
              className="w-full max-w-[80%] sm:max-w-[60%] lg:max-w-[50%] z-[700]"
              initial={{ opacity: 0, scale: 0.5 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{
                duration: 0.5,
                ease: "easeOut",
              }}
            >
              <Preloader />
            </motion.div>

            <motion.div 
              className="mt-8 text-center"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ 
                delay: 1.2,
                duration: 0.8 
              }}
            >
              <span className="font-pixelate font-bold text-white text-base sm:text-lg md:text-[1.5rem]">
               <span className='uppercase text-4xl text-green-400'>GreenSync</span> turns trash into tokens, tracks carbon karma, and rewards you through decentralized cleanups.
              </span>
            </motion.div>
          </div>

          <motion.div 
            className="mx-auto mt-8 flex w-full justify-center relative z-[9999]"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ 
              delay: 2,
              duration: 0.8 
            }}
          >
            {/* Centered Discord Button */}
            <motion.div 
              className="flex justify-center w-full max-w-xs relative z-[9999]"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <Link href={'/admin-new'} className="group relative flex h-12 w-full items-center justify-center overflow-hidden rounded-xl bg-gradient-to-br from-green-700/80 to-green-700/40 backdrop-blur-sm transition-all duration-300 hover:from-green-900 hover:to-green-600">
                <div className="absolute inset-0 opacity-80 transition-opacity group-hover:opacity-90" />
                <span className="z-[9999] flex items-center font-pixelate text-white text-bold relative">
                  Add your Aadhar
                </span>
              </Link>
            </motion.div>
          </motion.div>
        </div>
      </AnimatePresence>
    </motion.div>
  );
};

export default Hero;