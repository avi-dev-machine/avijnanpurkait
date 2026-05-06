# Avijnan Purkait — Personal Portfolio

A dark-themed developer portfolio built with **Next.js 16 + TypeScript**, inspired by the Figma community "Portfolio (Community)" design.

## ✨ Features

- **Dark monospace aesthetic** — JetBrains Mono + dark navy color scheme
- **All portfolio data** from `data.json` — zero placeholder content
- **7 sections** — Hero, Projects, Experience, Skills, About, Education, Achievements, Contact
- **Fully responsive** — mobile, tablet, desktop
- **Production-ready** — zero TypeScript errors, static build
- **Deployable** to Vercel, Netlify, GitHub Pages, or any static host

## 🗂 Structure

```
portfolio-site/
├── src/
│   ├── app/
│   │   ├── layout.tsx        # Root layout + metadata
│   │   ├── page.tsx          # Main page (all sections)
│   │   └── globals.css       # All styles (no Tailwind utilities used)
│   ├── components/
│   │   ├── Navbar.tsx
│   │   ├── HeroSection.tsx
│   │   ├── ProjectsSection.tsx
│   │   ├── ExperienceSection.tsx
│   │   ├── SkillsSection.tsx
│   │   ├── AboutSection.tsx
│   │   ├── EducationSection.tsx
│   │   ├── AchievementsSection.tsx
│   │   ├── ContactSection.tsx
│   │   └── Footer.tsx
│   └── data/
│       └── portfolio.ts      # All content from data.json
└── public/
    ├── hero.png              # Hero image (from Portfolio zip)
    └── about.png             # About section image
```

## 🚀 Deploy to Vercel (Recommended)

```bash
# 1. Push this folder to a GitHub repo
# 2. Go to vercel.com → New Project → Import your repo
# 3. Framework: Next.js (auto-detected)
# 4. Deploy ✓
```

### Or via Vercel CLI:
```bash
npm install -g vercel
cd portfolio-site
vercel --prod
```

## 💻 Run Locally

```bash
cd portfolio-site
npm install
npm run dev
# Open http://localhost:3000
```

## 🏗 Build

```bash
npm run build
npm start
```
