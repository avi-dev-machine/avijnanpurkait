"use client";
import { useEffect, useRef } from "react";

export default function Aurora() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let animId: number;
    let t = 0;

    const resize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    resize();
    window.addEventListener("resize", resize);

    const blobs = [
      { x: 0.2, y: 0.3, r: 0.45, color: "10, 240, 184" },
      { x: 0.75, y: 0.2, r: 0.40, color: "138, 43, 226" },
      { x: 0.5, y: 0.7, r: 0.35, color: "59, 162, 234" },
      { x: 0.85, y: 0.65, r: 0.30, color: "10, 240, 184" },
    ];

    const draw = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      t += 0.003;

      blobs.forEach((b, i) => {
        const ox = Math.sin(t + i * 1.2) * 0.08;
        const oy = Math.cos(t * 0.8 + i * 0.9) * 0.06;
        const cx = (b.x + ox) * canvas.width;
        const cy = (b.y + oy) * canvas.height;
        const r = b.r * Math.min(canvas.width, canvas.height);

        const grad = ctx.createRadialGradient(cx, cy, 0, cx, cy, r);
        grad.addColorStop(0, `rgba(${b.color}, 0.12)`);
        grad.addColorStop(0.5, `rgba(${b.color}, 0.04)`);
        grad.addColorStop(1, `rgba(${b.color}, 0)`);

        ctx.fillStyle = grad;
        ctx.beginPath();
        ctx.arc(cx, cy, r, 0, Math.PI * 2);
        ctx.fill();
      });

      animId = requestAnimationFrame(draw);
    };

    draw();
    return () => {
      cancelAnimationFrame(animId);
      window.removeEventListener("resize", resize);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      style={{
        position: "fixed",
        top: 0, left: 0,
        width: "100%", height: "100%",
        zIndex: 0,
        pointerEvents: "none",
      }}
    />
  );
}
