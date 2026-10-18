# Avijnan Purkait — Field Manual Portfolio

An editorial, interaction-led portfolio built with Next.js App Router, TypeScript, Tailwind CSS, Lenis, GSAP ScrollTrigger, and Framer Motion.

## Run locally

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000). Use `npm run build` before deploying.

## Editing content

All portfolio facts are in [`src/content/portfolio.ts`](./src/content/portfolio.ts):

- `projects` controls the four expandable project case studies.
- `experiences` controls the Field Log.
- `toolbox` controls the interactive tool groups.
- `recognition` controls the flip cards.

The on-page copy and interaction layout live in [`src/app/page.tsx`](./src/app/page.tsx). Keep only verified metrics and outcomes in the content file.

## Replacing visual stand-ins

The active hero portrait is [`public/assets/portrait-cutout.webp`](./public/assets/portrait-cutout.webp). It is derived from the supplied source photo and art-directed in CSS. Replace it with a transparent, portrait-orientation studio cutout (ideal: 1200×1800 WebP with alpha) when available.

The original SVG stand-ins inside [`public/assets`](./public/assets) are ready to replace with real media:

- `solvex-hero.svg` → muted 1920×1080 SolveX screen recording or product still.
- `agricultural-intelligence.svg` → 1600×1200 Raspberry Pi / field-device photo.
- `fitvision-demo.svg` → muted `fitvision-demo.mp4` 1920×1080 pose-estimation loop, 5–10 seconds.
- `setuka-hardware.svg` → 1600×1200 ESP32 / LoRa mesh hardware photo.

When swapping an asset, update the corresponding visual in `ProjectVisual` within `src/app/page.tsx`. Compress photos as WebP/AVIF and defer nonessential video with `preload="none"`.

## Contact form

The form intentionally opens the visitor’s mail client with a prepared message; it does not pretend to send mail from a server without an email provider. To use a server action in production, wire the form to an approved transactional email provider and store its API key in Vercel environment variables—never in source control.

## Deploying to Vercel

1. Push this folder to a Git repository.
2. Import the repository in Vercel.
3. Keep the framework preset as **Next.js** and use the default build command, `npm run build`.
4. Add a custom domain, then change the `metadataBase`, sitemap, and robots URLs from `avijnanpurkait.vercel.app` if the final canonical URL differs.

## Visual and accessibility checks

The site respects `prefers-reduced-motion`; it removes the intro and decorative animation in that mode. Keyboard-accessible project accordions, semantic landmarks, visible form labels, and descriptive portrait alt text are included. Before launch, test live assets and the contact route on 360px, tablet, and wide desktop screens.
