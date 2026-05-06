"use client";
import { motion } from "framer-motion";
import { StaggerChildren, StaggerItem, FadeUpSection, GlassCard } from "./Animations";
import type { PortfolioRaw } from "@/data/fetchPortfolio";

type UpcomingProject = PortfolioRaw["upcomingProjects"][number];

export default function UpcomingProjectsSection({ projects }: { projects: UpcomingProject[] }) {
  if (!projects || projects.length === 0) return null;

  return (
    <section id="upcoming-projects" style={{ padding: "6rem 2rem", position: "relative", zIndex: 2 }}>
      <div style={{ maxWidth: 1200, margin: "0 auto" }}>
        <FadeUpSection>
          <div style={{ marginBottom: "4rem" }}>
            <div style={{ display: "flex", alignItems: "center", gap: "1rem" }}>
              <p style={{ fontFamily: "var(--primary)", fontSize: "0.75rem", letterSpacing: "0.2em", color: "var(--accent)", margin: 0 }}>
                RESEARCH & DEVELOPMENT
              </p>
              <span style={{ 
                background: "rgba(234, 179, 8, 0.15)", 
                color: "#eab308", 
                border: "1px solid rgba(234, 179, 8, 0.3)",
                padding: "0.2rem 0.6rem", 
                borderRadius: 100, 
                fontSize: "0.6rem", 
                fontFamily: "var(--primary)", 
                fontWeight: 700,
                letterSpacing: "0.1em" 
              }}>
                IN PROGRESS
              </span>
            </div>
            <h2 style={{ fontFamily: "var(--primary)", fontSize: "clamp(2rem, 4vw, 3rem)", fontWeight: 700, color: "var(--txt-bright)", letterSpacing: "-0.02em", lineHeight: 1, marginTop: "0.6rem" }}>
              Upcoming Projects
            </h2>
            <div style={{ marginTop: "1.5rem", height: 1, background: "linear-gradient(to right, rgba(234, 179, 8, 0.3), transparent)" }} />
          </div>
        </FadeUpSection>

        <StaggerChildren style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(400px, 1fr))", gap: "2rem" } as any}>
          {projects.map((p, idx) => (
            <StaggerItem key={idx}>
              <GlassCard hover={true} style={{ padding: "2rem", height: "100%", display: "flex", flexDirection: "column" }}>
                <div style={{ marginBottom: "1.5rem" }}>
                  <h3 style={{ fontFamily: "var(--primary)", fontSize: "1.4rem", fontWeight: 700, color: "var(--txt-bright)", lineHeight: 1.3, marginBottom: "1rem" }}>
                    {p.name}
                  </h3>
                  
                  {/* Focus Areas (Tags) */}
                  <div style={{ display: "flex", flexWrap: "wrap", gap: "0.5rem" }}>
                    {p.focusAreas?.map((focus, i) => (
                      <span key={i} style={{
                        fontSize: "0.65rem", padding: "0.2rem 0.6rem",
                        background: "rgba(234, 179, 8, 0.08)",
                        border: "1px solid rgba(234, 179, 8, 0.2)",
                        borderRadius: 100,
                        color: "#eab308",
                        fontFamily: "var(--primary)",
                        letterSpacing: "0.04em",
                      }}>
                        {focus}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Description */}
                <ul style={{ listStyle: "none", display: "flex", flexDirection: "column", gap: "0.8rem", marginBottom: "1.5rem", flex: 1 }}>
                  {p.description.map((desc, i) => (
                    <li key={i} style={{ fontFamily: "var(--secondary)", fontSize: "0.85rem", color: "var(--txt-dim)", lineHeight: 1.6, position: "relative", paddingLeft: "1.2rem" }}>
                      <span style={{ position: "absolute", left: 0, color: "rgba(255,255,255,0.3)" }}>›</span>
                      {desc}
                    </li>
                  ))}
                </ul>

                {/* Tech Stack Footer */}
                <div style={{ paddingTop: "1.5rem", borderTop: "1px solid rgba(255,255,255,0.06)", display: "flex", flexWrap: "wrap", gap: "0.4rem" }}>
                  {p.techStack.map((tech, i) => (
                    <span key={i} style={{
                      fontSize: "0.7rem",
                      color: "rgba(255,255,255,0.6)",
                      fontFamily: "var(--secondary)",
                    }}>
                      {tech}{i < p.techStack.length - 1 ? <span style={{ color: "rgba(255,255,255,0.2)", margin: "0 0.4rem" }}>•</span> : ""}
                    </span>
                  ))}
                </div>
              </GlassCard>
            </StaggerItem>
          ))}
        </StaggerChildren>
      </div>
    </section>
  );
}
