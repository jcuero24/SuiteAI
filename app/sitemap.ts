import type { MetadataRoute } from "next";

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = process.env.NEXT_PUBLIC_SITE_URL?.replace(/\/$/, "");
  if (!baseUrl) return [];

  const pages = [
    { path: "", priority: 1 },
    { path: "/terms", priority: 0.6 },
    { path: "/privacy", priority: 0.6 },
    { path: "/cookies", priority: 0.4 },
    { path: "/refunds", priority: 0.4 },
  ];

  return pages.map(({ path, priority }) => ({
    url: `${baseUrl}${path}`,
    lastModified: new Date("2026-10-18"),
    changeFrequency: path ? "yearly" : "monthly",
    priority,
  }));
}