import { cn } from "../../../lib/utils";
import Blocks from "@/app/components/animation/Blocks";
import Section from "@/app/components/animation/Section";
import { FC } from "react";

interface HeroImageProps {
  className?: string;
}

const HeroImage: FC<HeroImageProps> = ({ className }) => {
  return (
    <Section className={cn("h-[200vh] relative flex items-center justify-center", className)}>
      <video
        autoPlay
        loop
        muted
        className="absolute top-0 left-0 w-full h-full object-cover z-[-1]"
        src="https://res.cloudinary.com/dlrlet9fg/video/upload/v1735605521/zyro/b0nhwx3qa1vctzixgka8.mp4"
      />

      <div className="font-semibold md:font-samibold text-center text-3xl uppercase md:text-6xl md:leading-tight text-shadow-lg text-white m-4">
        safety is a fundamental value that benefits individuals,<br /> communities, and society as a whole.<br /> By prioritizing safety, we create a more secure,<br /> prosperous, and equitable world for everyone
      </div>

      <Blocks className="" startIndex={0} />
    </Section>
  );
}

export default HeroImage;
