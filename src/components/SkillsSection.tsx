"use client";
import { motion } from "framer-motion";
import { StaggerChildren, StaggerItem, FadeUpSection } from "./Animations";
import type { PortfolioRaw } from "@/data/fetchPortfolio";

type Skills = PortfolioRaw["technicalSkills"];

const CAT_COLORS: Record<string, string> = {
  "Languages":       "#0af0b8",
  "AI / ML":         "#a78bfa",
  "Generative AI":   "#8a2be2",
  "Computer Vision": "#22d3ee",
  "Frameworks":      "#3ba2ea",
  "Libraries":       "#0af0b8",
  "Systems":         "#e0b751",
  "Core CS":         "#e86464",
};

export default function SkillsSection({ skills }: { skills: Skills }) {
  return (
    <section id="skills" style={{ padding: "6rem 2rem", position: "relative", zIndex: 2 }}>
      <div style={{ maxWidth: 1200, margin: "0 auto" }}>
        <FadeUpSection>
          <div style={{ marginBottom: "4rem" }}>
            <p style={{ fontFamily: "var(--primary)", fontSize: "0.75rem", letterSpacing: "0.2em", color: "var(--accent)", marginBottom: "0.6rem" }}>
              TECHNICAL ARSENAL
            </p>
            <h2 style={{ fontFamily: "var(--primary)", fontSize: "clamp(2rem, 4vw, 3rem)", fontWeight: 700, color: "var(--txt-bright)", letterSpacing: "-0.02em", lineHeight: 1 }}>
              Skills
            </h2>
            <div style={{ marginTop: "1.5rem", height: 1, background: "linear-gradient(to right, rgba(10,240,184,0.3), transparent)" }} />
          </div>
        </FadeUpSection>

        <StaggerChildren style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: "1rem" } as any}>
          {Object.entries(skills).map(([cat, items]) => {
            const clr = CAT_COLORS[cat] ?? "#0af0b8";
            return (
              <StaggerItem key={cat}>
                <motion.div
                  style={{
                    background: "rgba(13,19,27,0.7)",
                    backdropFilter: "blur(20px)",
                    WebkitBackdropFilter: "blur(20px)",
                    border: "1px solid rgba(255,255,255,0.06)",
                    borderRadius: 16,
                    padding: "1.4rem",
                    position: "relative",
                    overflow: "hidden",
                    height: "100%",
                  }}
                  whileHover={{
                    y: -5,
                    borderColor: `${clr}30`,
                    boxShadow: `0 12px 40px rgba(0,0,0,0.4), 0 0 20px ${clr}0a`,
                    transition: { duration: 0.3, ease: [0.16, 1, 0.3, 1] },
                  }}
                >
                  {/* Top glow line */}
                  <div style={{ position: "absolute", top: 0, left: "20%", right: "20%", height: 1, background: `linear-gradient(to right, transparent, ${clr}60, transparent)` }} />

                  {/* Category label */}
                  <div style={{
                    fontFamily: "var(--primary)", fontSize: "0.72rem", fontWeight: 700,
                    letterSpacing: "0.1em", color: clr,
                    marginBottom: "1rem", paddingBottom: "0.7rem",
                    borderBottom: `1px solid ${clr}18`,
                    display: "flex", alignItems: "center", gap: "0.5rem",
                  }}>
                    <span style={{ width: 6, height: 6, borderRadius: "50%", background: clr, boxShadow: `0 0 8px ${clr}` }} />
                    {cat.toUpperCase()}
                  </div>

                  {/* Items */}
                  <div style={{ display: "flex", flexDirection: "column", gap: "0.5rem" }}>
                    {(items as string[]).map((skill) => (
                      <motion.div
                        key={skill}
                        whileHover={{ x: 4, color: "var(--txt-bright)" }}
                        style={{
                          fontFamily: "var(--secondary)", fontSize: "0.82rem",
                          color: "var(--txt)", cursor: "default",
                          display: "flex", alignItems: "center", gap: "0.5rem",
                          transition: "color 0.2s",
                        }}
                      >
                        <span style={{ width: 3, height: 3, borderRadius: "50%", background: "var(--txt-dim)", flexShrink: 0 }} />
                        {skill}
                      </motion.div>
                    ))}
                  </div>
                </motion.div>
              </StaggerItem>
            );
          })}
        </StaggerChildren>
      </div>
    </section>
  );
}
