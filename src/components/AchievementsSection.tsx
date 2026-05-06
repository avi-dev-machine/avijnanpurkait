"use client";
import { motion } from "framer-motion";
import { StaggerChildren, StaggerItem, FadeUpSection } from "./Animations";

export default function AchievementsSection({ achievements }: { achievements: string[] }) {
  return (
    <section id="achievements" style={{ padding: "6rem 2rem", position: "relative", zIndex: 2 }}>
      <div style={{ maxWidth: 1200, margin: "0 auto" }}>
        <FadeUpSection>
          <div style={{ marginBottom: "3rem", display: "flex", alignItems: "center", gap: "1rem" }}>
            <h2 style={{ fontFamily: "var(--primary)", fontSize: "clamp(1.5rem, 3vw, 2.2rem)", fontWeight: 700, color: "var(--txt-bright)", letterSpacing: "-0.02em", margin: 0 }}>
              Achievements &amp; Honours
            </h2>
            <div style={{ flex: 1, height: 1, background: "linear-gradient(to right, rgba(138,43,226,0.4), transparent)" }} />
          </div>
        </FadeUpSection>

        <StaggerChildren style={{ display: "grid", gridTemplateColumns: "1fr", gap: "0.8rem" } as any}>
          {achievements.map((a, i) => (
            <StaggerItem key={i}>
              <motion.div
                style={{
                  background: "rgba(13,19,27,0.4)",
                  backdropFilter: "blur(12px)",
                  border: "1px solid rgba(255,255,255,0.03)",
                  borderRadius: 12,
                  padding: "1rem 1.4rem",
                  display: "flex",
                  alignItems: "flex-start",
                  gap: "1rem",
                }}
                whileHover={{
                  x: 8,
                  background: "rgba(13,19,27,0.8)",
                  borderColor: "rgba(138,43,226,0.3)",
                  boxShadow: "0 4px 20px rgba(138,43,226,0.1)",
                  transition: { duration: 0.2 },
                }}
              >
                <div style={{
                  color: "#8a2be2",
                  fontSize: "1.2rem",
                  lineHeight: 1,
                  marginTop: "0.1rem"
                }}>
                  ✦
                </div>
                <div style={{ fontFamily: "var(--secondary)", fontSize: "0.9rem", color: "var(--txt)", lineHeight: 1.6 }}>
                  {a}
                </div>
              </motion.div>
            </StaggerItem>
          ))}
        </StaggerChildren>
      </div>
    </section>
  );
}
