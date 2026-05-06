"use client";
import Image from "next/image";
import { motion } from "framer-motion";
import { GlassCard, StaggerChildren, StaggerItem, FadeUpSection } from "./Animations";
import MagneticButton from "./MagneticButton";
import type { PortfolioRaw } from "@/data/fetchPortfolio";

type Project = PortfolioRaw["projects"][number];

const DOMAIN_CLR: Record<string, { bg: string; text: string }> = {
  "Real-Time Systems": { bg: "rgba(224,183,81,0.12)", text: "#e0b751" },
  "Social Impact":     { bg: "rgba(10,240,184,0.12)", text: "#0af0b8" },
  LLMs:                { bg: "rgba(167,139,250,0.12)", text: "#a78bfa" },
  "Generative AI":     { bg: "rgba(167,139,250,0.12)", text: "#a78bfa" },
  "Full-Stack":        { bg: "rgba(59,162,234,0.12)", text: "#3ba2ea" },
  "Computer Vision":   { bg: "rgba(34,211,238,0.12)", text: "#22d3ee" },
  "Real-Time AI":      { bg: "rgba(34,211,238,0.12)", text: "#22d3ee" },
};

function ProjectCard({ p, idx }: { p: Project; idx: number }) {
  let thumb = "/thumb_nlp.png";
  if (p.name.includes("SetuKa")) thumb = "/thumb_setuka.png";
  else if (p.name.includes("Syllabyte")) thumb = "/thumb_syllabyte.png";
  else if (p.name.includes("FitVision")) thumb = "/thumb_fitvision.png";
  else if (p.name.includes("NLP")) thumb = "/thumb_nlp.png";
  else if (p.name.includes("ShapeUp")) thumb = "/thumb_shapeup.png";
  else if (p.name.includes("Organ Donation")) thumb = "/thumb_organ_donation.png";

  return (
    <StaggerItem>
      <motion.div
        style={{
          background: "rgba(13,19,27,0.7)",
          backdropFilter: "blur(24px)",
          WebkitBackdropFilter: "blur(24px)",
          border: "1px solid rgba(255,255,255,0.06)",
          borderRadius: 20,
          overflow: "hidden",
          boxShadow: "0 8px 40px rgba(0,0,0,0.4)",
          display: "flex",
          flexDirection: "column",
          height: "100%",
        }}
        whileHover={{
          y: -10,
          borderColor: "rgba(10,240,184,0.2)",
          boxShadow: "0 20px 60px rgba(0,0,0,0.5), 0 0 30px rgba(10,240,184,0.06)",
          transition: { duration: 0.4, ease: [0.16, 1, 0.3, 1] },
        }}
      >
        {/* Thumbnail */}
        <div style={{ position: "relative", height: 200, overflow: "hidden" }}>
          <motion.div
            style={{ position: "absolute", inset: 0 }}
            whileHover={{ scale: 1.06 }}
            transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
          >
            <Image src={thumb} alt={p.name} fill style={{ objectFit: "cover", objectPosition: "center top" }} sizes="400px" priority={idx < 4} />
            {/* Gradient overlay */}
            <div style={{ position: "absolute", inset: 0, background: "linear-gradient(to bottom, transparent 50%, rgba(13,19,27,0.9) 100%)" }} />
          </motion.div>

          {/* Badge */}
          {p.badge && (
            <div style={{
              position: "absolute", top: 12, right: 12,
              background: "rgba(10,240,184,0.12)",
              backdropFilter: "blur(8px)",
              border: "1px solid rgba(10,240,184,0.3)",
              borderRadius: 100,
              padding: "0.2rem 0.7rem",
              fontSize: "0.6rem",
              color: "var(--accent)",
              fontFamily: "var(--primary)",
              letterSpacing: "0.08em",
              fontWeight: 700,
            }}>
              ★ {p.badge}
            </div>
          )}

          {/* Domain pills */}
          <div style={{ position: "absolute", bottom: 10, left: 10, display: "flex", gap: 5, flexWrap: "wrap" }}>
            {p.domain.map((d) => {
              const clr = DOMAIN_CLR[d] ?? { bg: "rgba(255,255,255,0.06)", text: "#7a8fa8" };
              return (
                <span key={d} style={{
                  background: clr.bg,
                  backdropFilter: "blur(6px)",
                  border: `1px solid ${clr.text}33`,
                  borderRadius: 100,
                  padding: "0.15rem 0.55rem",
                  fontSize: "0.58rem",
                  color: clr.text,
                  fontFamily: "var(--primary)",
                  letterSpacing: "0.06em",
                }}>
                  {d}
                </span>
              );
            })}
          </div>
        </div>

        {/* Body */}
        <div style={{ padding: "1.25rem 1.4rem", flex: 1, display: "flex", flexDirection: "column", gap: "0.75rem" }}>
          {/* Tech stack */}
          <div style={{ display: "flex", flexWrap: "wrap", gap: "0.35rem" }}>
            {p.techStack.map((t) => (
              <span key={t} style={{
                fontSize: "0.62rem", padding: "0.15rem 0.5rem",
                background: "rgba(255,255,255,0.04)",
                border: "1px solid rgba(255,255,255,0.08)",
                borderRadius: 6,
                color: "var(--txt-dim)",
                fontFamily: "var(--secondary)",
                letterSpacing: "0.04em",
              }}>
                {t}
              </span>
            ))}
          </div>

          {/* Name */}
          <div style={{ fontFamily: "var(--primary)", fontWeight: 700, fontSize: "1.05rem", color: "var(--txt-bright)", letterSpacing: "0.01em" }}>
            {p.name}
          </div>

          {/* Description */}
          <p style={{ fontFamily: "var(--secondary)", fontSize: "0.8rem", color: "var(--txt)", lineHeight: 1.7, flex: 1 }}>
            {p.description[0]}
          </p>

          {/* CTA */}
          <MagneticButton
            href={p.link}
            style={{
              padding: "0.55rem 1.4rem",
              background: "transparent",
              color: "var(--accent)",
              border: "1px solid rgba(10,240,184,0.25)",
              borderRadius: 100,
              fontFamily: "var(--primary)",
              fontWeight: 600,
              fontSize: "0.78rem",
              letterSpacing: "0.06em",
              textDecoration: "none",
              alignSelf: "flex-start",
            }}
            strength={0.2}
          >
            View project ↗
          </MagneticButton>
        </div>
      </motion.div>
    </StaggerItem>
  );
}

