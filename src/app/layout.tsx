import { Titillium_Web, Montserrat } from "next/font/google";
import type { Metadata } from "next";
import LenisWrapper from "@/components/LenisWrapper";
import Aurora from "@/components/Aurora";
import MagneticCursor from "@/components/MagneticCursor";
import "./globals.css";

const titillium = Titillium_Web({
  weight: ["300", "400", "600", "700"],
  subsets: ["latin"],
  variable: "--font-titillium",
});

const montserrat = Montserrat({
  weight: ["300", "400", "500", "600", "700"],
  subsets: ["latin"],
  variable: "--font-montserrat",
});

export const metadata: Metadata = {
  title: "Avijnan Purkait – AI / ML Engineer",
  description:
    "AI & Machine Learning Engineer with experience building real-time AI systems, LLM pipelines, and scalable backend architectures.",
  keywords: [
    "Avijnan Purkait", "AI Engineer", "Machine Learning",
    "LLM Systems", "Computer Vision", "Full-Stack AI", "Portfolio",
  ],
  openGraph: {
    title: "Avijnan Purkait – AI / ML Engineer",
    description: "Portfolio of Avijnan Purkait — AI & ML Engineer specializing in LLMs, Computer Vision, and scalable backend systems.",
    type: "website",
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${titillium.variable} ${montserrat.variable}`}>
      <body style={{ cursor: "none", position: "relative" }}>
        <Aurora />
        <MagneticCursor />
        <LenisWrapper>
          {children}
        </LenisWrapper>
      </body>
    </html>
  );
}


