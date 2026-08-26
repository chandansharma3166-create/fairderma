import type { MetadataRoute } from "next";
import { TREATMENTS } from "@/data/treatments";

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = "https://fairderma.vercel.app";

  const treatmentUrls = TREATMENTS.map((treatment) => ({
    url: `${baseUrl}/services/${treatment.slug}`,
    lastModified: new Date(),
    changeFrequency: "monthly" as const,
    priority: 0.8,
  }));

  return [
    {
      url: baseUrl,
      lastModified: new Date(),
      changeFrequency: "weekly",
      priority: 1.0,
    },
    {
      url: `${baseUrl}/services`,
      lastModified: new Date(),
      changeFrequency: "weekly",
      priority: 0.9,
    },
    ...treatmentUrls,
  ];
}