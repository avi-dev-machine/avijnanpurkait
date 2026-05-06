"use client";
import { useEffect, useRef, useCallback } from "react";
import { motion, useSpring } from "framer-motion";

export default function MagneticCursor() {
  const dotRef = useRef<HTMLDivElement>(null);
  const ringRef = useRef<HTMLDivElement>(null);

  const dotX = useSpring(0, { stiffness: 800, damping: 50 });
  const dotY = useSpring(0, { stiffness: 800, damping: 50 });
  const ringX = useSpring(0, { stiffness: 150, damping: 20 });
  const ringY = useSpring(0, { stiffness: 150, damping: 20 });

  const onMouseMove = useCallback((e: MouseEvent) => {
    dotX.set(e.clientX - 4);
    dotY.set(e.clientY - 4);
    ringX.set(e.clientX - 20);
    ringY.set(e.clientY - 20);
  }, [dotX, dotY, ringX, ringY]);

  useEffect(() => {
    window.addEventListener("mousemove", onMouseMove);

    const onEnter = () => ringRef.current?.classList.add("cursor-hover");
    const onLeave = () => ringRef.current?.classList.remove("cursor-hover");

    document.querySelectorAll("a, button, [data-magnetic]").forEach(el => {
      el.addEventListener("mouseenter", onEnter);
      el.addEventListener("mouseleave", onLeave);
    });

    return () => window.removeEventListener("mousemove", onMouseMove);
  }, [onMouseMove]);

  return (
    <>
      <motion.div
        style={{ x: dotX, y: dotY, position: "fixed", top: 0, left: 0, width: 8, height: 8,
          borderRadius: "50%", background: "var(--accent)", zIndex: 9999, pointerEvents: "none",
          boxShadow: "0 0 12px var(--accent)"
        }}
      />
      <motion.div
        ref={ringRef}
        style={{ x: ringX, y: ringY, position: "fixed", top: 0, left: 0, width: 40, height: 40,
          borderRadius: "50%", border: "1px solid rgba(10,240,184,0.5)",
          zIndex: 9998, pointerEvents: "none",
        }}
        className="cursor-ring"
      />
    </>
  );
}
