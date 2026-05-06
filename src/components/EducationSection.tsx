"use client";
import { motion } from "framer-motion";
import { StaggerChildren, StaggerItem, FadeUpSection } from "./Animations";
import type { PortfolioRaw } from "@/data/fetchPortfolio";

type Edu = PortfolioRaw["education"][number];

export default function EducationSection({ education }: { education: Edu[] }) {
  return (
    <section id="education" style={{ padding: "6rem 2rem", position: "relative", zIndex: 2 }}>
      <div style={{ maxWidth: 1200, margin: "0 auto" }}>
        <FadeUpSection>
          <div style={{ marginBottom: "4rem" }}>
            <p style={{ fontFamily: "var(--primary)", fontSize: "0.75rem", letterSpacing: "0.2em", color: "var(--accent)", marginBottom: "0.6rem" }}>
              ACADEMIC FOUNDATION
            </p>
            <h2 style={{ fontFamily: "var(--primary)", fontSize: "clamp(2rem, 4vw, 3rem)", fontWeight: 700, color: "var(--txt-bright)", letterSpacing: "-0.02em", lineHeight: 1 }}>
              Education
            </h2>
            <div style={{ marginTop: "1.5rem", height: 1, background: "linear-gradient(to right, rgba(10,240,184,0.3), transparent)" }} />
          </div>
        </FadeUpSection>

        <StaggerChildren style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "1.5rem" } as any}>
          {education.map((e, i) => (
            <StaggerItem key={i}>
              <motion.div
                style={{
                  background: "rgba(13,19,27,0.7)",
                  backdropFilter: "blur(20px)",
                  WebkitBackdropFilter: "blur(20px)",
                  border: "1px solid rgba(255,255,255,0.06)",
                  borderRadius: 20,
                  padding: "1.8rem",
                  position: "relative",
                  overflow: "hidden",
                  height: "100%",
                }}
                whileHover={{
                  y: -4,
                  borderColor: "rgba(10,240,184,0.15)",
                  boxShadow: "0 10px 40px rgba(0,0,0,0.4), 0 0 15px rgba(10,240,184,0.05)",
                  transition: { duration: 0.3, ease: [0.16, 1, 0.3, 1] },
                }}
              >
                {/* Degree */}
                <div style={{ fontFamily: "var(--primary)", fontSize: "1.1rem", fontWeight: 700, color: "var(--txt-bright)", marginBottom: "0.3rem" }}>
                  {e.degree ?? e.level}
                </div>
                
                {/* Inst */}
                <div style={{ fontFamily: "var(--primary)", fontSize: "0.85rem", color: "var(--accent)", marginBottom: "0.8rem", fontWeight: 600 }}>
                  {e.institution}
                </div>

                {/* Meta */}
                <div style={{ display: "flex", flexWrap: "wrap", gap: "0.5rem", alignItems: "center", marginBottom: e.score ? "1rem" : 0 }}>
                  <span style={{ fontSize: "0.75rem", fontFamily: "var(--secondary)", color: "var(--txt-dim)", background: "rgba(255,255,255,0.04)", padding: "0.2rem 0.6rem", borderRadius: 100 }}>
                    {e.duration}
                  </span>
                  {e.stream && (
                    <span style={{ fontSize: "0.75rem", fontFamily: "var(--secondary)", color: "var(--txt-dim)", background: "rgba(255,255,255,0.04)", padding: "0.2rem 0.6rem", borderRadius: 100 }}>
                      {e.stream}
                    </span>
                  )}
                </div>

                {/* Score */}
                {e.score && (
                  <div style={{ display: "inline-flex", alignItems: "center", gap: "0.4rem", background: "rgba(10,240,184,0.06)", border: "1px solid rgba(10,240,184,0.2)", borderRadius: 100, padding: "0.2rem 0.7rem", color: "var(--accent)", fontSize: "0.75rem", fontFamily: "var(--primary)", fontWeight: 700, letterSpacing: "0.05em" }}>
                    <span style={{ width: 4, height: 4, borderRadius: "50%", background: "var(--accent)", boxShadow: "0 0 4px var(--accent)" }} />
                    {e.score}
                  </div>
                )}
              </motion.div>
            </StaggerItem>
          ))}
        </StaggerChildren>
      </div>
    </section>
  );
}
