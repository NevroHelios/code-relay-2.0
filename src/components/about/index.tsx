import { motion } from 'framer-motion';
import Image from 'next/image';
import { useGlitch } from 'react-powerglitch';
import useWindowSize from '@rooks/use-window-size';
import ParticleImage, {
  ParticleOptions,
  Vector,
  forces,
  ParticleForce,
} from 'react-particle-image';
import logo from '../../../public/Layer 1.svg';

const particleOptions: ParticleOptions = {
  filter: ({ x, y, image }) => {
    const pixel = image.get(x, y);
    return pixel.b > 50;
  },
  color: ({ x, y, image }) => '#89fda4',
  radius: () => Math.random() * 0.5 + 0.5,
  mass: () => 30,
  friction: () => 0.15,
  initialPosition: ({ canvasDimensions }) => {
    return new Vector(canvasDimensions.width / 2, canvasDimensions.height / 2);
  },
};

const motionForce = (x: number, y: number): ParticleForce => {
  return forces.disturbance(x, y, 5);
};

const About = () => {
  const { innerWidth = 0 } = useWindowSize();
  const glitch = useGlitch({
    playMode: 'always',
    createContainers: true,
    hideOverflow: false,
    timing: {
      duration: 3850,
    },
    glitchTimeSpan: {
      start: 0.5,
      end: 0.7,
    },
    shake: {
      velocity: 10,
      amplitudeX: 0.04,
      amplitudeY: 0.04,
    },
    slice: {
      count: 6,
      velocity: 15,
      minHeight: 0.02,
      maxHeight: 0.15,
      hueRotate: true,
    },
    pulse: false,
  });

  const fadeInUp = {
    initial: { y: 30, opacity: 0 },
    animate: { y: 0, opacity: 1 },
    transition: { duration: 0.5 }
  };

  return (
    <motion.div 
      id="about"
      initial="initial"
      whileInView="animate"
      viewport={{ once: true }}
    >
      <main className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mt-16 md:mt-24 lg:mt-32">
          <motion.div 
            variants={fadeInUp}
            className="my-2 mb-8"
          >
            <div className="shad relative w-full overflow-x-hidden pt-5 text-xl sm:hidden">
              <h2 className="relative mx-0 mb-10 flex max-w-sm flex-row pt-4 text-left font-pixelate font-bold uppercase md:w-max md:max-w-max md:pt-0">
              <span className="flex-none text-green-400 opacity-85 font-bold tracking-wider pl-2 text-2xl sm:text-5xl md:text-6xl">
  01.
</span>
<span className="flex-none text-gray-200 opacity-85 font-bold tracking-wider pl-2 text-2xl sm:text-5xl md:text-6xl">
   About
</span>

                <div className="item-center flex flex-col justify-center">
                  <div className="right-full ml-4 mt-[10px] h-[4px] w-[70vh] transform bg-green-500"></div>
                </div>
              </h2>
            </div>
            <div className="shad relative hidden w-full overflow-x-hidden pt-5 sm:block">
              <h2 className="relative mx-0 mb-10 flex max-w-sm flex-row pt-4 text-left font-pixelate font-bold uppercase md:w-max md:max-w-max md:pt-0">
              <span className="flex-none text-green-400 opacity-85 font-bold tracking-wider pl-2 text-2xl sm:text-5xl md:text-6xl">
  01.
</span>
              <span className="flex-none text-gray-200 opacity-85 font-bold tracking-wider pl-2 text-2xl sm:text-5xl md:text-6xl">
   About
</span>

                <div className="item-center flex flex-col justify-center">
                  <div className="top-[50%] ml-4 mt-[25px] h-[1px] w-[70vh] transform bg-[#1d6339]"></div>
                </div>
              </h2>
            </div>
          </motion.div>

          <div className="flex flex-col items-center gap-2">
            <motion.div 
              variants={fadeInUp}
              className="w-full max-w-full"
            >
              {innerWidth > 1024 ? (
                <ParticleImage
                  src={logo.src}
                  width={500}
                  height={100}
                  entropy={2}
                  maxParticles={4000}
                  particleOptions={particleOptions}
                  mouseMoveForce={motionForce}
                  touchMoveForce={motionForce}
                  backgroundColor="transparent"
                  className="w-full"
                />
              ) : (
                <span ref={glitch.ref}>
                  <Image
                    src={logo}
                    alt="Binary Hackathon"
                    width={200}
                    height={200}
                    className="w-full h-auto"
                    priority
                  />
                </span>
              )}
            </motion.div>

            <motion.div 
              variants={fadeInUp}
              className="w-full max-w-2xl text-center"
            >
              <h2 className="mb-6 font-pixelate text-xl md:text-2xl font-bold uppercase text-green-400">
                hi everyone
              </h2>
              <motion.p 
                variants={fadeInUp}
                className="font-pixelate font-bold text-white text-base md:text-lg mb-6"
              >
                Binary is the annual hackathon of Kalyani Government Engineering College. It aims to
                be a stage for college students to showcase their creativity and resolve societal
                issues using technology. We hope to employ the current generation of innovators to
                think out of the box and bring transformative solutions to the forefront.
              </motion.p>
              <motion.p 
                variants={fadeInUp}
                className="font-pixelate font-bold text-green-400 text-base md:text-lg"
              >
                We intend to host about 300 students with expertise in diverse domains of computer
                science. The BINARY will take place in the first half of March at the Kalyani
                Government Engineering College.
              </motion.p>
            </motion.div>
          </div>
        </div>
      </main>
    </motion.div>
  );
};

export default About;