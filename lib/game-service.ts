// This service will fetch games from GamePix
export type Game = {
  id: string
  title: string
  thumbnail: string
  description: string
  slug: string // Changed from url to slug for clarity
}

// This is a mock function that simulates fetching games from GamePix
// In a real implementation, you would make an API call to GamePix
export async function getUnblockedGames(): Promise<Game[]> {
  // In a real implementation, you would fetch from GamePix API
  // For now, we'll return mock data
  return [
    {
      id: "1",
      title: "Minecraft Classic",
      thumbnail: "/placeholder.svg?height=80&width=120",
      description: "Build and explore in this classic block-building game",
      slug: "minecraft-classic",
    },
    {
      id: "2",
      title: "Among Us",
      thumbnail: "/placeholder.svg?height=80&width=120",
      description: "Find the impostor among your crewmates",
      slug: "among-us",
    },
    {
      id: "3",
      title: "Fortnite",
      thumbnail: "/placeholder.svg?height=80&width=120",
      description: "Battle royale game with building mechanics",
      slug: "fortnite",
    },
    {
      id: "4",
      title: "Roblox",
      thumbnail: "/placeholder.svg?height=80&width=120",
      description: "Platform with user-created games",
      slug: "roblox",
    },
    {
      id: "5",
      title: "Fall Guys",
      thumbnail: "/placeholder.svg?height=80&width=120",
      description: "Obstacle course battle royale game",
      slug: "fall-guys",
    },
    {
      id: "6",
      title: "Subway Surfers",
      thumbnail: "/placeholder.svg?height=80&width=120",
      description: "Endless runner mobile game",
      slug: "subway-surfers",
    },
    {
      id: "7",
      title: "Candy Crush",
      thumbnail: "/placeholder.svg?height=80&width=120",
      description: "Match-three puzzle game",
      slug: "candy-crush",
    },
    {
      id: "8",
      title: "PUBG Mobile",
      thumbnail: "/placeholder.svg?height=80&width=120",
      description: "Mobile battle royale game",
      slug: "pubg-mobile",
    },
    {
      id: "9",
      title: "Clash of Clans",
      thumbnail: "/placeholder.svg?height=80&width=120",
      description: "Strategy mobile game",
      slug: "clash-of-clans",
    },
    {
      id: "10",
      title: "Call of Duty Mobile",
      thumbnail: "/placeholder.svg?height=80&width=120",
      description: "First-person shooter mobile game",
      slug: "call-of-duty-mobile",
    },
  ]
}

// Function to get a specific game by slug
export async function getGameBySlug(slug: string): Promise<Game | undefined> {
  const games = await getUnblockedGames()
  return games.find((game) => game.slug === slug)
}

// Function to get a specific game by id
export async function getGameById(id: string): Promise<Game | undefined> {
  const games = await getUnblockedGames()
  return games.find((game) => game.id === id)
}

