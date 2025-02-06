'use client'

import styles from '../3d-text/Home.module.css'
import Text3d from '@/app/components/3d-text/Text3d';
import { useRef, useEffect } from 'react';

export default function Text3D() {

  const plane = useRef<HTMLDivElement>(null);
  const maxRotate = 45;

  interface MouseMoveEvent extends React.MouseEvent<HTMLDivElement> {}

  interface PlaneRef {
    current: HTMLDivElement | null;
  }

  const manageMouseMove = (e: MouseMoveEvent) => {
    const x = e.clientX / window.innerWidth;
    const y = e.clientY / window.innerHeight;
    const perspective = window.innerWidth * 4;
    const rotateX = maxRotate * x - maxRotate / 2;
    const rotateY = (maxRotate * y - maxRotate / 2) * -1;
    if (plane.current) {
      plane.current.style.transform = `perspective(${perspective}px) rotateX(${rotateY}deg) rotateY(${rotateX}deg)`;
    }
  };

  return (
    <div onMouseMove={(e) => {manageMouseMove(e)}} className={styles.container}>
      <div ref={plane} className={styles.body}>
        <Text3d primary={"Turning"} secondary={"Turning"}/>
        <Text3d primary={"Space"} secondary={"Space"}/>
        <Text3d primary={"Into"} secondary={"Into"}/>
        <Text3d primary={"Shapes"} secondary={"Shapes"}/>
      </div>
    </div>
  )
}
