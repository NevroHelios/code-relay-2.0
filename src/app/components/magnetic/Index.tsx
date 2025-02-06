import React, { useEffect, useRef } from 'react'
import gsap from 'gsap';



export default function Index({children}:{children: React.ReactNode}) {
    const magnetic = useRef(null);

    useEffect(() => {
        const element = magnetic.current as HTMLElement | null;
        if (element) {
            const xTo = gsap.quickTo(element, "x", {duration: 1, ease: "elastic.out(1, 0.3)"})
            const yTo = gsap.quickTo(element, "y", {duration: 1, ease: "elastic.out(1, 0.3)"})

            const handleMouseMove = (e: MouseEvent) => {
                const { clientX, clientY } = e;
                const {height, width, left, top} = element.getBoundingClientRect();
                const x = clientX - (left + width/2)
                const y = clientY - (top + height/2)
                xTo(x * 0.35);
                yTo(y * 0.35)
            }

            const handleMouseLeave = () => {
                xTo(0);
                yTo(0)
            }

            element.addEventListener("mousemove", handleMouseMove);
            element.addEventListener("mouseleave", handleMouseLeave);

            return () => {
                element.removeEventListener("mousemove", handleMouseMove);
                element.removeEventListener("mouseleave", handleMouseLeave);
            }
        }
    }, [])

    return (
        React.isValidElement(children)
            // ? React.cloneElement(children, { ref: magnetic as React.Ref<unknown> })//-
            ? React.cloneElement(children as React.ReactElement<any>, { ref: magnetic })//+
            : children
    )
}

