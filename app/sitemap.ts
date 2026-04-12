import type { MetadataRoute } from "next";

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = "https://quantamend.com";

  return [
    {
      url: baseUrl,
      lastModified: new Date(),
      changeFrequency: "weekly",
      priority: 1,
    },
    {
      url: `${baseUrl}/blog`,
      lastModified: new Date(),
      changeFrequency: "weekly",
      priority: 0.9,
    },
    {
      url: `${baseUrl}/blog/dead-lead-reactivation-guide`,
      lastModified: new Date("2026-04-10"),
      changeFrequency: "monthly",
      priority: 0.8,
    },
    {
      url: `${baseUrl}/blog/missed-calls-costing-your-practice`,
      lastModified: new Date("2026-04-08"),
      changeFrequency: "monthly",
      priority: 0.8,
    },
    {
      url: `${baseUrl}/blog/ai-receptionist-vs-hiring-staff`,
      lastModified: new Date("2026-04-05"),
      changeFrequency: "monthly",
      priority: 0.8,
    },
    {
      url: `${baseUrl}/blog/multilingual-ai-untapped-revenue`,
      lastModified: new Date("2026-04-03"),
      changeFrequency: "monthly",
      priority: 0.8,
    },
    {
      url: `${baseUrl}/blog/roi-of-ai-automation-local-business`,
      lastModified: new Date("2026-04-01"),
      changeFrequency: "monthly",
      priority: 0.8,
    },
  ];
}
