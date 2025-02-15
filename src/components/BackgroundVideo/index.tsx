import React from 'react';

interface BackgroundVideoProps {
  opacity?: number;
  zIndex?: number;
}

const BackgroundVideo: React.FC<BackgroundVideoProps> = ({ 
  opacity = 0.8,
  zIndex = -1 
}) => {
  return (
    <video
      playsInline
      autoPlay
      loop
      muted
      className={`fixed top-0 left-0 w-screen h-full object-cover flex items-center justify-center`}
      style={{ opacity, zIndex }}
    >
      <source
        src="https://res.cloudinary.com/dlrlet9fg/video/upload/v1739583312/vecteezy_green-particle-wave-background-the-green-particles-glow_11386772_1_1_1_g3syxt.mp4"
        type="video/mp4"
      />
      Your browser does not support the video tag.
    </video>
  );
};

export default BackgroundVideo;
