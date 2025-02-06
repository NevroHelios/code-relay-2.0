import { cn } from "../../../lib/utils";
import Blocks from "../Blocks";
import Image from "next/image";
import Section from "../Section";
import img from "../../../../public/images/img-2.png";

interface AboutImageProps {
  className?: string;
}

export default function AboutImage({ className }: AboutImageProps) {
  return (
    <Section className={cn("h-[200vh] relative flex items-center justify-center", className)}>
      {/* <Image
        fill
        className={cn("absolute size-full object-cover z-[-1]")}
        src={img}
        alt=""
      /> */}
      <video
        autoPlay
        loop
        muted
        className="absolute top-0 left-0 w-full h-full object-cover z-[-1]"
        src="https://res.cloudinary.com/dlrlet9fg/video/upload/v1735613993/zyro/azb0tramjdqahixvtmmg.mp4"
      />
      <div className="font-semibold md:font-samibold text-center text-3xl uppercase md:text-6xl md:leading-tight text-shadow-lg text-white m-4">
        {/* Be cautious, stay alert,
        <br />Every step matters,<br />
        Together, we can prevent harm. */}
        A safe environment fosters trust and cooperation, <br />which are essential for economic growth and social progress.
      </div>

      {/* <Blocks className="top" startIndex={0} />
      <Blocks className="bottom" startIndex={4} /> */}
      <Blocks />
    </Section>
  );
}