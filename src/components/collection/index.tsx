import * as logo from "@public/logo.svg";
import Image from "next/image";
import React, { useState, useEffect } from "react";
import { motion, useMotionValue, useTransform } from "framer-motion";
// import { useEffect, useState } from 'react';
import { NFT } from '../../types';
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
      <div className="absolute top-2 right-2 bg-red-500/20 rounded-lg px-3 py-1 text-sm font-pixelate">
        <span className="text-red-400">●</span>
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
  expiryDate: string;
}

const Card: React.FC<NFT> = (nft) => {
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

  return (
    <motion.div
      className="relative w-full sm:w-[calc(50%-12px)] lg:w-[calc(33.333%-16px)] min-w-[280px] max-w-[400px]"
      style={{ perspective: 1000 }}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
    >
      <motion.div
        style={{ rotateX, rotateY }}
        className="w-full h-full overflow-hidden rounded-xl bg-transparent hover:bg-white/5 transition-all duration-300 transform-gpu border border-green-500/20"
        transition={{ velocity: 0 }}
      >
        <div className="absolute inset-0 bg-gradient-to-br from-green-500/10 to-blue-500/10 opacity-50"></div>
        
        {/* Add countdown timer for each card */}
        <CountdownTimer endDate={nft.expiryDate} />
        
        <img 
          src={nft.tokenURI} 
          alt={`NFT ${nft.tokenId}`} 
          className="w-full h-48 object-cover rounded-t-xl hover:scale-105 transition-transform duration-300"
        />
        <div className="p-5 backdrop-blur-md bg-black/30">
          <h2 className="text-xl font-bold text-white/90 mb-2">Token #{nft.tokenId}</h2>
          <p className="text-lg font-semibold text-green-400 mb-2">{nft.title}</p>
          <p className="text-gray-300/80 text-sm mb-3">{nft.description}</p>
          <div className="flex justify-between items-center">
            <p className="text-xs text-gray-400">Created by: 
              <span className="text-green-400 ml-1">{nft.creator}</span>
            </p>
            <span className={`px-3 py-1 rounded-full text-xs ${
              nft.claimedBy 
                ? 'bg-gray-700/50 text-gray-300' 
                : 'bg-green-900/50 text-green-400'
            }`}>
              {nft.claimedBy ? 'Claimed' : 'Available'}
            </span>
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
};

const NFTCard: React.FC<NFT> = (props) => {
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
    <div className="w-full">
      <div className="relative p-6">
        <div className="flex flex-wrap justify-center gap-6">
          {nfts.map((nft) => (
            <Card key={nft.tokenId} {...nft} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default NFTCard;