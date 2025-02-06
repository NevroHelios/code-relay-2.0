import React, { useState, useEffect, useRef, RefObject } from 'react';
import cn from 'classnames';
import gsap from 'gsap';
import ScrollTrigger from 'gsap/ScrollTrigger';
import BlockRow from '@/app/components/animation/BlockRow';

interface BlocksProps {
  className?: string;
  startIndex?: number;
}

export default function Blocks({ className, startIndex }: BlocksProps) {
  const [length, setLength] = useState<number>(4); // Default to 4 for desktop
  const rowsRef = useRef<(HTMLDivElement | null)[]>([]);

  useEffect(() => {
    // Adjust the number of rows based on screen size
    const updateRowLength = () => {
      if (window.innerWidth <= 768) {
        setLength(8); // 8 rows on mobile
      } else {
        setLength(4); // 4 rows on desktop
      }
    };

    // Call it on initial load
    updateRowLength();

    // Add resize event listener to update length dynamically
    window.addEventListener("resize", updateRowLength);

    // Clean up the event listener on component unmount
    return () => {
      window.removeEventListener("resize", updateRowLength);
    };
  }, []);

  useEffect(() => {
    const createBlocks = (row: HTMLDivElement) => {
      for (let i = 0; i < 6; i++) {
        const block = document.createElement("div");
        block.className = "block";
        row.appendChild(block);
      }
    };

    const initializeScrollTrigger = (container: Element) => {
      const rows = container.querySelectorAll<HTMLDivElement>(".blocks-row");
      const numRows = rows.length;

      rows.forEach((row, rowIndex) => {
        let blocks = Array.from(row.querySelectorAll<HTMLDivElement>(".block"));
        let isTop = container.classList.contains("top");

        let randomizedOrder = gsap.utils.shuffle(blocks.map((block, i) => i));

        ScrollTrigger.create({
          trigger: container,
          start: "top bottom",
          end: "bottom top",
          scrub: true,
          onUpdate: (self) => {
            let progress = self.progress;
            let rowDelay = 0.25 * (numRows - rowIndex - 1);
            let adjustedProgress = Math.max(
              0,
              Math.min(1, progress - rowDelay)
            );

            updateBlocksOpacity(
              blocks,
              randomizedOrder,
              isTop,
              adjustedProgress
            );
          },
        });
      });
    };

    const updateBlocksOpacity = (
      blocks: HTMLDivElement[],
      order: number[],
      isTop: boolean,
      progress: number
    ) => {
      blocks.forEach((block, i) => {
        let offset = order.indexOf(i) / blocks.length;
        let adjustedProgress = (progress - offset) * blocks.length;
        let opacity = isTop
          ? 1 - Math.min(1, Math.max(0, adjustedProgress))
          : Math.min(1, Math.max(0, adjustedProgress));

        block.style.opacity = opacity.toString();
        console.log(`Block ${i + 1}, Opacity: ${opacity}`);
      });
    };

    const blockRows = rowsRef.current;
    blockRows.forEach((row) => {
      if (row) createBlocks(row);
    });

    const blockContainers = document.querySelectorAll(".blocks-container");
    blockContainers.forEach((container) => {
      initializeScrollTrigger(container);
    });
  }, []);

  return (
    <>
      <div
        className={cn(
          "top",
          "blocks-container",
          "absolute",
          "top-0",
          "w-full",
          "h-[400px]",
          className
        )}
      >
        {Array.from({ length }).map((_, i) => (
          <BlockRow key={0 + i} ref={(el) => { rowsRef.current[0 + i] = el; }} />
        ))}
      </div>
      <div
        className={cn(
          "bottom",
          "blocks-container",
          "absolute",
          "bottom-0",
          "w-full",
          "h-[400px]",
          className
        )}
      >
        {Array.from({ length }).map((_, i) => (
          <BlockRow key={4 + i} ref={(el) => { rowsRef.current[4 + i] = el; }} />
        ))}
      </div>
    </>
  );
}