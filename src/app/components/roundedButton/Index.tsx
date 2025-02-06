'use client';
import React, { useEffect, useRef } from 'react';
import styles from './styles.module.scss';
import gsap from 'gsap';
import Magnetic from '../magnetic/Index';

export default function Index({
  children,
  backgroundColor = '#F7931E',
  color='#000',
  ...attributes
}: {
  children: React.ReactNode;
  backgroundColor?: string;
  color?:string;
  [key: string]: unknown;
}) {
  const circle = useRef<HTMLDivElement | null>(null);
  const timeline = useRef<gsap.core.Timeline | null>(null);
  let timeoutId: NodeJS.Timeout | null = null;

  useEffect(() => {
    timeline.current = gsap.timeline({ paused: true });
    timeline.current
      .to(
        circle.current,
        { top: '-25%', width: '150%', duration: 0.4, ease: 'power3.in' },
        'enter'
      )
      .to(
        circle.current,
        { top: '-150%', width: '125%', duration: 0.25 },
        'exit'
      );

    // Cleanup on unmount
    return () => {
      if (timeoutId) clearTimeout(timeoutId);
    };
  }, []);

  const manageMouseEnter = () => {
    if (timeoutId) clearTimeout(timeoutId);
    if (timeline.current) {
      timeline.current.tweenFromTo('enter', 'exit');
    }
  };

  const manageMouseLeave = () => {
    if (timeoutId) clearTimeout(timeoutId);
    timeoutId = setTimeout(() => {
      if (timeline.current) {
        timeline.current.play();
      }
    }, 300);
  };

  return (
    <Magnetic>
      <div
        className={styles.roundedButton}
        style={{ overflow: 'hidden' }}
        onMouseEnter={manageMouseEnter}
        onMouseLeave={manageMouseLeave}
        {...attributes}
      >
        {children}
        <div
          ref={circle}
          style={{ backgroundColor, color }}
          className={styles.circle}
        >
        </div>
      </div>
    </Magnetic>
  );
}
