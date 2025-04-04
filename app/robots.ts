export const dynamic = "force-static"

import type { MetadataRoute } from "next"
import { siteConfig } from "@/lib/seo-utils"

export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: "*",
      allow: "/",
      disallow: ["/api/", "/admin/"],
    },
    sitemap: `${siteConfig.url}/sitemap.xml`,
  }
}

