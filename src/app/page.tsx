"use client";

import { AnimatePresence, motion, useMotionValue } from "framer-motion";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Image from "next/image";
import { ArrowDownRight, ArrowUpRight, ChevronDown, CircleDot, Download, ExternalLink, FileText } from "lucide-react";
import Lenis from "lenis";
import { useEffect, useRef, useState } from "react";
import {
  experiences,
  fieldNotes,
  principles,
  projects,
  recognition,
  toolbox,
  type FieldNote,
  type Project,
} from "@/content/portfolio";

const email = "avijnanpurkait@gmail.com";

function SmoothScroll() {
  useEffect(() => {
    const lenis = new Lenis({ lerp: 0.09, smoothWheel: true });
    let frame = 0;
    const raf = (time: number) => {
      lenis.raf(time);
      frame = requestAnimationFrame(raf);
    };
    frame = requestAnimationFrame(raf);
    return () => {
      cancelAnimationFrame(frame);
      lenis.destroy();
    };
  }, []);
  return null;
}

function ScrollChoreography() {
  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    gsap.registerPlugin(ScrollTrigger);
    const ctx = gsap.context(() => {
      gsap.utils.toArray<HTMLElement>(".scroll-choreo").forEach((target) => {
        gsap.fromTo(
          target,
          { y: 40, autoAlpha: 0 },
          {
            y: 0,
            autoAlpha: 1,
            duration: 0.8,
            ease: "power3.out",
            scrollTrigger: { trigger: target, start: "top 88%", once: true },
          }
        );
      });
    });
    return () => ctx.revert();
  }, []);
  return null;
}

function AmbientField() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;
    let animId: number;
    let t = 0;

    const resize = () => {
      canvas.width = canvas.offsetWidth;
      canvas.height = canvas.offsetHeight;
    };
    resize();
    const ro = new ResizeObserver(resize);
    ro.observe(canvas);

    const draw = () => {
      const { width: W, height: H } = canvas;
      ctx.clearRect(0, 0, W, H);
      t += 0.007; // steady, gradual pace

      // Light coordinates drifting in a harmonic Lissajous orbit behind the grid
      const lx = W * (0.5 + 0.36 * Math.sin(t * 0.5) * Math.cos(t * 0.28));
      const ly = H * (0.46 + 0.3 * Math.sin(t * 0.38) + 0.08 * Math.cos(t * 0.75));
      const lightRadius = Math.max(W, H) * 0.48;

      // 1. Draw glowing light BEHIND the grid
      const grad = ctx.createRadialGradient(lx, ly, 0, lx, ly, lightRadius);
      grad.addColorStop(0, "rgba(214, 255, 43, 0.24)"); // luminous acid core
      grad.addColorStop(0.22, "rgba(214, 255, 43, 0.11)");
      grad.addColorStop(0.55, "rgba(211, 106, 75, 0.03)"); // subtle secondary warmth
      grad.addColorStop(0.85, "rgba(10, 11, 10, 0.015)");
      grad.addColorStop(1, "rgba(10, 11, 10, 0)");

      ctx.fillStyle = grad;
      ctx.fillRect(0, 0, W, H);

      // 2. Draw the architectural grid OVER the light, illuminated where the light shines
      const step = 64; // grid cell size
      const cols = Math.ceil(W / step);
      const rows = Math.ceil(H / step);

      // Vertical grid lines
      for (let c = 0; c <= cols; c++) {
        const x = c * step;
        const dx = Math.abs(x - lx);
        const prox = Math.max(0, 1 - dx / 400);
        const alpha = 0.06 + 0.24 * (prox * prox);
        ctx.strokeStyle = `rgba(214, 255, 43, ${alpha})`;
        ctx.lineWidth = 0.65;
        ctx.beginPath();
        ctx.moveTo(x, 0);
        ctx.lineTo(x, H);
        ctx.stroke();
      }

      // Horizontal grid lines
      for (let r = 0; r <= rows; r++) {
        const y = r * step;
        const dy = Math.abs(y - ly);
        const prox = Math.max(0, 1 - dy / 400);
        const alpha = 0.06 + 0.24 * (prox * prox);
        ctx.strokeStyle = `rgba(214, 255, 43, ${alpha})`;
        ctx.lineWidth = 0.65;
        ctx.beginPath();
        ctx.moveTo(0, y);
        ctx.lineTo(W, y);
        ctx.stroke();
      }

      // Intersection crosshairs illuminated near the light
      for (let c = 0; c <= cols; c++) {
        const x = c * step;
        for (let r = 0; r <= rows; r++) {
          const y = r * step;
          const dist = Math.hypot(x - lx, y - ly);
          if (dist < 320) {
            const glow = Math.pow(1 - dist / 320, 2);
            ctx.strokeStyle = `rgba(214, 255, 43, ${glow * 0.8})`;
            ctx.lineWidth = 0.8;
            const arm = 3.5;
            ctx.beginPath();
            ctx.moveTo(x - arm, y);
            ctx.lineTo(x + arm, y);
            ctx.moveTo(x, y - arm);
            ctx.lineTo(x, y + arm);
            ctx.stroke();

            if (dist < 140) {
              ctx.fillStyle = `rgba(214, 255, 43, ${(1 - dist / 140) * 0.9})`;
              ctx.beginPath();
              ctx.arc(x, y, 1.2, 0, Math.PI * 2);
              ctx.fill();
            }
          }
        }
      }

      animId = requestAnimationFrame(draw);
    };

    draw();
    return () => {
      cancelAnimationFrame(animId);
      ro.disconnect();
    };
  }, []);

  return (
    <div className="signal-field" aria-hidden="true">
      <canvas ref={canvasRef} style={{ position: "absolute", inset: 0, width: "100%", height: "100%" }} />
      <div className="field-readout field-readout-b">ARCHITECTURAL GRID · CONTINUOUS ILLUMINATION · KOLKATA, INDIA</div>
    </div>
  );
}

