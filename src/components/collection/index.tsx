import * as logo from "@public/logo.svg";
import * as position1 from "@public/logo.svg";
import * as position2 from "@public/logo.svg";
import * as position3 from "@public/logo.svg";
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

interface MemberComponentProps {
  imgurl: {
    src: string;
    width: number;
    height: number;
  };
  imgurl2: {
    src: string;
    width: number;
    height: number;
  };
  name: string;
  description: string;
  TotalPrize: string;
  CashPrize: string;
  endDate: string;
}

const MemberComponent: React.FC<MemberComponentProps> = ({
  imgurl,
  imgurl2,
  name,
  description,
  CashPrize,
  TotalPrize,
  endDate,
}) => {
  const cardX = useMotionValue(0);
  const cardY = useMotionValue(0);
  const rotateX = useTransform(cardY, [-300, 300], [10, -10]);
  const rotateY = useTransform(cardX, [-300, 300], [-10, 10]);

  const handleMouseMove = (event: React.MouseEvent) => {
    const offsetX = event.clientX - window.innerWidth / 2;
    const offsetY = event.clientY - window.innerHeight / 2;
    cardX.set(offsetX);
    cardY.set(offsetY);
  };

  const handleMouseLeave = () => {
    cardX.set(0);
    cardY.set(0);
  };

  const handleClick = () => {
    console.log(`Clicked on ${name}`);
  };

  return (
    <motion.div
      className="lg:m-4 md:m-0 relative"
      style={{
        perspective: 800,
      }}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
    >
      <motion.div
        style={{ rotateX, rotateY }}
        className="w-[300px] h-[400px] rounded-xl p-6 border-2 border-green-700 bg-black backdrop-blur-md bg-opacity-20 shadow-xl"
        transition={{ velocity: 0 }}
      >
        <CountdownTimer endDate={endDate} />

        <div className="relative w-full h-[180px] flex justify-center items-center mb-4 ">
          <Image
            src={imgurl.src}
            alt={name}
            width={160}
            height={160}
            className="rounded-xl object-cover transform transition-transform duration-500 hover:scale-110"
          />
          <div className="absolute -bottom-4 right-4 w-12 h-12">
            <Image
              src={imgurl2.src}
              alt="logo"
              width={48}
              height={48}
              className="rounded-full "
            />
          </div>
        </div>

        <div className="text-center space-y-4">
          <h3 className="text-xl font-bold text-white font-pixelate tracking-wider">
            {name}
          </h3>
          <p className="text-green-300 text-lg">{description}</p>

          <button
            onClick={handleClick}
            className="mt-4 w-full py-2 px-4 bg-green-700 text-white rounded-lg 
                     font-pixelate text-sm tracking-wider transform transition-all 
                     duration-300 hover:bg-green-600 hover:scale-105 
                     focus:outline-none focus:ring-2 focus:ring-green-500 
                     focus:ring-opacity-50"
          >
            Claim Prize
          </button>
        </div>
      </motion.div>
    </motion.div>
  );
};

const Team: React.FC = () => {
  return (
    <div id="prizes" className="min-h-screen w-full relative">
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

        <div className="max-w-[1200px] mx-auto flex flex-wrap justify-center gap-8 p-4">
          <div className="flex-none">
            <MemberComponent
              imgurl={{ src: position1.default.src, width: 10, height: 10 }}
              name="1st Prize"
              CashPrize="Total Prize of Worth $"
              TotalPrize="Total Prize of Worth $"
              imgurl2={{ src: logo.default.src, width: 10, height: 10 }}
              endDate="2024-03-31T23:59:59"
              description="First Prize Description"
            />
          </div>
          <div className="flex-none">
            <MemberComponent
              imgurl={{ src: position2.default.src, width: 10, height: 10 }}
              name="2nd Prize"
              CashPrize="Total Prize of Worth $"
              TotalPrize="Total Prize of Worth $"
              imgurl2={{ src: logo.default.src, width: 10, height: 10 }}
              endDate="2024-03-31T23:59:59"
              description="Second Prize Description"
            />
          </div>
          <div className="flex-none">
            <MemberComponent
              imgurl={{ src: position3.default.src, width: 10, height: 10 }}
              name="3rd Prize"
              CashPrize="Total Prize of Worth $"
              TotalPrize="Total Prize of Worth $"
              imgurl2={{ src: logo.default.src, width: 10, height: 10 }}
              endDate="2024-03-31T23:59:59"
              description="Third Prize Description"
            />
          </div>
          <div className="flex-none">
            <MemberComponent
              imgurl={{ src: position1.default.src, width: 10, height: 10 }}
              name="4th Prize"
              CashPrize="Total Prize of Worth $"
              TotalPrize="Total Prize of Worth $"
              imgurl2={{ src: logo.default.src, width: 10, height: 10 }}
              endDate="2024-03-31T23:59:59"
              description="Fourth Prize Description"
            />
          </div>
          <div className="flex-none">
            <MemberComponent
              imgurl={{ src: position2.default.src, width: 10, height: 10 }}
              name="5th Prize"
              CashPrize="Total Prize of Worth $"
              TotalPrize="Total Prize of Worth $"
              imgurl2={{ src: logo.default.src, width: 10, height: 10 }}
              endDate="2024-03-31T23:59:59"
              description="Fifth Prize Description"
            />
          </div>
          <div className="flex-none">
            <MemberComponent
              imgurl={{ src: position3.default.src, width: 10, height: 10 }}
              name="6th Prize"
              CashPrize="Total Prize of Worth $"
              TotalPrize="Total Prize of Worth $"
              imgurl2={{ src: logo.default.src, width: 10, height: 10 }}
              endDate="2024-03-31T23:59:59"
              description="Sixth Prize Description"
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Team;