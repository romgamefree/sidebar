// This service will fetch games from GamePix
export type Game = {
  id: string
  title: string
  description: string
  category: string
  orientation: "portrait" | "landscape" | "all"
  quality_score: number
  width: number
  height: number
  date_modified: string
  date_published: string
  banner_image: string
  image: string
  url: string
  slug: string
  namespace: string
}

type GamePixItem = {
  id: string
  title: string
  namespace: string
  description: string
  category: string
  orientation: "portrait" | "landscape" | "all"
  quality_score: number
  width: number
  height: number
  date_modified: string
  date_published: string
  banner_image: string
  image: string
  url: string
}

export type GamePixResponse = {
  version: string
  title: string
  home_page_url: string
  feed_url: string
  next_url: string | null
  first_page_url: string
  last_page_url: string
  modified: string
  items: GamePixItem[]
}

// Fetch games from GamePix API with pagination
export async function getUnblockedGames(page: number = 1): Promise<{
  games: Game[]
  nextPage: number | null
  totalPages: number
}> {
  try {
    const response = await fetch(`https://feeds.gamepix.com/v2/json?page=${page}&pagination=96`)
    const data: GamePixResponse = await response.json()

    // Extract total pages from last_page_url
    const totalPages = parseInt(data.last_page_url.match(/page=(\d+)/)?.[1] || "1")

    return {
      games: data.items.map((item) => ({
        id: item.id,
        title: item.title,
        description: item.description,
        category: item.category,
        orientation: item.orientation,
        quality_score: item.quality_score,
        width: item.width,
        height: item.height,
        date_modified: item.date_modified,
        date_published: item.date_published,
        banner_image: item.banner_image,
        image: item.image,
        url: item.url,
        slug: item.namespace,
        namespace: item.namespace,
      })),
      nextPage: page < totalPages ? page + 1 : null,
      totalPages,
    }
  } catch (error) {
    console.error("Error fetching games:", error)
    return {
      games: [],
      nextPage: null,
      totalPages: 1,
    }
  }
}

// Function to get a specific game by slug
export async function getGameBySlug(slug: string): Promise<Game | undefined> {
  let page = 1
  let hasMore = true

  while (hasMore) {
    const { games, nextPage } = await getUnblockedGames(page)
    const game = games.find((game) => game.slug === slug)
    
    if (game) return game
    if (!nextPage) hasMore = false
    page = nextPage || 1
  }

  return undefined
}

// Function to get a specific game by id
export async function getGameById(id: string): Promise<Game | undefined> {
  let page = 1
  let hasMore = true

  while (hasMore) {
    const { games, nextPage } = await getUnblockedGames(page)
    const game = games.find((game) => game.id === id)
    
    if (game) return game
    if (!nextPage) hasMore = false
    page = nextPage || 1
  }

  return undefined
}

