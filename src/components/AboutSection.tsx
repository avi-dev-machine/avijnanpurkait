"use client";
import Image from "next/image";
import { motion } from "framer-motion";
import { FadeUpSection, GlassCard } from "./Animations";
import MagneticButton from "./MagneticButton";
import type { PortfolioRaw } from "@/data/fetchPortfolio";

export default function AboutSection({ data }: { data: PortfolioRaw }) {
  const { name } = data.candidate;
  return (
    <section id="about-me" style={{ padding: "6rem 2rem", position: "relative", zIndex: 2 }}>
      <div style={{ maxWidth: 1200, margin: "0 auto" }}>
        <FadeUpSection>
          <div style={{ marginBottom: "4rem" }}>
            <p style={{ fontFamily: "var(--primary)", fontSize: "0.75rem", letterSpacing: "0.2em", color: "var(--accent)", marginBottom: "0.6rem" }}>
              THE ARCHITECT
            </p>
            <h2 style={{ fontFamily: "var(--primary)", fontSize: "clamp(2rem, 4vw, 3rem)", fontWeight: 700, color: "var(--txt-bright)", letterSpacing: "-0.02em", lineHeight: 1 }}>
              About
            </h2>
            <div style={{ marginTop: "1.5rem", height: 1, background: "linear-gradient(to right, rgba(10,240,184,0.3), transparent)" }} />
          </div>
        </FadeUpSection>

        <div style={{ display: "grid", gridTemplateColumns: "1.2fr 0.8fr", gap: "4rem", alignItems: "center" }}>
          {/* Text block */}
          <FadeUpSection delay={0.2}>
            <div style={{ fontFamily: "var(--secondary)", fontSize: "1rem", color: "var(--txt)", lineHeight: 1.8, display: "flex", flexDirection: "column", gap: "1.5rem" }}>
              <p style={{ fontSize: "1.2rem", color: "var(--txt-bright)", fontFamily: "var(--primary)", fontWeight: 600 }}>
                Hello — I&apos;m <span style={{ color: "var(--accent)" }}>{name}</span>.
              </p>
              <p>{data.summary}</p>
              <p>
                My professional trajectory encompasses distinguished research internships at <span style={{ color: "var(--txt-bright)" }}>Jadavpur University</span> and the{" "}
                <span style={{ color: "var(--txt-bright)" }}>University of New Mexico</span>, top-tier placements in national-level hackathons, and the engineering of production systems deployed for active end-users. I am profoundly committed to developing architectures that exhibit rigorous reliability under load, structural elegance, and tangible real-world utility.
              </p>
              <p>
                Presently situated in <span style={{ color: "var(--txt-bright)" }}>Kolkata, India</span>, I am pursuing my Bachelor of Technology at the{" "}
                <span style={{ color: "var(--txt-bright)" }}>Heritage Institute of Technology</span> (2023–2027).
              </p>
              <div style={{ marginTop: "1rem" }}>
                <MagneticButton href="#contacts" style={{
                  padding: "0.6rem 1.6rem",
                  background: "rgba(10,240,184,0.08)",
                  color: "var(--accent)",
                  border: "1px solid rgba(10,240,184,0.3)",
                  borderRadius: 100,
                  fontFamily: "var(--primary)",
                  fontWeight: 600,
                  fontSize: "0.85rem",
                  letterSpacing: "0.06em",
                  textDecoration: "none",
                }}>
                  Let&apos;s connect →
                </MagneticButton>
              </div>
            </div>
          </FadeUpSection>

          {/* Image block */}
          <FadeUpSection delay={0.4}>
            <div style={{ position: "relative" }}>
              {/* Deco grid */}
              <motion.div
                animate={{ rotate: 360 }}
                transition={{ duration: 100, repeat: Infinity, ease: "linear" }}
                style={{ position: "absolute", top: -30, right: -30, width: 200, height: 200, border: "1px dashed rgba(10,240,184,0.2)", borderRadius: "50%", zIndex: 0 }}
              />
              
              <GlassCard hover={false} style={{ padding: "0.5rem", borderRadius: 24, zIndex: 1, position: "relative" }}>
                <div style={{ position: "relative", borderRadius: 20, overflow: "hidden", aspectRatio: "3.5/4" }}>
                  <Image src="/about.png" alt="Workspace" fill sizes="400px" style={{ objectFit: "cover" }} />
                  {/* Glare overlay */}
                  <div style={{ position: "absolute", inset: 0, background: "linear-gradient(120deg, rgba(255,255,255,0.1) 0%, transparent 50%)" }} />
                </div>
              </GlassCard>
            </div>
          </FadeUpSection>
        </div>
      </div>
    </section>
  );
}
