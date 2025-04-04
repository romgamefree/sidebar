"use client"

import { useEffect, useState } from "react"
import { Game, getUnblockedGames } from "@/lib/game-service"

export function GamesList({ initialGames }: { initialGames: Game[] }) {
  const [games, setGames] = useState<Game[]>(initialGames)
  const [page, setPage] = useState(2) // Start from page 2 since we already have page 1
  const [loading, setLoading] = useState(false)
  const [hasMore, setHasMore] = useState(true)

  const loadMoreGames = async () => {
    if (loading || !hasMore) return

    setLoading(true)
    try {
      const { games: newGames, nextPage } = await getUnblockedGames(page)
      setGames((prev) => [...prev, ...newGames])
      setPage(nextPage || page + 1)
      setHasMore(!!nextPage)
    } catch (error) {
      console.error("Error loading more games:", error)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    const handleScroll = () => {
      if (
        window.innerHeight + document.documentElement.scrollTop >=
        document.documentElement.offsetHeight - 100
      ) {
        loadMoreGames()
      }
    }

    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [page, loading, hasMore])

  return (
    <div className="grid gap-4 md:grid-cols-3 lg:grid-cols-4">
      {games.map((game) => (
        <article
          key={game.id}
          className="group flex flex-col overflow-hidden rounded-lg border transition-colors hover:border-primary"
        >
          <a href={`/games/${game.slug}`} className="flex flex-col h-full">
            <div className="aspect-video w-full overflow-hidden bg-muted">
              <img
                src={game.banner_image}
                alt={`${game.title} thumbnail`}
                className="h-full w-full object-cover transition-transform group-hover:scale-105"
                width={320}
                height={180}
              />
            </div>
            <div className="flex flex-1 flex-col p-4">
              <h3 className="font-semibold">{game.title}</h3>
              <p className="line-clamp-2 text-sm text-muted-foreground">{game.description}</p>
            </div>
          </a>
        </article>
      ))}
      {loading && (
        <div className="col-span-full flex justify-center py-8">
          <div className="h-8 w-8 animate-spin rounded-full border-4 border-primary border-t-transparent" />
        </div>
      )}
    </div>
  )
} 