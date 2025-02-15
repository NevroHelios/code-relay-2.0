"use client";
import { useRouter } from "next/navigation";
import { useGlitch } from "react-powerglitch";
import Image from "next/image";

import { appglitch } from "@/utils/glitch.util";
import { FaDiscord, FaGithub, FaLinkedin, FaTwitter } from "react-icons/fa";

const Footer: React.FC = () => {
  const router = useRouter();

  const openPdfInNewTab = () => {
    window.open("/PrisMa.pdf", "_blank");
  };

  const glitch = useGlitch(appglitch);
  return (
    <footer className="flex flex-col py-10 mt-10 space-y-10 justify-center backdrop-filter backdrop-blur-md bg-opacity-50 w-full">
      <div className="w-full text-green-700/20 text-outline font-extrabold absolute top-1/4 transform -translate-y-1/2 z-[-1] text-[3rem] sm:text-[3rem] md:text-[4rem] lg:text-[7rem] xl:text-[10rem] flex flex-row items-center justify-evenly tracking-widest uppercase">
        GreenSync
      </div>

      <div className="mx-auto max-w-[200px] w-[35%]  justify-center items-center mt-6">
        {/* <Image className="glitch" src={logo} alt="Binary Hackathon" /> */}
      </div>

      {/* not needed already visible in navbar */}

     {/* <nav className="flex justify-center flex-wrap gap-6 text-white font-sm mt-8 font-pixelate">
        <Link
          className=" gap-5 w-[84px] bg-black/0 text-white text-md hover:text-md font-pixelate hover:font-bold hover:text-white rounded-none flex justify-center text-sm"
          ref={glitch.ref}
          href="#hero"
        >
          Home
        </a>
        <Link
          className="gap-5 w-[84px] bg-black/0 text-white text-md hover:text-md font-pixelate hover:font-bold hover:text-white rounded-none flex justify-center text-sm"
          ref={glitch.ref}
          href="#about"
        >
          About
        </a>
        <Link
          className="gap-5 w-[84px] bg-black/0 text-white text-md hover:text-md font-pixelate hover:font-bold hover:text-white rounded-none flex justify-center text-sm"
          ref={glitch.ref}
          href="#timeline"
        >
          Timeline
        </a>
        <Link
          className="gap-5 w-[84px] bg-black/0 text-white text-md hover:text-md font-pixelate hover:font-bold hover:text-white rounded-none flex justify-center text-sm"
          ref={glitch.ref}
          href="#track"
        >
          Tracks
        </a>
        <Link
          className="gap-5 w-[84px] bg-black/0 text-white text-md hover:text-md font-pixelate hover:font-bold hover:text-white rounded-none flex justify-center text-sm"
          ref={glitch.ref}
          href="#prizes"
        >
          Prizes
        </a>
        <Link
          className="gap-5 w-[84px] bg-black/0 text-white text-md hover:text-md font-pixelate hover:font-bold hover:text-white rounded-none flex justify-center text-sm"
          ref={glitch.ref}
          href="#mentors"
        >
          Mentors
        </a>
        <Link
          className="gap-5 w-[84px] bg-black/0 text-white text-md hover:text-md font-pixelate hover:font-bold hover:text-white rounded-none flex justify-center text-sm"
          ref={glitch.ref}
          href="#team"
        >
          Team
        </a>
        <a
          className="gap-5 w-[84px] bg-black/0 text-white text-md hover:text-md font-pixelate hover:font-bold hover:text-white rounded-none flex justify-center text-sm"
          ref={glitch.ref}
          href="#faqs"
        >
          Faqs
        </a>
      </nav> */}

      
      {/* <div className='text-white font-pixelate text-center text-md hover:text-md  hover:font-bold hover:text-white text-sm" ref={glitch.ref}' ref={glitch.ref}> <Link href="/Hackathonbrochure.pdf" target={'_blank'}>
    Sponsorship Brochure
      </Link></div> */}
      {/* <hr className="my-8 border-[#092b0b] border-[0.5px] mr-20 ml-20" /> */}
      <div className="flex flex-col items-center justify-center space-y-6">
    <h3 className="text-green-400 font-pixelate text-2xl uppercase font-bold">Connect With Us</h3>
    
    <div className="flex space-x-8">
      <a href="https://github.com" target="_blank" rel="noopener noreferrer" 
         className="text-white hover:text-green-400 transition-colors duration-300">
        <FaGithub size={28} />
      </a>
      <a href="https://twitter.com" target="_blank" rel="noopener noreferrer"
         className="text-white hover:text-green-400 transition-colors duration-300">
        <FaTwitter size={28} />
      </a>
      <a href="https://discord.com" target="_blank" rel="noopener noreferrer"
         className="text-white hover:text-green-400 transition-colors duration-300">
        <FaDiscord size={28} />
      </a>
      <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer"
         className="text-white hover:text-green-400 transition-colors duration-300">
        <FaLinkedin size={28} />
      </a>
    </div>
  </div>
      <p className="text-center text-white/60 font-medium py-4">
        &copy; {new Date().getFullYear()} GreenSync. All rights reserved.
      </p>
    </footer>
  );
};

export default Footer;