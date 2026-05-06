"use client";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

const links = [
  { id: "home", label: "Home" },
  { id: "projects", label: "Projects" },
  { id: "experience", label: "Experience" },
  { id: "skills", label: "Skills" },
  { id: "about-me", label: "About" },
  { id: "contacts", label: "Contact" },
];

export default function Navbar() {
  const [active, setActive] = useState("home");
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <motion.nav
      initial={{ y: -80, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
      style={{
        position: "fixed", top: 0, left: 0, right: 0, zIndex: 500,
        padding: "0 2rem",
        background: "rgba(5,8,12,0.7)",
        backdropFilter: "blur(24px)",
        WebkitBackdropFilter: "blur(24px)",
        borderBottom: "1px solid rgba(255,255,255,0.04)",
      }}
    >
      <div style={{ maxWidth: 1200, margin: "0 auto", height: 68, display: "flex", alignItems: "center", justifyContent: "space-between" }}>
        {/* Logo */}
        <motion.a
          href="#home"
          whileHover={{ scale: 1.04 }}
          style={{
            fontFamily: "var(--primary)", fontWeight: 700, fontSize: "1.1rem",
            color: "var(--txt-bright)", textDecoration: "none",
            display: "flex", alignItems: "center", gap: "0.5rem",
          }}
        >
          <span style={{
            width: 28, height: 28, background: "linear-gradient(135deg, #0af0b8, #3ba2ea)",
            borderRadius: 8, display: "inline-flex", alignItems: "center", justifyContent: "center",
            fontSize: "0.7rem", fontWeight: 900, color: "#050810",
          }}>AP</span>
          <span>ap<span style={{ color: "var(--accent)" }}>.dev</span></span>
        </motion.a>

        {/* Nav links */}
        <ul style={{ display: "flex", gap: "0.25rem", listStyle: "none", alignItems: "center" }}>
          {links.map((l) => (
            <li key={l.id}>
              <motion.a
                href={`#${l.id}`}
                onClick={() => setActive(l.id)}
                style={{
                  position: "relative",
                  display: "inline-flex", alignItems: "center",
                  padding: "0.4rem 0.9rem",
                  fontFamily: "var(--primary)", fontSize: "0.82rem", letterSpacing: "0.04em",
                  color: active === l.id ? "var(--txt-bright)" : "var(--txt)",
                  textDecoration: "none",
                  borderRadius: 100,
                  transition: "color 0.2s",
                }}
                whileHover={{ color: "var(--txt-bright)" }}
              >
                {active === l.id && (
                  <motion.span
                    layoutId="nav-pill"
                    style={{
                      position: "absolute", inset: 0, borderRadius: 100,
                      background: "rgba(10,240,184,0.08)",
                      border: "1px solid rgba(10,240,184,0.15)",
                    }}
                    transition={{ type: "spring", stiffness: 400, damping: 35 }}
                  />
                )}
                <span style={{ position: "relative", zIndex: 1 }}>{l.label}</span>
              </motion.a>
            </li>
          ))}
        </ul>
      </div>
    </motion.nav>
  );
}
