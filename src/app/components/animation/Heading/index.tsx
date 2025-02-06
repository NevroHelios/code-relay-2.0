import { cn } from "@/app/lib/utils";
import { ReactNode } from "react";

interface HeadingProps {
  children: ReactNode;
}

export default function Heading({ children }: HeadingProps) {
  return (
    <h1
      className={cn(
        "absolute",
        "top-1/2",
        "left-1/2",
        "-translate-x-1/2",
        "-translate-y-1/2",
        "text-[12vw]",
        "-tracking-wide",
        "opacity-50",
        "whitespace-nowrap"
      )}
    >
      {children}
    </h1>
  );
}