export const dynamic = "force-static"

import type { MetadataRoute } from "next"
import { getUnblockedGames } from "@/lib/game-service"
import { siteConfig } from "@/lib/seo-utils"

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const { games } = await getUnblockedGames()

  // Base URLs
  const baseUrls = [
    {
      url: siteConfig.url,
      lastModified: new Date(),
      changeFrequency: "daily" as const,
      priority: 1.0,
    },
    {
      url: `${siteConfig.url}/games`,
      lastModified: new Date(),
      changeFrequency: "daily" as const,
      priority: 0.9,
    },
    {
      url: `${siteConfig.url}/contact`,
      lastModified: new Date(),
      changeFrequency: "monthly" as const,
      priority: 0.7,
    },
    {
      url: `${siteConfig.url}/policy`,
      lastModified: new Date(),
      changeFrequency: "monthly" as const,
      priority: 0.7,
    },
  ]

  // Game URLs
  const gameUrls = games.map((game) => ({
    url: `${siteConfig.url}/games/${game.slug}`,
    lastModified: new Date(),
    changeFrequency: "weekly" as const,
    priority: 0.8,
  }))

  return [...baseUrls, ...gameUrls]
}

