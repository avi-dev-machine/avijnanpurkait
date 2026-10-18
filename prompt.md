ROLE
You are a senior creative developer + art director. Build my personal portfolio as an unforgettable, award-level site. Not a template, not "dark mode with cards". It should make a recruiter stop scrolling.

REFERENCES (attached screenshots/links; study them closely, take inspiration, never copy code, copy, or images)
A) https://www.aahil-khan.xyz/ : takeaways: personality and wit in the copy; numbered "Selected work" cards with category tags; toolbox grouped by category with logos; expandable experience timeline ("show details"); award callouts; and a hidden, more playful "desk/canvas" version of the site (cards, small games, lofi) linked from the hero as the "fun version".
B) https://sawad.framer.website/ : takeaways: sleek, modern, confident; huge uppercase role title with a large portrait; a stats row (+years, +projects, +clients); skill tags like "dynamic animation, motion design"; clean timeline; "premium tools" strip; "thoughts"/blog previews; contact form with a budget-style dropdown.
THE BLEND: Sawad's polish and typographic confidence for the main experience, plus Aahil's personality and a secret playable "Lab" world. Result: serious enough to impress, surprising enough to be remembered. Add at least three ideas of your own that neither reference has.

ABOUT ME (source of truth. Do not invent facts or numbers)
- Avijnan Purkait, B.Tech CSE (AI & ML), Heritage Institute of Technology, Kolkata. Technical Project Lead at BMC Electroplast (agentic AI for industrial intelligence, 10-member team); Software Development Intern at BDS Cube Technologies (DPDP Act compliance platform).
- Projects: 
  01 SolveX, Final Year Project: dual-agent technical reasoning workspace; LangGraph, FastAPI, Next.js; deterministic Mermaid.js diagrams + p5.js animations. Live: https://solvex-frontend-seven.vercel.app/
  02 Agricultural Intelligence System: quantized small language models on Raspberry Pi, RAG, computer vision, offline-first.
  03 FitVision: real-time pose estimation (YOLO11n-Pose), rep counting, ~92% calibration accuracy; SIH 2025 Finalist.
  04 SETUKA: ESP32 LoRa mesh for emergency comms, 3 km/hop, ~95% delivery; Hult Prize India 2026 Finalist (IIT Bombay), provisional patent.
- Recognition: Hult Prize India 2026 Finalist; SIH 2025 Finalist; IIT Kharagpur Data Science Hackathon 2025 Finalist; Winner, Hult Prize (HIT) 2026; 2nd Runner-Up, IIC Innovation Challenge 2026.
- Community: coordinator of Geeks United coding club; twice-elected Fest Council member (technical + cultural); football team captain.
- Contact: avijnanpurkait@gmail.com | linkedin.com/in/avijnan-purkait-6ba580318 | github.com/avi-dev-machine
- Stats row may use ONLY real numbers: 5 finals/wins/podiums, 4 flagship builds, 10-person team led.

CREATIVE CONCEPT: "Intelligence you can see + a hidden lab"
1. MAIN SITE: cinematic dark editorial. A giant kinetic headline (name/role) over an interactive WebGL field (neural/particle mesh that reacts to cursor and scroll). Big portrait treatment (cut-out with layered parallax, duotone glow, grain). Stats row. Marquee of tech stack.
2. SELECTED WORK: numbered 01-04, oversized type, category tags (Product / System / Hardware), full-bleed images/looping muted video, hover image-follow + magnetic cursor; click expands into a case-study page with shared-element transition (problem → architecture diagram → stack → outcome → live link). SolveX gets a live-preview embed or looping capture.
3. EXPERIENCE: horizontal or pinned scroll timeline with expandable "show details" panels.
4. TOOLBOX: grouped by category (Languages, AI/ML, Agentic & LLMs, Backend, Edge/Hardware), as an interactive physics/orbit cloud or grid with hover micro-animations, not static logo rows.
5. RECOGNITION WALL: trophy/award cards that flip or tilt in 3D, animated counters.
6. "THOUGHTS" strip: 3 blog/notes previews (placeholder TODO content).
7. CONTACT: huge email CTA with a hover distortion effect, a working form (server action) with a project-type dropdown, social links.
8. THE LAB (hidden "fun version"): a CTA in the hero ("There's a more fun version of this") opens a draggable infinite-canvas desk with project cards, a few tiny browser games or toys themed on my work (e.g. drag nodes to build a LoRa mesh, a pose-skeleton you can pose with the mouse), and an optional lofi toggle (muted by default, user-initiated audio only). Desktop-first, graceful fallback message on mobile.

VISUAL SYSTEM
- Palette: near-black base, ONE razor-sharp accent plus one quiet secondary. Propose it with a rationale. Avoid generic purple/blue AI gradients.
- Type: one expressive display face (huge, tight tracking, uppercase moments) + one grotesk/mono for technical labels. Variable fonts, fluid scale.
- Texture: film grain, fine blueprint grid, soft light blooms. Glass only where it earns its place.
- Layout: asymmetric bento, overlapping layers, oversized numerals, deliberate negative space. NO centered-hero-plus-three-identical-cards.
- Imagery: device mockups, hardware photography (ESP32, Raspberry Pi), UI captures, short loops. AVIF/WebP, blur placeholders, art-directed crops.

MOTION
Lenis smooth scroll; GSAP ScrollTrigger (pinned sections, scrubbed reveals, parallax); split-text and mask reveals; custom cursor with magnetic buttons; page transitions; a skippable intro under 2.5s. Everything has a purpose, so no motion for its own sake. Honor prefers-reduced-motion; simplify or disable WebGL on low-power devices.

STACK
Next.js (App Router) + TypeScript, Tailwind, GSAP + Lenis, Framer Motion, react-three-fiber/drei, Matter.js (or similar) for Lab physics. Content in typed JSON/MDX so I can edit without touching components. Vercel-ready.

QUALITY BARS
Lighthouse: Performance 90+ (desktop) / 85+ (mobile), Accessibility 95+, SEO 100. LCP < 2.5s, lazy-load 3D/video, no layout shift, 60fps scroll. Responsive 360-2560px, keyboard navigable, semantic HTML, alt text, OG images, sitemap.

ASSETS
Create /public/assets with named placeholders (solvex-hero.webp, fitvision-demo.mp4, setuka-hardware.webp, portrait-cutout.webp...). Generate polished SVG/CSS/canvas stand-ins now and give me a checklist of real images/clips and ideal dimensions. No hotlinked copyrighted images; no fake logos, testimonials or metrics. Missing info becomes a visible TODO.

PROCESS
1. First reply (under 400 words): concept, palette, type pairing, scroll choreography, the 3 original ideas you're adding, and how the Lab works. Wait for my approval.
2. Build in phases: tokens + shell → hero + smooth scroll → work showcase + case studies → remaining sections → the Lab → performance/a11y pass.
3. After each phase run the app, screenshot at mobile/tablet/desktop, critique it honestly against the references, and fix anything that looks generic before showing me.
4. End with a README: editing content, adding projects, swapping assets, deploying.