function IntroGate() {
  const [visible, setVisible] = useState(true);
  useEffect(() => {
    const timer = window.setTimeout(() => setVisible(false), 1750);
    return () => window.clearTimeout(timer);
  }, []);
  return (
    <AnimatePresence>
      {visible && (
        <motion.div className="intro" initial={{ opacity: 1 }} exit={{ opacity: 0, transition: { duration: 0.45 } }}>
          <div className="intro-copy">
            <span>ARCHITECTURAL PORTFOLIO</span>
            <strong>
              INTELLIGENCE,
              <br />
              MADE TANGIBLE.
            </strong>
          </div>
          <button onClick={() => setVisible(false)} className="intro-skip">
            SKIP INTRO <ArrowUpRight size={14} />
          </button>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

function Hero() {
  return (
    <section className="hero" id="top">
      <AmbientField />
      <nav className="nav shell" aria-label="Main navigation">
        <a href="#top" className="wordmark" aria-label="Avijnan Purkait home">
          AP<span>®</span>
        </a>
        <div className="nav-links">
          <a href="#work">WORK</a>
          <a href="#doctrine">DOCTRINE</a>
          <a href="#experience">EXPERIENCE</a>
          <a href="#field-notes">NOTES</a>
          <a href="#contact">CONTACT</a>
        </div>
        <a href="#contact" className="nav-status">
          <span className="status-dot" /> DISPATCH CHANNEL ↗
        </a>
      </nav>
      <div className="hero-main shell">
        <motion.p
          className="eyebrow hero-eyebrow"
          initial={{ opacity: 0, y: 18 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.35 }}
        >
          AVIJNAN PURKAIT <span>—</span> AGENTIC AI &amp; MACHINE LEARNING ENGINEER
        </motion.p>
        <div className="hero-title-wrap">
          <motion.h1
            initial={{ y: 80, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.85, ease: [0.2, 0.8, 0.2, 1] }}
          >
            SYSTEMS
            <br />
            <i>THAT REASON.</i>
          </motion.h1>
          <p className="hero-deck">
            I architect AI systems that operate under real-world constraints — from agentic supervisor platforms to offline
            edge models and deterministic predictive analytics.
          </p>
        </div>
        <motion.figure
          className="portrait-plate"
          initial={{ opacity: 0, scale: 0.96, y: 30 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          transition={{ delay: 0.25, duration: 0.9 }}
        >
          <Image
            src="/assets/portrait-cutout.webp"
            alt="Avijnan Purkait"
            width={960}
            height={1707}
            priority
            sizes="(max-width: 480px) 210px, (max-width: 850px) 260px, 440px"
          />
          <figcaption>
            <span>AVIJNAN PURKAIT</span>
            <span>AI SYSTEMS · 2026</span>
          </figcaption>
        </motion.figure>
        <div className="hero-foot">
          <a href="#work" className="circle-button" aria-label="Explore selected work">
            <ArrowDownRight size={27} />
          </a>
          <p>
            Scroll through the <em>production case studies</em>
            <br />
            and <em>empirical hardware architectures.</em>
          </p>
          <a href="#work" className="hero-explore-link">
            EXPLORE BUILDS <ArrowDownRight size={14} />
          </a>
        </div>
      </div>
      <div className="ticker" aria-label="Areas of practice">
        <span>AGENTIC AI</span>
        <b>✳</b>
        <span>MULTI-AGENT SYSTEMS</span>
        <b>✳</b>
        <span>EDGE INTELLIGENCE</span>
        <b>✳</b>
        <span>COMPUTER VISION</span>
        <b>✳</b>
        <span>DETERMINISTIC ML</span>
        <b>✳</b>
        <span>AGENTIC AI</span>
      </div>
    </section>
  );
}

function Doctrine() {
  return (
    <section className="about-strip shell" id="doctrine" aria-label="Engineering Doctrine">
      <div className="scroll-choreo">
        <p className="eyebrow">
          CORE DOCTRINE <span>02</span>
        </p>
        <div className="about-manifesto">
          <h2>
            REDUCING CHAOS
            <br />
            <i>INTO SYSTEMS</i>
            <br />
            THAT ENDURE.
          </h2>
          <p className="manifesto-lead">
            &ldquo;The goal isn&apos;t to write code, but to reduce chaos into systems that reason and endure.&rdquo;
          </p>
          <p className="manifesto-sub">
            The work I care about happens in the gap between what AI can do in an exploratory notebook and what it must do in
            the physical world where failure has an actual cost. These four engineering principles guide every architecture I
            design:
          </p>
        </div>
      </div>

      <div className="doctrine-grid">
        {principles.map((item) => (
          <article className="doctrine-card scroll-choreo" key={item.id}>
            <div className="doctrine-top">
              <span className="doctrine-num">{item.number}</span>
              <div className="doctrine-tags">
                {item.tags.map((tag) => (
                  <span key={tag}>{tag}</span>
                ))}
              </div>
            </div>
            <h3>{item.title}</h3>
            <p className="doctrine-thesis">{item.thesis}</p>
            <p className="doctrine-desc">{item.description}</p>
          </article>
        ))}
      </div>
    </section>
  );
}

function Architecture({ steps }: { steps: string[] }) {
  return (
    <div className="architecture" aria-label="Architecture flow">
      {steps.map((step, index) => (
        <div key={step}>
          <span>{String(index + 1).padStart(2, "0")}</span>
          <b>{step}</b>
          {index < steps.length - 1 && <i>→</i>}
        </div>
      ))}
    </div>
  );
}

function Work() {
  const [active, setActive] = useState<string | null>("solvex");
  return (
    <section className="work" id="work">
      <div className="shell work-head scroll-choreo">
        <p className="eyebrow">
          CASE STUDIES <span>03</span>
        </p>
        <h2>
          WHAT I&apos;VE
          <br />
          <i>ACTUALLY BUILT.</i>
        </h2>
        <p>Four production-grade systems across agentic reasoning, edge intelligence, computer vision, and radio hardware.</p>
      </div>
      <div className="project-list shell">
        {projects.map((project) => {
          const isActive = active === project.id;
          return (
            <article className={`project ${isActive ? "is-open" : ""}`} key={project.id}>
              <button
                className="project-button"
                onClick={() => setActive(isActive ? null : project.id)}
                aria-expanded={isActive}
              >
                <span className="project-number">{project.number}</span>
                <span className="project-name">
                  <small>{project.category}</small>
                  <b>{project.name}</b>
                </span>
                <span className="project-label">{project.label}</span>
                <span className="project-toggle">
                  {isActive ? "CLOSE" : "OPEN"}
                  <ChevronDown size={19} />
                </span>
              </button>
              <AnimatePresence initial={false}>
                {isActive && (
                  <motion.div
                    className="project-detail"
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: "auto", opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.45, ease: "easeInOut" }}
                  >
                    <div className="project-detail-inner">
                      <div className="project-visual-frame" aria-label={`${project.name} technical schematic`}>
                        <span className="visual-badge">
                          <span className="visual-badge-dot" />
                          {project.schematicTag}
                        </span>
                        <Image
                          src={project.image}
                          alt={`${project.name} technical architecture and schematic`}
                          width={1400}
                          height={880}
                          className="project-cover-image"
                          priority={project.id === "solvex"}
                        />
                      </div>
                      <div className="case-study">
                        <p className="case-kicker">CASE / {project.number} · SPECIFICATION</p>
                        <h3>{project.summary}</h3>
                        <p className="case-problem">
                          <b>THE PROBLEM // </b>
                          {project.problem}
                        </p>

                        <div className="project-metrics">
                          {project.metrics.map((m) => (
                            <div className="project-metric-item" key={m.label}>
                              <span className="project-metric-label">{m.label}</span>
                              <span className="project-metric-value">{m.value}</span>
                            </div>
                          ))}
                        </div>

                        <Architecture steps={project.architecture} />
                        <div className="stack">
                          {project.stack.map((item) => (
                            <span key={item}>{item}</span>
                          ))}
                        </div>
                        <p className="outcome">
                          <b>EMPIRICAL OUTCOME // </b>
                          {project.outcome}
                        </p>
                        <div className="project-links">
                          {project.href && (
                            <a className="text-link" target="_blank" rel="noreferrer" href={project.href}>
                              VISIT LIVE BUILD <ExternalLink size={13} />
                            </a>
                          )}
                          {project.github && (
                            <a className="text-link-secondary" target="_blank" rel="noreferrer" href={project.github}>
                              VIEW REPOSITORY ↗
                            </a>
                          )}
                        </div>
                      </div>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </article>
          );
        })}
      </div>
    </section>
  );
}

function Experience() {
  const [open, setOpen] = useState(0);
  return (
    <section className="experience shell" id="experience">
      <div className="experience-title scroll-choreo">
        <p className="eyebrow">
          FIELD LOG <span>04</span>
        </p>
        <h2>
          WHERE I&apos;VE
          <br />
          <i>
            WORKED &amp;
            <br />
            LEARNED.
          </i>
        </h2>
        <p style={{ marginTop: 14, color: "var(--mute)", fontSize: "14px", lineHeight: 1.5, maxWidth: 320 }}>
          From leading a 10-person industrial AI team to battery lifetime modeling and accessibility engineering.
        </p>
      </div>
      <div className="timeline">
        {experiences.map((item, index) => (
          <article className={open === index ? "open" : ""} key={item.role + item.place}>
            <button onClick={() => setOpen(open === index ? -1 : index)} aria-expanded={open === index}>
              <span>{item.period}</span>
              <div style={{ flex: 1, textAlign: "left" }}>
                <h3 style={{ margin: "0 0 4px" }}>{item.role}</h3>
                <p style={{ margin: 0, color: "var(--mute)", fontSize: "11px", fontFamily: "var(--mono)" }}>{item.place}</p>
              </div>
              <CircleDot size={20} />
            </button>
            <AnimatePresence>
              {open === index && (
                <motion.div
                  className="timeline-detail"
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: "auto" }}
                  exit={{ opacity: 0, height: 0 }}
                  transition={{ duration: 0.3 }}
                >
                  <p>{item.detail}</p>
                </motion.div>
              )}
            </AnimatePresence>
          </article>
        ))}
      </div>
    </section>
  );
}

function Toolbox() {
  return (
    <section className="toolbox" id="toolbox">
      <div className="shell">
        <div className="toolbox-head scroll-choreo">
          <p className="eyebrow">
            TOOLBOX <span>05</span>
          </p>
          <h2>
            INSTRUMENTS,
            <br />
            <i>NOT ORNAMENTS.</i>
          </h2>
          <p>The stack changes with the problem. These are the tools that have proven their worth across real deployments.</p>
        </div>
        <div className="tool-grid">
          {toolbox.map((group, index) => (
            <article className={`tool-group tool-${index}`} key={group.group}>
              <span>{String(index + 1).padStart(2, "0")}</span>
              <h3>{group.group}</h3>
              <div>
                {group.items.map((item) => (
                  <button key={item}>{item}</button>
                ))}
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}

function Recognition() {
  return (
    <section className="recognition shell" id="recognition">
      <div className="recognition-intro">
        <p className="eyebrow">
          RECOGNITION WALL <span>06</span>
        </p>
        <h2>
          WHEN THE WORK
          <br />
          <i>GOT NOTICED.</i>
        </h2>
        <p>Nine moments when what we built made it past the room it was built in.</p>
      </div>
      <div className="award-grid">
        {recognition.map((award, index) => (
          <article className="award" key={award.title + index} tabIndex={0}>
            <div className="award-front">
              <span>{String(index + 1).padStart(2, "0")}</span>
              <b>{award.mark}</b>
              <i>↗</i>
            </div>
            <div className="award-back">
              <h3>{award.title}</h3>
              <p>{award.note}</p>
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}

function Notes() {
  const [expandedId, setExpandedId] = useState<string | null>(null);

  return (
    <section className="notes" id="field-notes">
      <div className="shell">
        <p className="eyebrow">
          FIELD NOTES <span>07</span>
        </p>
        <div className="notes-title">
          <h2>
            THOUGHTS
            <br />
            <i>IN PROGRESS.</i>
          </h2>
          <p>
            Technical briefs on agent memory provenance, recursive synthetic data collapse, and machine unlearning inside neural weights.
          </p>
        </div>
        <div className="notes-grid">
          {fieldNotes.map((note) => {
            const isExpanded = expandedId === note.id;
            return (
              <article className="note-card scroll-choreo" key={note.id}>
                <div className="note-meta">
                  <span>{note.number} / {note.year}</span>
                  <span className="note-category">{note.category}</span>
                  <span>{note.readTime}</span>
                </div>
                <h3>{note.title}</h3>
                <p className="note-subtitle">{note.subtitle}</p>

                <div className="note-insights">
                  {note.keyPoints.map((point, i) => (
                    <p className="note-insight-item" key={i}>
                      <b>0{i + 1} //</b> {point}
                    </p>
                  ))}
                </div>

                <AnimatePresence>
                  {isExpanded && (
                    <motion.div
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: "auto" }}
                      exit={{ opacity: 0, height: 0 }}
                      transition={{ duration: 0.3 }}
                      style={{ overflow: "hidden", marginBottom: 16 }}
                    >
                      <p style={{ margin: 0, fontSize: "14px", lineHeight: 1.6, color: "rgba(10,11,10,0.92)", borderTop: "1px dashed rgba(10,11,10,0.3)", paddingTop: 14 }}>
                        {note.content}
                      </p>
                    </motion.div>
                  )}
                </AnimatePresence>

                <button
                  className="note-btn"
                  onClick={() => setExpandedId(isExpanded ? null : note.id)}
                  aria-expanded={isExpanded}
                >
                  {isExpanded ? "COLLAPSE BRIEF ↑" : "READ FULL BRIEF →"}
                </button>
              </article>
            );
          })}
        </div>
      </div>
    </section>
  );
}

function Contact() {
  const [sent, setSent] = useState(false);
  function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const form = new FormData(event.currentTarget);
    const subject = `Portfolio enquiry: ${form.get("type") || "Project"}`;
    const body = `Name: ${form.get("name")}\nEmail: ${form.get("email")}\n\n${form.get("message")}`;
    window.location.href = `mailto:${email}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
    setSent(true);
  }
  return (
    <section className="contact shell" id="contact">
      <p className="eyebrow">
        OPEN CHANNEL <span>08</span>
      </p>
      <div className="contact-grid">
        <div>
          <h2>
            MAKE THE
            <br />
            <i>FIRST PING.</i>
          </h2>
          <a className="email-link" href={`mailto:${email}`}>
            {email}
            <ArrowUpRight size={28} />
          </a>
          <p>Have an agentic project, research problem, or mission-critical system to engineer? Let&apos;s build.</p>
          <div className="socials">
            <a target="_blank" rel="noreferrer" href="https://linkedin.com/in/avijnan-purkait-6ba580318">
              ↗ LINKEDIN
            </a>
            <a target="_blank" rel="noreferrer" href="https://github.com/avi-dev-machine">
              ↗ GITHUB
            </a>
          </div>

          <div className="resume-download-block">
            <div className="resume-action-row">
              <a
                href="/Avijnan_Purkait_Resume.pdf"
                download="Avijnan_Purkait_Resume.pdf"
                className="resume-download-btn"
                aria-label="Download Avijnan Purkait Resume in PDF format"
              >
                <Download size={15} />
                <span>DOWNLOAD RESUME (.PDF)</span>
              </a>
              <a
                href="/resume"
                target="_blank"
                rel="noreferrer"
                className="resume-view-btn"
                aria-label="View Avijnan Purkait Resume directly in browser"
              >
                <FileText size={15} />
                <span>VIEW IN BROWSER ↗</span>
              </a>
            </div>
            <span className="resume-note">DIRECT PDF · OFFICIALLY VERIFIED · ACADEMIC SPECIFICATION</span>
          </div>
        </div>
        <form onSubmit={handleSubmit}>
          <label>
            NAME
            <input name="name" required placeholder="Your name" />
          </label>
          <label>
            EMAIL
            <input name="email" required type="email" placeholder="you@company.com" />
          </label>
          <label>
            PROJECT TYPE
            <select name="type" defaultValue="">
              <option value="" disabled>
                Select a route
              </option>
              <option>Agentic AI / Multi-Agent Systems</option>
              <option>Edge Intelligence / On-Device SLMs</option>
              <option>Computer Vision &amp; Kinematics</option>
              <option>Predictive Physics-Informed ML</option>
              <option>Research Collaboration</option>
            </select>
          </label>
          <label>
            MESSAGE
            <textarea name="message" required rows={3} placeholder="System requirements, constraints, and timeline." />
          </label>
          <button className="submit" type="submit">
            COMPOSE EMAIL <ArrowUpRight size={18} />
          </button>
          {sent && <p className="form-note">Your mail app should be open. If not, email directly above.</p>}
        </form>
      </div>
    </section>
  );
}

export default function Home() {
  return (
    <>
      <SmoothScroll />
      <ScrollChoreography />
      <IntroGate />
      <main>
        <Hero />
        <Doctrine />
        <Work />
        <Experience />
        <Toolbox />
        <Recognition />
        <Notes />
        <Contact />
      </main>
      <footer className="footer shell">
        <span>© 2026 AVIJNAN PURKAIT</span>
        <span>KOLKATA · AI SYSTEMS THAT WORK IN THE REAL WORLD</span>
        <a href="#top">BACK TO TOP ↑</a>
      </footer>
    </>
  );
}