export default function ProjectsSection({ projects }: { projects: Project[] }) {
  return (
    <section id="projects" style={{ padding: "8rem 2rem 6rem", position: "relative", zIndex: 2 }}>
      <div style={{ maxWidth: 1200, margin: "0 auto" }}>
        <FadeUpSection>
          <div style={{ marginBottom: "4rem" }}>
            <div style={{ display: "flex", alignItems: "flex-end", justifyContent: "space-between", flexWrap: "wrap", gap: "1rem" }}>
              <div>
                <p style={{ fontFamily: "var(--primary)", fontSize: "0.75rem", letterSpacing: "0.2em", color: "var(--accent)", marginBottom: "0.6rem" }}>
                  SELECTED WORK
                </p>
                <h2 style={{ fontFamily: "var(--primary)", fontSize: "clamp(2rem, 4vw, 3rem)", fontWeight: 700, color: "var(--txt-bright)", letterSpacing: "-0.02em", lineHeight: 1 }}>
                  Projects
                </h2>
              </div>
              <MagneticButton
                href="https://github.com/avi-dev-machine"
                style={{
                  padding: "0.55rem 1.4rem",
                  background: "rgba(10,240,184,0.04)",
                  border: "1px solid rgba(10,240,184,0.15)",
                  borderRadius: 100,
                  color: "var(--txt-2)",
                  fontFamily: "var(--primary)",
                  fontSize: "0.8rem",
                  letterSpacing: "0.06em",
                  textDecoration: "none",
                }}
              >
                All repos →
              </MagneticButton>
            </div>
            <div style={{ marginTop: "1.5rem", height: 1, background: "linear-gradient(to right, rgba(10,240,184,0.3), transparent)" }} />
          </div>
        </FadeUpSection>

        <StaggerChildren style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: "1.5rem" } as any}>
          {projects.map((p, idx) => (
            <ProjectCard key={p.name} p={p} idx={idx} />
          ))}
        </StaggerChildren>
      </div>
    </section>
  );
}
