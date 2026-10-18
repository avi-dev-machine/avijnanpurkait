import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Avijnan Purkait — Agentic AI & Machine Learning Engineer",
  description: "Portfolio of Avijnan Purkait. Agentic AI architectures, edge intelligence, multi-agent systems, and computer vision built for real-world constraints.",
  metadataBase: new URL("https://avijnanpurkait.vercel.app"),
  openGraph: {
    title: "Avijnan Purkait — Agentic AI & Machine Learning Engineer",
    description: "Agentic AI architectures, edge intelligence, multi-agent systems, and computer vision.",
    type: "website",
  },
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          href="https://fonts.googleapis.com/css2?family=JetBrains+Mono:ital,wght@0,300;0,400;0,500;0,600;0,700;1,400&display=swap"
          rel="stylesheet"
        />
      </head>
      <body>{children}</body>
    </html>
  );
}
