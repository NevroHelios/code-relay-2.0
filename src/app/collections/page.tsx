import * as logo from "@public/logo.svg";
import Image from "next/image";
import React, { useState, useEffect } from "react";
import { motion, useMotionValue, useTransform } from "framer-motion";

interface TimeLeft {
  days: number;
  hours: number;
  minutes: number;
  seconds: number;
}

const CountdownTimer: React.FC<{ endDate: string }> = ({ endDate }) => {
  const [timeLeft, setTimeLeft] = useState<TimeLeft>({
    days: 10,
    hours: 10,
    minutes: 10,
    seconds: 10
  });
  const [isExpired, setIsExpired] = useState(false);

  useEffect(() => {
    const calculateTimeLeft = () => {
      const difference = +new Date(endDate) - +new Date();
      
      if (difference > 0) {
        setTimeLeft({
          days: Math.floor(difference / (1000 * 60 * 60 * 24)),
          hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
          minutes: Math.floor((difference / 1000 / 60) % 60),
          seconds: Math.floor((difference / 1000) % 60)
        });
      } else {
        setIsExpired(true);
        setTimeLeft({ days: 0, hours: 0, minutes: 0, seconds: 0 });
      }
    };

    calculateTimeLeft();
    const timer = setInterval(calculateTimeLeft, 1000);

    return () => clearInterval(timer);
  }, [endDate]);

  const TimeUnit: React.FC<{ value: number; unit: string }> = ({ value, unit }) => (
    <div className="flex flex-col items-center px-1">
      <span className="text-lg font-bold text-green-400">{value.toString().padStart(2, '0')}</span>
      <span className="text-[8px] text-green-500 uppercase">{unit}</span>
    </div>
  );

  if (isExpired) {
    return (
      <div className="absolute top-2 right-2 bg-red-900/80 rounded-lg px-3 py-1 text-sm font-pixelate text-white border border-red-700">
        Expired
      </div>
    );
  }

  return (
    <div className="absolute top-2 right-2 bg-black/90 rounded-lg px-2 py-1 border border-green-700/50 backdrop-blur-sm">
      <div className="flex items-center gap-1">
        <TimeUnit value={timeLeft.days} unit="d" />
        <span className="text-green-500">:</span>
        <TimeUnit value={timeLeft.hours} unit="h" />
        <span className="text-green-500">:</span>
        <TimeUnit value={timeLeft.minutes} unit="m" />
        <span className="text-green-500">:</span>
        <TimeUnit value={timeLeft.seconds} unit="s" />
      </div>
    </div>
  );
};

interface NFT {
  tokenId: number;
  tokenURI: string;
  creator: string;
  title: string;
  description: string;
  claimedBy?: string;
}

const NFTCard: React.FC<NFT> = ({ tokenId, tokenURI, creator, title, description, claimedBy }) => {
  const cardX = useMotionValue(0);
  const cardY = useMotionValue(0);
  const rotateX = useTransform(cardY, [-300, 300], [10, -10]);
  const rotateY = useTransform(cardX, [-300, 300], [-10, 10]);

  const handleMouseMove = (event: React.MouseEvent) => {
    const rect = event.currentTarget.getBoundingClientRect();
    const offsetX = event.clientX - rect.left - rect.width / 2;
    const offsetY = event.clientY - rect.top - rect.height / 2;
    cardX.set(offsetX);
    cardY.set(offsetY);
  };

  const handleMouseLeave = () => {
    cardX.set(0);
    cardY.set(0);
  };

  const [imgError, setImgError] = useState(false);

  return (
    <motion.div
      className="bg-black/90 rounded-lg shadow-lg overflow-hidden"
      style={{ perspective: 800 }}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
    >
      <motion.div
        style={{ rotateX, rotateY }}
        className="w-full h-full p-6 border-2 border-green-700 backdrop-blur-md"
        transition={{ velocity: 0 }}
      >
        <CountdownTimer endDate="2024-03-31T23:59:59" />
        
        <div className="relative">
          {!imgError ? (
            <Image 
              src={tokenURI} 
              alt={`NFT ${title} - Token #${tokenId} by ${creator}`}
              width={300}
              height={200}
              className="w-full h-48 object-cover rounded-lg transform transition-transform duration-500 hover:scale-105"
              onError={() => setImgError(true)}
            />
          ) : (
            <div className="w-full h-48 bg-gray-800 rounded-lg flex items-center justify-center">
              <span className="text-gray-400">Image not available</span>
            </div>
          )}
          <div className="absolute -bottom-4 right-4">
            <Image
              src={logo.default.src}
              alt="Code Relay Collection Logo"
              width={48}
              height={48}
              className="rounded-full border-2 border-green-700"
            />
          </div>
        </div>

        <div className="mt-6 text-center">
          <h2 className="text-xl font-bold text-white font-pixelate">Token #{tokenId}</h2>
          <h3 className="text-lg font-semibold text-green-400 mt-2">{title}</h3>
          <p className="text-gray-300 mt-2">{description}</p>
          <p className="text-gray-400 text-sm mt-2">Created by: {creator}</p>
          
          <button
            className="mt-4 w-full py-2 px-4 bg-green-700 text-white rounded-lg 
                     font-pixelate text-sm tracking-wider transform transition-all 
                     duration-300 hover:bg-green-600 hover:scale-105"
          >
            {claimedBy ? 'Claimed' : 'Claim NFT'}
          </button>
        </div>
      </motion.div>
    </motion.div>
  );
};

const Collection: React.FC = () => {
  const [nfts, setNfts] = useState<NFT[]>([]);

  useEffect(() => {
    const fetchNFTs = async () => {
      const response = await fetch('/api/nft');
      const data = await response.json();
      setNfts(data);
    };
    fetchNFTs();
  }, []);

  return (
    <div className="min-h-screen w-full relative">
      <div className="mt-[96px] md:mt-[116px]">
        <div
          className="text-white font-pixelate text-[2rem] md:text-[3rem] font-bold"
          
        >
          <div className="overflow-x-hidden w-full pt-5 sm:hidden text-xl shad relative">
            <h2 className=" flex flex-row max-w-sm md:max-w-max mx-0  font-pixelate  text-left font-bold mb-10 pt-4 md:pt-0 uppercase md:w-max relative">
              <span className="flex-none text-green-500 opacity-85 font-bold tracking-wider pl-1">
                04.
              </span>
              <span className="flex-none text-gray-200 opacity-85 font-bold tracking-wider pl-2">
                Prizes
              </span>

              <div className="flex flex-col item-center justify-center ">
                <div className="right-full  transform h-[4px] w-[70vh] bg-green-500 mt-[10px] ml-4"></div>
              </div>
            </h2>
          </div>
          <div className="overflow-x-hidden w-full pt-5 sm:block hidden shad relative">
            <h2 className=" flex flex-row max-w-sm md:max-w-max mx-0  font-pixelate  text-left font-bold mb-10 pt-4 md:pt-0 md:w-max relative">
              <span className="flex-none text-green-500 opacity-85 font-bold tracking-wider pl-4">
                04.
              </span>
              <span className="flex-none text-gray-200 opacity-85 font-bold tracking-wider pl-4 uppercase">
                Collections
              </span>

              <div className="flex flex-col item-center justify-center ">
                <div className="right-full top-[55%] transform h-[2px] w-[70vh] bg-[#1d6339] mt-[25px] ml-4"></div>
              </div>
            </h2>
          </div>
        </div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {nfts.map((nft) => (
              <NFTCard key={nft.tokenId} {...nft} />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Collection;