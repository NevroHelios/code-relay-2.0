import { cn } from "@/app/lib/utils";
import { forwardRef, ReactNode } from "react";

interface SectionProps {
  children: ReactNode;
  className?: string;
}

const Section = forwardRef<HTMLElement, SectionProps>(({ children, className }, ref) => {
  return (
    <section
      ref={ref}
      className={cn("relative w-full min-h-screen", className)}
    >
      {children}
    </section>
  );
});

export default Section;
