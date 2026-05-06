"use client";
import { useEffect, useRef } from "react";
import { motion, useInView, useAnimation } from "framer-motion";

export function BlurReveal({ text, className, delay = 0 }: { text: string; className?: string; delay?: number }) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-60px" });
  const controls = useAnimation();

  useEffect(() => {
    if (inView) controls.start("visible");
  }, [inView, controls]);

  const words = text.split(" ");

  return (
    <span ref={ref} className={className} style={{ display: "inline" }}>
      {words.map((word, i) => (
        <motion.span
          key={i}
          initial="hidden"
          animate={controls}
          variants={{
            hidden: { opacity: 0, filter: "blur(12px)", y: 20 },
            visible: { opacity: 1, filter: "blur(0px)", y: 0 },
          }}
          transition={{ duration: 0.6, delay: delay + i * 0.04, ease: [0.16, 1, 0.3, 1] }}
          style={{ display: "inline-block", marginRight: "0.28em" }}
        >
          {word}
        </motion.span>
      ))}
    </span>
  );
}

export function FadeUpSection({ children, delay = 0, className, style }: { children: React.ReactNode; delay?: number; className?: string; style?: React.CSSProperties }) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 40 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.8, delay, ease: [0.16, 1, 0.3, 1] }}
      className={className}
      style={style}
    >
      {children}
    </motion.div>
  );
}

export function StaggerChildren({ children, className, style }: { children: React.ReactNode; className?: string; style?: React.CSSProperties }) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });

  return (
    <motion.div
      ref={ref}
      initial="hidden"
      animate={inView ? "visible" : "hidden"}
      variants={{ visible: { transition: { staggerChildren: 0.12 } } }}
      className={className}
      style={style}
    >
      {children}
    </motion.div>
  );
}

export function StaggerItem({ children, className, style }: { children: React.ReactNode; className?: string; style?: React.CSSProperties }) {
  return (
    <motion.div
      variants={{
        hidden: { opacity: 0, y: 30, filter: "blur(8px)" },
        visible: { opacity: 1, y: 0, filter: "blur(0px)", transition: { duration: 0.7, ease: [0.16, 1, 0.3, 1] } },
      }}
      className={className}
      style={style}
    >
      {children}
    </motion.div>
  );
}

export function GlassCard({ children, className, style, hover = true }: {
  children: React.ReactNode;
  className?: string;
  style?: React.CSSProperties;
  hover?: boolean;
}) {
  return (
    <motion.div
      className={className}
      style={{
        background: "rgba(13, 19, 27, 0.6)",
        backdropFilter: "blur(20px)",
        WebkitBackdropFilter: "blur(20px)",
        border: "1px solid rgba(10, 240, 184, 0.08)",
        borderRadius: "16px",
        boxShadow: "0 8px 32px rgba(0,0,0,0.4), inset 0 1px 0 rgba(255,255,255,0.04)",
        ...style,
      }}
      whileHover={hover ? {
        borderColor: "rgba(10, 240, 184, 0.25)",
        boxShadow: "0 16px 48px rgba(0,0,0,0.5), 0 0 0 1px rgba(10,240,184,0.1), inset 0 1px 0 rgba(255,255,255,0.06)",
        y: -6,
        transition: { duration: 0.4, ease: [0.16, 1, 0.3, 1] },
      } : undefined}
    >
      {children}
    </motion.div>
  );
}
