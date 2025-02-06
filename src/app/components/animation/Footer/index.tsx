import { cn } from "../../../lib/utils";
import { forwardRef, ForwardedRef } from "react";
import Section from "../Section";
import Heading from "../Heading";
import About from "@/app/components/About";
// import Testimonials from "../../testimonials/Index";

interface FooterProps {
  className?: string;
}

const Footer = ({ className }: FooterProps, ref: ForwardedRef<HTMLDivElement>) => {
  return (
    <Section className={cn("bg-[#ffffff] h-[200vh]", className)}>
      <About/>
    </Section>
  );
};

export default forwardRef<HTMLDivElement, FooterProps>(Footer);