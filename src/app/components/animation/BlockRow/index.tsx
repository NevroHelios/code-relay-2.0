"use client";

import gsap from "gsap";
import ScrollTrigger from "gsap/dist/ScrollTrigger";
import { cn } from "@/app/lib/utils";
import { forwardRef, ForwardedRef } from "react";

gsap.registerPlugin(ScrollTrigger);

interface BlockRowProps {
  className?: string;
}

const BlockRow = (props: BlockRowProps, ref: ForwardedRef<HTMLDivElement>) => {
  return (
    <div
      className={cn(
        "blocks-row",
        "w-full",
        "h-[100px]",
        "overflow-hidden",
        "flex",
        props.className
      )}
      ref={ref}
    />
  );
};

export default forwardRef<HTMLDivElement, BlockRowProps>(BlockRow);