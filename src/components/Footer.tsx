import React from "react";
import Image from "next/image";

const Footer = () => {
  return (
    <footer className="bg-white text-gray-800 py-12 px-6 md:px-12 lg:px-24">
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
        {/* Logo and description */}
        <div>
          <div className="flex items-center space-x-2">
            <Image src="/logo.png" alt="Treasure NFT" width={40} height={40} />
            <h2 className="text-xl font-bold">
              Treasure <span className="text-gray-500">NFT</span>
            </h2>
          </div>
          <p className="text-gray-600 mt-2">
            TreasureNFT is a Web3 revenue platform based on NFT collections.
          </p>
        </div>

        {/* Resources */}
        <div>
          <h3 className="text-lg font-semibold">Resources</h3>
          <ul className="mt-2 space-y-2 text-gray-600">
            <li>
              <a href="#">Docs</a>
            </li>
            <li>
              <a href="#">Invite friends</a>
            </li>
            <li>
              <a href="#">How to buy</a>
            </li>
            <li>
              <a href="#">Tutorials</a>
            </li>
            <li>
              <a href="#">Artist Application Form</a>
            </li>
          </ul>
        </div>

        {/* News */}
        <div>
          <h3 className="text-lg font-semibold">News</h3>
          <ul className="mt-2 space-y-2 text-gray-600">
            <li>
              <a href="#">Blog</a>
            </li>
          </ul>
        </div>

        {/* Company */}
        <div>
          <h3 className="text-lg font-semibold">Company</h3>
          <p className="text-gray-600 mt-2">
            Join our mailing list to stay in the loop with our newest feature
            releases, NFT listing, tips, and tricks.
          </p>
          <div className="mt-4 flex items-center">
            <input
              type="email"
              placeholder="Enter your email address"
              className="w-full p-2 border border-gray-300 rounded-l-lg focus:outline-none"
            />
            <button className="bg-gradient-to-r from-blue-400 to-pink-300 text-white px-4 py-2 rounded-r-lg">
              Submit
            </button>
          </div>
        </div>
      </div>

      {/* Download Section */}
      <div className="mt-12 flex flex-col md:flex-row items-center justify-center gap-4">
        <h3 className="text-lg font-semibold">Download</h3>
        <div className="flex space-x-4">
          <a
            href="#"
            className="flex items-center space-x-2 bg-blue-400 text-white px-4 py-2 rounded-lg"
          >
            <span>📱</span> <span>APP Store</span>
          </a>
          <a
            href="#"
            className="flex items-center space-x-2 bg-green-300 text-white px-4 py-2 rounded-lg"
          >
            <span>▶️</span> <span>Google Play</span>
          </a>
          <a
            href="#"
            className="flex items-center space-x-2 bg-red-200 text-white px-4 py-2 rounded-lg"
          >
            <span>📂</span> <span>APK</span>
          </a>
        </div>
      </div>

      {/* Copyright Section */}
      <div className="text-center text-gray-500 text-sm mt-8">
        © 2023 - TreasureMeta Technology, Inc <br />
        <a href="#" className="hover:underline">
          Privacy Policy
        </a>{" "}
        |{" "}
        <a href="#" className="hover:underline">
          Terms of Service
        </a>
      </div>
    </footer>
  );
};

export default Footer;
