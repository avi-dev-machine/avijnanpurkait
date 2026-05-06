"use client";
import { motion } from "framer-motion";
import type { PortfolioRaw } from "@/data/fetchPortfolio";

type Candidate = PortfolioRaw["candidate"];

export default function Footer({ candidate }: { candidate: Candidate }) {
  return (
    <footer style={{
      borderTop: "1px solid rgba(255,255,255,0.05)",
      background: "rgba(5,8,12,0.8)",
      backdropFilter: "blur(20px)",
      position: "relative",
      zIndex: 10,
    }}>
      <div style={{ maxWidth: 1200, margin: "0 auto", padding: "4rem 2rem", display: "flex", flexWrap: "wrap", justifyContent: "space-between", gap: "3rem" }}>
        {/* Left */}
        <div>
          <div style={{ display: "flex", alignItems: "center", gap: "0.8rem", marginBottom: "1.5rem" }}>
            <span style={{
              width: 28, height: 28, background: "linear-gradient(135deg, #0af0b8, #3ba2ea)",
              borderRadius: 8, display: "flex", alignItems: "center", justifyContent: "center",
              fontSize: "0.7rem", fontWeight: 900, color: "#050810", fontFamily: "var(--primary)"
            }}>AP</span>
            <span style={{ fontFamily: "var(--primary)", fontWeight: 700, fontSize: "1.2rem", color: "var(--txt-bright)" }}>
              ap<span style={{ color: "var(--accent)" }}>.dev</span>
            </span>
          </div>
          
          <div style={{ fontFamily: "var(--secondary)", fontSize: "0.85rem", color: "var(--txt-dim)", marginBottom: "0.5rem" }}>
            AI / ML Engineer · Full-Stack Builder · Kolkata, India
          </div>
          <div style={{ fontFamily: "var(--secondary)", fontSize: "0.75rem", color: "rgba(255,255,255,0.3)" }}>
            © {new Date().getFullYear()} {candidate.name}. All rights reserved.
          </div>
        </div>

        {/* Right */}
        <div style={{ display: "flex", gap: "1.5rem", alignItems: "flex-end", paddingBottom: "0.5rem" }}>
          {[
            { href: candidate.contact.github, label: "GitHub" },
            { href: candidate.contact.linkedin, label: "LinkedIn" },
            { href: `mailto:${candidate.contact.email}`, label: "Email" },
          ].map((l) => (
            <motion.a
              key={l.label}
              href={l.href}
              target="_blank" rel="noreferrer"
              style={{
                fontFamily: "var(--primary)",
                fontSize: "0.85rem",
                color: "var(--txt-dim)",
                textDecoration: "none",
                fontWeight: 600,
                letterSpacing: "0.05em",
              }}
              whileHover={{ color: "var(--txt-bright)", y: -2 }}
              transition={{ duration: 0.2 }}
            >
              {l.label}
            </motion.a>
          ))}
        </div>
      </div>
    </footer>
  );
}
