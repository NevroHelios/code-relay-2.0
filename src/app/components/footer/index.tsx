"use client";
import React, { useState } from "react";
import Image from "next/image";
// import Parallax from "./Parallax";



const Footer = () => {
  return (
    <div className="sticky bottom-0 -z-10 bg-[#679067]">
      {/* <Parallax offset={50}> */}
      <footer className="flex w-full flex-col justify-center space-y-10 bg-opacity-50 backdrop-blur-md backdrop-filter h-[80vh]">
        {/* <div className="text-outline absolute  z-[-1] flex w-screen  transform flex-row items-center justify-evenly text-[8rem] font-extrabold tracking-widest text-[#444444a2] sm:text-[8rem] md:text-[10rem] lg:text-[13rem] xl:text-[18rem]">
        ZYRO
      </div> */}

        <div className="mx-auto mt-6 w-[35%] max-w-[500px] items-center justify-center">
          <Image
            className="glitch"
            src={"/images/background.jpg"}
            width={100}
            height={100}
            alt="Binary Hackathon"
          />
        </div>

        {/* not needed already visible in navbar */}

        <nav className="flex justify-center flex-wrap gap-6 text-black font-sm mt-8 font-pixelate">
          <a
            className=" gap-5 w-[84px] bg-black/0 text-black text-md hover:text-md font-pixelate hover:font-bold hover:text-black rounded-none flex justify-center text-sm"
            // ref={glitch.ref}
            href="/"
          >
            Home
          </a>
          {/* <a
          className="gap-5 w-[84px] bg-black/0 text-black text-md hover:text-md font-pixelate hover:font-bold hover:text-black rounded-none flex justify-center text-sm"
          // ref={glitch.ref}
          href="#about"
        >
          About
        </a> */}
          <a
            className="gap-5 w-[84px] bg-black/0 text-black text-md hover:text-md font-pixelate hover:font-bold hover:text-black rounded-none flex justify-center text-sm"
            // ref={glitch.ref}
            href="#timeline"
          >
            Timeline
          </a>
          <a
            className="gap-5 w-[84px] bg-black/0 text-black text-md hover:text-md font-pixelate hover:font-bold hover:text-black rounded-none flex justify-center text-sm"
            // ref={glitch.ref}
            href="#events"
          >
            Events
          </a>
          <a
            className="gap-5 w-[84px] bg-black/0 text-black text-md hover:text-md font-pixelate hover:font-bold hover:text-black rounded-none flex justify-center text-sm"
            // ref={glitch.ref}
            href="#prizes"
          >
            Prizes
          </a>
          {/* <a
          className="gap-5 w-[84px] bg-black/0 text-black text-md hover:text-md font-pixelate hover:font-bold hover:text-black rounded-none flex justify-center text-sm"
          // ref={glitch.ref}
          href="#mentors"
        >
          Mentors
        </a> */}
          {/* <a
          className="gap-5 w-[84px] bg-black/0 text-black text-md hover:text-md font-pixelate hover:font-bold hover:text-black rounded-none flex justify-center text-sm"
          // ref={glitch.ref}
          href="#team"
        >
          Team
        </a> */}
          <a
            className="gap-5 w-[84px] bg-black/0 text-black text-md hover:text-md font-pixelate hover:font-bold hover:text-black rounded-none flex justify-center text-sm"
            // ref={glitch.ref}
            href="#faqs"
          >
            Faqs
          </a>
        </nav>
        <div className="text-center text-black">
          {" "}
          <span className="font-bold uppercase text-xl">
            Content us
          </span> <br /> Email: kgec.robotics.club@kgec.edu.in
          <br />
          <br />
          <span className="font-bold uppercase  text-xl">
            For any query ask us:
          </span>{" "}
          <br />{" "}
          <span className="text-xl uppercase ">
            <br /> Sayak Jana: +91 81450 69918 <br /> AJARUL MIAH: +91 731 909
            6784 <br /> AKASH BISWAS: +91 90516 17498
            <br /> Saikat Panda: +91 93394 26745
          </span>
        </div>
        <div className="flex justify-center space-x-5 mb-8">
          <a
            href="https://www.facebook.com/share/15UAy7fnnP/"
            target="_blank"
            rel="noopener noreferrer"
          >
            <svg
              className="h-7 w-7  fill-white hover:fill-white/20"
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

          <a
            href="https://www.instagram.com/kgec_rs?igsh=MTZkenBudm52eTNtYw=="
            target="_blank"
            rel="noopener noreferrer"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              x="0px"
              y="0px"
              width="100"
              height="100"
              viewBox="0 0 50 50"
              className="h-6 w-6 fill-white hover:fill-white/20"
            >
              <path d="M 16 3 C 8.83 3 3 8.83 3 16 L 3 34 C 3 41.17 8.83 47 16 47 L 34 47 C 41.17 47 47 41.17 47 34 L 47 16 C 47 8.83 41.17 3 34 3 L 16 3 z M 37 11 C 38.1 11 39 11.9 39 13 C 39 14.1 38.1 15 37 15 C 35.9 15 35 14.1 35 13 C 35 11.9 35.9 11 37 11 z M 25 14 C 31.07 14 36 18.93 36 25 C 36 31.07 31.07 36 25 36 C 18.93 36 14 31.07 14 25 C 14 18.93 18.93 14 25 14 z M 25 16 C 20.04 16 16 20.04 16 25 C 16 29.96 20.04 34 25 34 C 29.96 34 34 29.96 34 25 C 34 20.04 29.96 16 25 16 z"></path>
            </svg>
          </a>
          {/* <a href="https://discord.com" target="_blank" rel="noopener noreferrer">
          <svg
            className="h-7 w-7 fill-green-600 hover:fill-white"
            aria-hidden="true"
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 21 16"
          >
            <path d="M16.942 1.556a16.3 16.3 0 0 0-4.126-1.3 12.04 12.04 0 0 0-.529 1.1 15.175 15.175 0 0 0-4.573 0 11.585 11.585 0 0 0-.535-1.1 16.274 16.274 0 0 0-4.129 1.3A17.392 17.392 0 0 0 .182 13.218a15.785 15.785 0 0 0 4.963 2.521c.41-.564.773-1.16 1.084-1.785a10.63 10.63 0 0 1-1.706-.83c.143-.106.283-.217.418-.33a11.664 11.664 0 0 0 10.118 0c.137.113.277.224.418.33-.544.328-1.116.606-1.71.832a12.52 12.52 0 0 0 1.084 1.785 16.46 16.46 0 0 0 5.064-2.595 17.286 17.286 0 0 0-2.973-11.59ZM6.678 10.813a1.941 1.941 0 0 1-1.8-2.045 1.93 1.93 0 0 1 1.8-2.047 1.919 1.919 0 0 1 1.8 2.047 1.93 1.93 0 0 1-1.8 2.045Zm6.644 0a1.94 1.94 0 0 1-1.8-2.045 1.93 1.93 0 0 1 1.8-2.047 1.918 1.918 0 0 1 1.8 2.047 1.93 1.93 0 0 1-1.8 2.045Z" />
          </svg>
        </a> */}
          <a
            href="https://www.linkedin.com/company/kgecrs/"
            target="_blank"
            rel="noopener noreferrer"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              x="0px"
              y="0px"
              width="100"
              height="100"
              viewBox="0 0 24 24"
              className="h-7 w-7  fill-white hover:fill-white/20"
            >
              <path d="M19,3H5C3.895,3,3,3.895,3,5v14c0,1.105,0.895,2,2,2h14c1.105,0,2-0.895,2-2V5C21,3.895,20.105,3,19,3z M7.738,17L7.738,17 c-0.697,0-1.262-0.565-1.262-1.262v-4.477C6.477,10.565,7.042,10,7.738,10h0C8.435,10,9,10.565,9,11.262v4.477 C9,16.435,8.435,17,7.738,17z M7.694,8.717c-0.771,0-1.286-0.514-1.286-1.2s0.514-1.2,1.371-1.2c0.771,0,1.286,0.514,1.286,1.2 S8.551,8.717,7.694,8.717z M16.779,17L16.779,17c-0.674,0-1.221-0.547-1.221-1.221v-2.605c0-1.058-0.651-1.174-0.895-1.174 s-1.058,0.035-1.058,1.174v2.605c0,0.674-0.547,1.221-1.221,1.221h-0.081c-0.674,0-1.221-0.547-1.221-1.221v-4.517 c0-0.697,0.565-1.262,1.262-1.262h0c0.697,0,1.262,0.565,1.262,1.262c0,0,0.282-1.262,2.198-1.262C17.023,10,18,10.977,18,13.174 v2.605C18,16.453,17.453,17,16.779,17z"></path>
            </svg>
          </a>
        </div>
        {/* <div className='text-black font-pixelate text-center text-md hover:text-md  hover:font-bold hover:text-black text-sm" ref={glitch.ref}' ref={glitch.ref}> <Link href="/Hackathonbrochure.pdf" target={'_blank'}>
    spansorship Brochure
      </Link></div> */}
        {/* <hr className="my-8 ml-20 mr-20 border-[0.5px] border-[#092b0b]" />
      <p className="py-4 text-center font-medium text-black/60">
        &copy; {new Date().getFullYear()} Binary. All rights reserved.
      </p> */}
      </footer>
      {/* </Parallax> */}
      <div className="w-full mx-auto py-3 text-center text-[10px] md:text-sm text-neutral-950">
        &copy; {new Date().getFullYear()} ZYRO . All rights reserved.
      </div>
    </div>
  );
};

export default Footer;
