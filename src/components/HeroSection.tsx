"use client";
import Image from "next/image";
import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";
import type { PortfolioRaw } from "@/data/fetchPortfolio";
import { BlurReveal } from "./Animations";
import MagneticButton from "./MagneticButton";

export default function HeroSection({ data }: { data: PortfolioRaw }) {
  const { name, contact } = data.candidate;
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end start"] });
  const y = useTransform(scrollYProgress, [0, 1], ["0%", "30%"]);
  const opacity = useTransform(scrollYProgress, [0, 0.6], [1, 0]);

  return (
    <section id="home" ref={ref} style={{ minHeight: "100vh", display: "flex", alignItems: "center", position: "relative", overflow: "hidden", paddingTop: 80 }}>
      {/* Decorative grid lines */}
      <div style={{
        position: "absolute", inset: 0, zIndex: 1, pointerEvents: "none",
        backgroundImage: "linear-gradient(rgba(10,240,184,0.03) 1px, transparent 1px), linear-gradient(90deg, rgba(10,240,184,0.03) 1px, transparent 1px)",
        backgroundSize: "80px 80px",
      }} />

      {/* Left social rail */}
      <motion.div
        initial={{ opacity: 0, x: -20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ delay: 1.2, duration: 0.8 }}
        style={{ position: "fixed", left: "1.6rem", top: "50%", transform: "translateY(-50%)", display: "flex", flexDirection: "column", gap: "1.2rem", zIndex: 100 }}
      >
        {[
          { href: contact.github, label: "GitHub", icon: <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor"><path d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z"/></svg> },
          { href: contact.linkedin, label: "LinkedIn", icon: <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor"><path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z"/></svg> },
          { href: `mailto:${contact.email}`, label: "Email", icon: <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8"><rect x="2" y="4" width="20" height="16" rx="2"/><path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7"/></svg> },
        ].map(({ href, label, icon }) => (
          <motion.a
            key={label} href={href} title={label} target="_blank" rel="noreferrer"
            style={{ color: "var(--txt-dim)", display: "flex" }}
            whileHover={{ color: "var(--accent)", x: 3, scale: 1.15 }}
            transition={{ duration: 0.2 }}
          >
            {icon}
          </motion.a>
        ))}
        <div style={{ width: 1, height: 60, background: "linear-gradient(to bottom, var(--txt-dim), transparent)", margin: "0 auto" }} />
      </motion.div>

      {/* Hero content */}
      <motion.div style={{ y, opacity, position: "relative", zIndex: 2, maxWidth: 1200, margin: "0 auto", padding: "4rem 2rem 4rem 5rem", width: "100%" }}>
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "4rem", alignItems: "center" }}>
          {/* Text side */}
          <div>
            {/* Eyebrow */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2, duration: 0.7 }}
              style={{
                display: "inline-flex", alignItems: "center", gap: "0.5rem",
                background: "rgba(10, 240, 184, 0.06)",
                border: "1px solid rgba(10, 240, 184, 0.2)",
                borderRadius: "100px",
                padding: "0.3rem 1rem",
                marginBottom: "1.5rem",
                fontSize: "0.72rem",
                letterSpacing: "0.16em",
                color: "var(--accent)",
                fontFamily: "var(--primary)",
              }}
            >
              <span style={{ width: 6, height: 6, borderRadius: "50%", background: "var(--accent)", boxShadow: "0 0 8px var(--accent)", animation: "blink 2s ease-in-out infinite" }} />
              AI · ML · FULL-STACK ENGINEER
            </motion.div>

            {/* Headline */}
            <h1 style={{ fontSize: "clamp(2.8rem, 5vw, 4.5rem)", fontFamily: "var(--primary)", fontWeight: 700, lineHeight: 1.1, color: "var(--txt-bright)", marginBottom: "1.8rem", letterSpacing: "-0.02em" }}>
              <motion.span style={{ display: "block" }} initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.35, duration: 0.9, ease: [0.16, 1, 0.3, 1] }}>
                {name.split(" ")[0]}
              </motion.span>
              <motion.span
                style={{ display: "block", background: "linear-gradient(120deg, #0af0b8 0%, #3ba2ea 50%, #8a2be2 100%)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent", backgroundClip: "text" }}
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.5, duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
              >
                builds systems
              </motion.span>
              <motion.span style={{ display: "block" }} initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.65, duration: 0.9, ease: [0.16, 1, 0.3, 1] }}>
                that <span style={{ color: "var(--accent)" }}>ship.</span>
              </motion.span>
            </h1>

            {/* Sub */}
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.85, duration: 0.8 }}
              style={{ fontFamily: "var(--secondary)", fontSize: "1rem", color: "var(--txt)", maxWidth: 480, lineHeight: 1.85, marginBottom: "2.5rem" }}
            >
              AI &amp; ML Engineer architecting real-time intelligent systems, scalable LLM pipelines, and robust backend infrastructure — from research to production.
            </motion.p>

            {/* CTAs */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 1.05, duration: 0.7 }}
              style={{ display: "flex", gap: "1rem", flexWrap: "wrap" }}
            >
              <MagneticButton href="#contacts" style={{
                padding: "0.75rem 2rem",
                background: "linear-gradient(135deg, #0af0b8, #3ba2ea)",
                color: "#050810",
                fontFamily: "var(--primary)",
                fontWeight: 700,
                fontSize: "0.9rem",
                letterSpacing: "0.06em",
                borderRadius: "100px",
                textDecoration: "none",
                boxShadow: "0 8px 30px rgba(10,240,184,0.3)",
              }}>
                Get in touch →
              </MagneticButton>
              <MagneticButton href="#projects" style={{
                padding: "0.75rem 2rem",
                background: "transparent",
                color: "var(--txt-bright)",
                fontFamily: "var(--primary)",
                fontWeight: 600,
                fontSize: "0.9rem",
                letterSpacing: "0.06em",
                borderRadius: "100px",
                textDecoration: "none",
                border: "1px solid rgba(255,255,255,0.12)",
              }}>
                View work
              </MagneticButton>
            </motion.div>
          </div>

          {/* Image side */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9, x: 40 }}
            animate={{ opacity: 1, scale: 1, x: 0 }}
            transition={{ delay: 0.4, duration: 1.1, ease: [0.16, 1, 0.3, 1] }}
            style={{ display: "flex", justifyContent: "flex-end", position: "relative" }}
          >
            {/* Glow behind image */}
            <div style={{ position: "absolute", inset: -30, background: "radial-gradient(ellipse at center, rgba(10,240,184,0.1) 0%, transparent 70%)", borderRadius: "50%", zIndex: 0 }} />

            <div style={{
              position: "relative", width: 380, height: 490, zIndex: 1,
              border: "1px solid rgba(10,240,184,0.12)",
              borderRadius: 20,
              overflow: "hidden",
              boxShadow: "0 30px 80px rgba(0,0,0,0.6), 0 0 0 1px rgba(10,240,184,0.06)",
            }}>
              <Image src="/hero.png" alt={name} fill sizes="380px" style={{ objectFit: "cover", objectPosition: "center top" }} priority />
              {/* Glass overlay at bottom */}
              <div style={{
                position: "absolute", bottom: 0, left: 0, right: 0, padding: "1rem",
                background: "linear-gradient(to top, rgba(5,8,12,0.9) 0%, transparent 100%)",
              }}>
                <div style={{
                  display: "flex", alignItems: "center", gap: "0.6rem",
                  background: "rgba(10,240,184,0.08)",
                  backdropFilter: "blur(12px)",
                  border: "1px solid rgba(10,240,184,0.2)",
                  borderRadius: 100,
                  padding: "0.4rem 0.9rem",
                  fontSize: "0.72rem", color: "var(--txt-2)", fontFamily: "var(--secondary)",
                }}>
                  <span style={{ width: 6, height: 6, borderRadius: "50%", background: "var(--accent)", boxShadow: "0 0 8px var(--accent)", animation: "blink 2s ease-in-out infinite" }} />
                  Open to internships &amp; research roles
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </motion.div>

      {/* Scroll hint */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.5 }}
        style={{ position: "absolute", bottom: 30, left: "50%", transform: "translateX(-50%)", display: "flex", flexDirection: "column", alignItems: "center", gap: 6, zIndex: 2, color: "var(--txt-dim)", fontSize: "0.65rem", letterSpacing: "0.1em", fontFamily: "var(--primary)" }}
      >
        SCROLL
        <motion.div
          animate={{ y: [0, 6, 0] }}
          transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
          style={{ width: 1, height: 30, background: "linear-gradient(to bottom, var(--accent), transparent)" }}
        />
      </motion.div>
    </section>
  );
}
