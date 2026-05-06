"use client";
import { motion } from "framer-motion";
import { FadeUpSection } from "./Animations";

export default function QuoteSection() {
  return (
    <section style={{ padding: "8rem 2rem", position: "relative", zIndex: 2 }}>
      <div style={{ maxWidth: 800, margin: "0 auto", textAlign: "center" }}>
        <FadeUpSection>
          <motion.div
            style={{
              position: "relative",
              padding: "4rem 2rem",
            }}
          >
            {/* Large quotes deco */}
            <div style={{
              position: "absolute", top: 0, left: "50%", transform: "translateX(-50%)",
              fontSize: "8rem", color: "rgba(10,240,184,0.05)",
              fontFamily: "var(--primary)", lineHeight: 1, pointerEvents: "none",
              zIndex: 0
            }}>
              &ldquo;
            </div>

            <p style={{
              position: "relative", zIndex: 1,
              fontFamily: "var(--primary)", fontSize: "clamp(1.5rem, 4vw, 2.5rem)",
              fontWeight: 600, color: "var(--txt-bright)", lineHeight: 1.4,
              letterSpacing: "-0.02em", marginBottom: "2rem"
            }}>
              Simplicity is prerequisite for reliability.
            </p>
            
            <div style={{
              display: "flex", alignItems: "center", justifyContent: "center", gap: "1rem"
            }}>
              <div style={{ width: 40, height: 1, background: "rgba(10,240,184,0.4)" }} />
              <p style={{
                fontFamily: "var(--secondary)", fontSize: "1rem", color: "var(--accent)",
                letterSpacing: "0.1em", fontWeight: 500
              }}>
                EDSGER W. DIJKSTRA
              </p>
              <div style={{ width: 40, height: 1, background: "rgba(10,240,184,0.4)" }} />
            </div>
          </motion.div>
        </FadeUpSection>
      </div>
    </section>
  );
}
