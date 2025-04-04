import type { Game } from "./game-service"

// Define metadata types
export type MetadataProps = {
  title: string
  description: string
  keywords: string[]
  url: string
  ogImage?: string
}

// Base site metadata
export const siteConfig = {
  name: "Unblocked Games Hub",
  description: "Play the best unblocked games online for free. No downloads required.",
  url: "https://romgamefree.github.io/sidebar", // Replace with your actual domain
  ogImage: "/og-image.jpg", // Default OG image
}

// Generate metadata for home page
export function getHomeMetadata(): MetadataProps {
  return {
    title: `${siteConfig.name} - Play Free Unblocked Games Online`,
    description: `${siteConfig.description} Access hundreds of free games that you can play at school, work, or anywhere.`,
    keywords: [
      "unblocked games",
      "free games",
      "online games",
      "browser games",
      "no download games",
      "school games",
      "work games",
    ],
    url: siteConfig.url,
    ogImage: siteConfig.ogImage,
  }
}

// Generate metadata for game page
export function getGameMetadata(game: Game): MetadataProps {
  return {
    title: `Play ${game.title} - ${siteConfig.name}`,
    description: `${game.description} Play ${game.title} online for free with no downloads required.`,
    keywords: [
      game.title,
      "unblocked",
      "free game",
      "online game",
      "browser game",
      "no download",
      ...game.title.split(" "),
    ],
    url: `${siteConfig.url}/games/${game.slug}`,
    ogImage: game.image,
  }
}

// Generate JSON-LD structured data for a game
export function generateGameJsonLd(game: Game) {
  return {
    "@context": "https://schema.org",
    "@type": "VideoGame",
    name: game.title,
    description: game.description,
    image: game.image,
    url: `${siteConfig.url}/games/${game.slug}`,
    genre: "Browser Game",
    gamePlatform: "Web Browser",
    applicationCategory: "Game",
    offers: {
      "@type": "Offer",
      price: "0",
      priceCurrency: "USD",
      availability: "https://schema.org/InStock",
    },
  }
}

// Generate JSON-LD structured data for the website
export function generateWebsiteJsonLd() {
  return {
    "@context": "https://schema.org",
    "@type": "WebSite",
    name: siteConfig.name,
    description: siteConfig.description,
    url: siteConfig.url,
    potentialAction: {
      "@type": "SearchAction",
      target: `${siteConfig.url}/search?q={search_term_string}`,
      "query-input": "required name=search_term_string",
    },
  }
}

