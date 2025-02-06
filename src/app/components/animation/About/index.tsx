import { cn } from "@/app/lib/utils";
import Section from "../Section";
import Heading from "../Heading";
import New from "@/app/components/About"

interface AboutProps {
  className?: string;
}

export default function About({ className }: AboutProps) {
  return (
    <Section className={cn("bg-[#ffffff]", className)}>
     <New/>
    </Section>
  );
}