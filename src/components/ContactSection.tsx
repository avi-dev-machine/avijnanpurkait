"use client";
import { motion } from "framer-motion";
import { FadeUpSection, GlassCard } from "./Animations";
import MagneticButton from "./MagneticButton";
import type { PortfolioRaw } from "@/data/fetchPortfolio";

type Contact = PortfolioRaw["candidate"]["contact"];

export default function ContactSection({ contact }: { contact: Contact }) {
  return (
    <section id="contacts" style={{ padding: "8rem 2rem 10rem", position: "relative", zIndex: 2 }}>
      <div style={{ maxWidth: 1200, margin: "0 auto" }}>
        <FadeUpSection>
          <div style={{ textAlign: "center", marginBottom: "4rem", display: "flex", flexDirection: "column", alignItems: "center" }}>
            <p style={{ fontFamily: "var(--primary)", fontSize: "0.75rem", letterSpacing: "0.2em", color: "var(--accent)", marginBottom: "1rem" }}>
              INITIATE SEQUENCE
            </p>
            <h2 style={{ fontFamily: "var(--primary)", fontSize: "clamp(3rem, 6vw, 5rem)", fontWeight: 700, color: "var(--txt-bright)", letterSpacing: "-0.04em", lineHeight: 1, marginBottom: "1.5rem" }}>
              Let&apos;s Build.
            </h2>
            <p style={{ fontFamily: "var(--secondary)", fontSize: "1rem", color: "var(--txt-dim)", maxWidth: 600, lineHeight: 1.8 }}>
              Actively seeking research internships and collaborative AI/ML engagements. Whether you possess a specific opportunity or are confronted with a compelling technical challenge—my correspondence is open.
            </p>
          </div>
        </FadeUpSection>

        <FadeUpSection delay={0.2}>
          <div style={{ display: "flex", justifyContent: "center", gap: "1.5rem", flexWrap: "wrap" }}>
            <MagneticButton href={`mailto:${contact.email}`} strength={0.4} style={{
              padding: "1rem 2.5rem",
              background: "linear-gradient(135deg, rgba(10,240,184,0.1), rgba(59,162,234,0.1))",
              border: "1px solid rgba(10,240,184,0.3)",
              color: "var(--accent)",
              fontFamily: "var(--primary)",
              fontWeight: 700,
              fontSize: "1rem",
              letterSpacing: "0.06em",
              borderRadius: 100,
              textDecoration: "none",
              boxShadow: "0 10px 40px rgba(10,240,184,0.15)",
            }}>
              {contact.email}
            </MagneticButton>
            
            <MagneticButton href={contact.github} strength={0.4} style={{
              padding: "1rem 2.5rem",
              background: "rgba(255,255,255,0.03)",
              border: "1px solid rgba(255,255,255,0.1)",
              color: "var(--txt-bright)",
              fontFamily: "var(--primary)",
              fontWeight: 600,
              fontSize: "1rem",
              letterSpacing: "0.06em",
              borderRadius: 100,
              textDecoration: "none",
            }}>
              GitHub ↗
            </MagneticButton>

            <MagneticButton href={contact.linkedin} strength={0.4} style={{
              padding: "1rem 2.5rem",
              background: "rgba(255,255,255,0.03)",
              border: "1px solid rgba(255,255,255,0.1)",
              color: "var(--txt-bright)",
              fontFamily: "var(--primary)",
              fontWeight: 600,
              fontSize: "1rem",
              letterSpacing: "0.06em",
              borderRadius: 100,
              textDecoration: "none",
            }}>
              LinkedIn ↗
            </MagneticButton>
          </div>
        </FadeUpSection>
        
        {/* Abstract Deco */}
        <FadeUpSection delay={0.4}>
          <div style={{ marginTop: "6rem", display: "flex", justifyContent: "center", gap: "1rem", opacity: 0.5 }}>
            <span style={{ fontFamily: "var(--secondary)", fontSize: "0.8rem", color: "var(--txt-dim)", letterSpacing: "0.1em" }}>
              {contact.location.toUpperCase()}
            </span>
            <span style={{ color: "var(--txt-dim)" }}>|</span>
            <span style={{ fontFamily: "var(--secondary)", fontSize: "0.8rem", color: "var(--txt-dim)", letterSpacing: "0.1em" }}>
              {contact.phone}
            </span>
          </div>
        </FadeUpSection>
      </div>
    </section>
  );
}
