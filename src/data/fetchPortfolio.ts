/**
 * Fetches portfolio data from the FastAPI backend.
 * Falls back to the bundled static data if the API is unreachable
 * (e.g. during static export / Vercel build without backend).
 */

import { portfolioData as staticData } from "./portfolio";

const API = process.env.PORTFOLIO_API_URL ?? "http://localhost:8000";

export type PortfolioRaw = typeof staticData;

export async function fetchPortfolio(): Promise<PortfolioRaw> {
  try {
    const res = await fetch(`${API}/api/portfolio`, {
      next: { revalidate: 60 }, // ISR: re-fetch every 60 s
    });
    if (!res.ok) throw new Error(`API ${res.status}`);
    const json = await res.json();

    // Map raw JSON keys (PascalCase from data.json) → camelCase used in UI
    return mapRaw(json);
  } catch {
    // Silent fallback — backend not running (static deploy / CI)
    return staticData;
  }
}

/* eslint-disable @typescript-eslint/no-explicit-any */
function mapRaw(d: any): PortfolioRaw {
  return {
    candidate: {
      name: d.Candidate?.Name ?? staticData.candidate.name,
      contact: {
        email:    d.Candidate?.Contact?.Email    ?? staticData.candidate.contact.email,
        phone:    d.Candidate?.Contact?.Phone    ?? staticData.candidate.contact.phone,
        location: d.Candidate?.Contact?.Location ?? staticData.candidate.contact.location,
        github:   d.Candidate?.Contact?.GitHub   ?? staticData.candidate.contact.github,
        linkedin: d.Candidate?.Contact?.LinkedIn ?? staticData.candidate.contact.linkedin,
      },
    },
    title:   d.Title   ?? staticData.title,
    summary: d.Summary ?? staticData.summary,
    education: (d.Education ?? []).map((e: any) => ({
      degree:      e.Degree      ?? e.Level,
      institution: e.Institution ?? e.Board,
      duration:    e.Duration    ?? e.Year,
      score:       e.Score,
      stream:      e.Stream,
      level:       e.Level,
    })),
    experience: (d.Experience ?? []).map((e: any) => ({
      role:         e.Role,
      organization: e.Organization,
      duration:     e.Duration,
      highlights:   e.Highlights ?? [],
      projectLink:  e.ProjectLink,
      techStack:    e.TechStack ?? [],
    })),
    projects: (d.Projects ?? []).map((p: any) => ({
      name:        p.Name,
      badge:       p.Badge ?? null,
      link:        p.Link,
      description: p.Description ?? [],
      techStack:   p.TechStack   ?? [],
      domain:      p.Domain      ?? [],
    })),
    upcomingProjects: (d.UpcomingProjects ?? []).map((p: any) => ({
      name:        p.Name,
      status:      p.Status,
      description: p.Description ?? [],
      techStack:   p.TechStack   ?? [],
      focusAreas:  p.FocusAreas  ?? p.Concepts ?? [],
    })),
    technicalSkills: d.TechnicalSkills ?? staticData.technicalSkills,
    achievements:    d.Achievements    ?? staticData.achievements,
  };
}
