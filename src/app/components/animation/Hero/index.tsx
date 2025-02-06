import { cn } from "../../../lib/utils";
import Section from "../Section";
import Heading from "../Heading";
import About from "@/app/components/About";

interface HeroProps {
  className?: string;
}

export default function Hero({ className }: HeroProps) {
  return (
    <Section className={cn("bg-[#000000]", className)}>
      <About />
    </Section>
  );
}