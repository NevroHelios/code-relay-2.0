"use client";
import { useRouter } from "next/navigation";
import { useGlitch } from "react-powerglitch";
import Image from "next/image";

import { appglitch } from "@/utils/glitch.util";

const Footer: React.FC = () => {
  const router = useRouter();

  const openPdfInNewTab = () => {
    window.open("/PrisMa.pdf", "_blank");
  };

  const glitch = useGlitch(appglitch);
  return (
    <footer className="flex flex-col mt-10 space-y-10 justify-center backdrop-filter backdrop-blur-md bg-opacity-50 w-full">
      <div className="w-full text-green-700 text-outline font-extrabold absolute top-1/4 transform -translate-y-1/2 z-[-1] text-[4rem] sm:text-[8rem] md:text-[10rem] lg:text-[12rem] xl:text-[18rem] flex flex-row items-center justify-evenly tracking-widest">
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

      <div className="flex justify-center space-x-5">
        <a
          href="https://facebook.com"
          target="_blank"
          rel="noopener noreferrer"
        >
          <svg
            className="w-7 h-7 fill-green-600 hover:fill-white"
            aria-hidden="true"
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 8 19"
          >
            <path
              fillRule="evenodd"
              d="M6.135 3H8V0H6.135a4.147 4.147 0 0 0-4.142 4.142V6H0v3h2v9.938h3V9h2.021l.592-3H5V3.591A.6.6 0 0 1 5.592 3h.543Z"
              clipRule="evenodd"
            />
          </svg>
        </a>

        <a href="https://git.com" target="_blank" rel="noopener noreferrer">
          <svg
            className="w-6 h-6 fill-green-600 hover:fill-white"
            aria-hidden="true"
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 20 20"
          >
            <path
              fillRule="evenodd"
              d="M10 .333A9.911 9.911 0 0 0 6.866 19.65c.5.092.678-.215.678-.477 0-.237-.01-1.017-.014-1.845-2.757.6-3.338-1.169-3.338-1.169a2.627 2.627 0 0 0-1.1-1.451c-.9-.615.07-.6.07-.6a2.084 2.084 0 0 1 1.518 1.021 2.11 2.11 0 0 0 2.884.823c.044-.503.268-.973.63-1.325-2.2-.25-4.516-1.1-4.516-4.9A3.832 3.832 0 0 1 4.7 7.068a3.56 3.56 0 0 1 .095-2.623s.832-.266 2.726 1.016a9.409 9.409 0 0 1 4.962 0c1.89-1.282 2.717-1.016 2.717-1.016.366.83.402 1.768.1 2.623a3.827 3.827 0 0 1 1.02 2.659c0 3.807-2.319 4.644-4.525 4.889a2.366 2.366 0 0 1 .673 1.834c0 1.326-.012 2.394-.012 2.72 0 .263.18.572.681.475A9.911 9.911 0 0 0 10 .333Z"
              clipRule="evenodd"
            />
          </svg>
        </a>
        <a href="https://discord.com" target="_blank" rel="noopener noreferrer">
          <svg
            className="w-7 h-7 fill-green-600 hover:fill-white"
            aria-hidden="true"
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 21 16"
          >
            <path d="M16.942 1.556a16.3 16.3 0 0 0-4.126-1.3 12.04 12.04 0 0 0-.529 1.1 15.175 15.175 0 0 0-4.573 0 11.585 11.585 0 0 0-.535-1.1 16.274 16.274 0 0 0-4.129 1.3A17.392 17.392 0 0 0 .182 13.218a15.785 15.785 0 0 0 4.963 2.521c.41-.564.773-1.16 1.084-1.785a10.63 10.63 0 0 1-1.706-.83c.143-.106.283-.217.418-.33a11.664 11.664 0 0 0 10.118 0c.137.113.277.224.418.33-.544.328-1.116.606-1.71.832a12.52 12.52 0 0 0 1.084 1.785 16.46 16.46 0 0 0 5.064-2.595 17.286 17.286 0 0 0-2.973-11.59ZM6.678 10.813a1.941 1.941 0 0 1-1.8-2.045 1.93 1.93 0 0 1 1.8-2.047 1.919 1.919 0 0 1 1.8 2.047 1.93 1.93 0 0 1-1.8 2.045Zm6.644 0a1.94 1.94 0 0 1-1.8-2.045 1.93 1.93 0 0 1 1.8-2.047 1.918 1.918 0 0 1 1.8 2.047 1.93 1.93 0 0 1-1.8 2.045Z" />
          </svg>
        </a>
        <a href="https://twitter.com" target="_blank" rel="noopener noreferrer">
          <svg
            className="w-7 h-7 fill-green-600 hover:fill-white"
            aria-hidden="true"
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 20 17"
          >
            <path
              fillRule="evenodd"
              d="M20 1.892a8.178 8.178 0 0 1-2.355.635 4.074 4.074 0 0 0 1.8-2.235 8.344 8.344 0 0 1-2.605.98A4.13 4.13 0 0 0 13.85 0a4.068 4.068 0 0 0-4.1 4.038 4 4 0 0 0 .105.919A11.705 11.705 0 0 1 1.4.734a4.006 4.006 0 0 0 1.268 5.392 4.165 4.165 0 0 1-1.859-.5v.05A4.057 4.057 0 0 0 4.1 9.635a4.19 4.19 0 0 1-1.856.07 4.108 4.108 0 0 0 3.831 2.807A8.36 8.36 0 0 1 0 14.184 11.732 11.732 0 0 0 6.291 16 11.502 11.502 0 0 0 17.964 4.5c0-.177 0-.35-.012-.523A8.143 8.143 0 0 0 20 1.892Z"
              clipRule="evenodd"
            />
          </svg>
        </a>
      </div>
      {/* <div className='text-white font-pixelate text-center text-md hover:text-md  hover:font-bold hover:text-white text-sm" ref={glitch.ref}' ref={glitch.ref}> <Link href="/Hackathonbrochure.pdf" target={'_blank'}>
    Sponsorship Brochure
      </Link></div> */}
      <hr className="my-8 border-[#092b0b] border-[0.5px] mr-20 ml-20" />
      <p className="text-center text-white/60 font-medium py-4">
        &copy; {new Date().getFullYear()} Binary. All rights reserved.
      </p>
    </footer>
  );
};

export default Footer;