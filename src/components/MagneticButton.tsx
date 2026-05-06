"use client";
import { useRef, useCallback } from "react";
import { motion, useSpring } from "framer-motion";

export default function MagneticButton({
  children,
  href,
  className,
  style,
  strength = 0.3,
}: {
  children: React.ReactNode;
  href?: string;
  className?: string;
  style?: React.CSSProperties;
  strength?: number;
}) {
  const ref = useRef<HTMLAnchorElement & HTMLButtonElement>(null);
  const x = useSpring(0, { stiffness: 300, damping: 20 });
  const y = useSpring(0, { stiffness: 300, damping: 20 });

  const onMove = useCallback((e: React.MouseEvent) => {
    const el = ref.current;
    if (!el) return;
    const rect = el.getBoundingClientRect();
    const cx = rect.left + rect.width / 2;
    const cy = rect.top + rect.height / 2;
    x.set((e.clientX - cx) * strength);
    y.set((e.clientY - cy) * strength);
  }, [x, y, strength]);

  const onLeave = useCallback(() => {
    x.set(0); y.set(0);
  }, [x, y]);

  const Tag = href ? motion.a : motion.button;

  return (
    <Tag
      ref={ref as any}
      href={href}
      className={className}
      style={style}
      onMouseMove={onMove}
      onMouseLeave={onLeave}
      whileHover={{ scale: 1.04 }}
      whileTap={{ scale: 0.97 }}
      // @ts-ignore
      style={{ x, y, display: "inline-flex", ...style }}
    >
      {children}
    </Tag>
  );
}
