"use client";
import { motion } from "framer-motion";
import { GlassCard, StaggerChildren, StaggerItem, FadeUpSection } from "./Animations";
import MagneticButton from "./MagneticButton";
import type { PortfolioRaw } from "@/data/fetchPortfolio";

type Exp = PortfolioRaw["experience"][number];

export default function ExperienceSection({ experience }: { experience: Exp[] }) {
  return (
    <section id="experience" style={{ padding: "6rem 2rem", position: "relative", zIndex: 2 }}>
      <div style={{ maxWidth: 1200, margin: "0 auto" }}>
        <FadeUpSection>
          <div style={{ marginBottom: "4rem" }}>
            <p style={{ fontFamily: "var(--primary)", fontSize: "0.75rem", letterSpacing: "0.2em", color: "var(--accent)", marginBottom: "0.6rem" }}>
              PROFESSIONAL EXPERIENCE
            </p>
            <h2 style={{ fontFamily: "var(--primary)", fontSize: "clamp(2rem, 4vw, 3rem)", fontWeight: 700, color: "var(--txt-bright)", letterSpacing: "-0.02em", lineHeight: 1 }}>
              Experience
            </h2>
            <div style={{ marginTop: "1.5rem", height: 1, background: "linear-gradient(to right, rgba(10,240,184,0.3), transparent)" }} />
          </div>
        </FadeUpSection>

        <StaggerChildren style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "1.5rem" } as any}>
          {experience.map((e) => (
            <StaggerItem key={e.role}>
              <motion.div
                style={{
                  background: "rgba(13,19,27,0.7)",
                  backdropFilter: "blur(24px)",
                  WebkitBackdropFilter: "blur(24px)",
                  border: "1px solid rgba(255,255,255,0.06)",
                  borderRadius: 20,
                  padding: "2rem",
                  position: "relative",
                  overflow: "hidden",
                  height: "100%",
                  boxShadow: "0 8px 40px rgba(0,0,0,0.35)",
                }}
                whileHover={{
                  y: -6,
                  borderColor: "rgba(10,240,184,0.2)",
                  boxShadow: "0 16px 50px rgba(0,0,0,0.5), 0 0 0 1px rgba(10,240,184,0.08)",
                  transition: { duration: 0.4, ease: [0.16, 1, 0.3, 1] },
                }}
              >
                {/* Accent bar */}
                <motion.div
                  style={{ position: "absolute", top: 0, left: 0, width: 3, height: "100%", background: "linear-gradient(to bottom, var(--accent), transparent)", borderRadius: "20px 0 0 20px" }}
                  whileHover={{ width: 5 }}
                  transition={{ duration: 0.3 }}
                />

                {/* Glow orb behind */}
                <div style={{ position: "absolute", top: -40, right: -40, width: 140, height: 140, borderRadius: "50%", background: "radial-gradient(circle, rgba(10,240,184,0.04), transparent)", pointerEvents: "none" }} />

                <div style={{ paddingLeft: "0.5rem" }}>
                  {/* Role */}
                  <div style={{ fontFamily: "var(--primary)", fontSize: "1.15rem", fontWeight: 700, color: "var(--txt-bright)", marginBottom: "0.3rem", letterSpacing: "0.01em" }}>
                    {e.role}
                  </div>

                  {/* Org + Duration */}
                  <div style={{ display: "flex", alignItems: "center", gap: "0.75rem", marginBottom: "1rem", flexWrap: "wrap" }}>
                    <span style={{ fontFamily: "var(--primary)", fontSize: "0.85rem", color: "var(--accent)", fontWeight: 600 }}>{e.organization}</span>
                    <span style={{ width: 4, height: 4, borderRadius: "50%", background: "var(--txt-dim)" }} />
                    <span style={{ fontFamily: "var(--secondary)", fontSize: "0.75rem", color: "var(--txt-dim)" }}>{e.duration}</span>
                  </div>

                  {/* Tech stack */}
                  <div style={{ display: "flex", flexWrap: "wrap", gap: "0.3rem", marginBottom: "1.2rem" }}>
                    {e.techStack.map((t) => (
                      <span key={t} style={{
                        fontSize: "0.62rem", padding: "0.18rem 0.55rem",
                        background: "rgba(10,240,184,0.06)",
                        border: "1px solid rgba(10,240,184,0.15)",
                        borderRadius: 100,
                        color: "var(--accent)",
                        fontFamily: "var(--primary)",
                        letterSpacing: "0.04em",
                      }}>
                        {t}
                      </span>
                    ))}
                  </div>

                  {/* Highlights */}
                  <ul style={{ listStyle: "none", display: "flex", flexDirection: "column", gap: "0.6rem", marginBottom: "1.4rem" }}>
                    {e.highlights.map((h, i) => (
                      <motion.li
                        key={i}
                        initial={{ opacity: 0, x: -10 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        transition={{ delay: i * 0.08, duration: 0.5 }}
                        viewport={{ once: true }}
                        style={{ fontFamily: "var(--secondary)", fontSize: "0.82rem", color: "var(--txt)", lineHeight: 1.65, paddingLeft: "1.2rem", position: "relative" }}
                      >
                        <span style={{ position: "absolute", left: 0, color: "var(--accent)", fontWeight: 900 }}>›</span>
                        {h}
                      </motion.li>
                    ))}
                  </ul>

                  {e.projectLink && (
                    <MagneticButton
                      href={e.projectLink}
                      style={{
                        padding: "0.5rem 1.2rem",
                        background: "transparent",
                        color: "var(--accent)",
                        border: "1px solid rgba(10,240,184,0.25)",
                        borderRadius: 100,
                        fontFamily: "var(--primary)",
                        fontSize: "0.78rem",
                        letterSpacing: "0.06em",
                        textDecoration: "none",
                      }}
                      strength={0.2}
                    >
                      GitHub ↗
                    </MagneticButton>
                  )}
                </div>
              </motion.div>
            </StaggerItem>
          ))}
        </StaggerChildren>
      </div>
    </section>
  );
}
