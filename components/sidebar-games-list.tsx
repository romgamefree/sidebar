"use client"

import * as React from "react"
import Image from "next/image"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { Game, getUnblockedGames } from "@/lib/game-service"
import {
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuItem,
  SidebarMenuButton,
} from "@/components/ui/sidebar"

interface SidebarGamesListProps {
  initialGames: Game[]
  currentSlug?: string
  searchQuery: string
}

export function SidebarGamesList({ initialGames, currentSlug, searchQuery }: SidebarGamesListProps) {
  const pathname = usePathname()
  const [games, setGames] = React.useState<Game[]>(initialGames)
  const [page, setPage] = React.useState(2)
  const [loading, setLoading] = React.useState(false)
  const [hasMore, setHasMore] = React.useState(true)
  const [filteredGames, setFilteredGames] = React.useState<Game[]>(initialGames)

  // If no currentSlug is provided, try to extract it from the pathname
  const activeSlug =
    currentSlug ||
    (() => {
      const match = pathname.match(/\/games\/([^/]+)/)
      return match ? match[1] : undefined
    })()

  // Filter games based on search query
  React.useEffect(() => {
    if (!searchQuery) {
      setFilteredGames(games)
      return
    }

    const lowercaseQuery = searchQuery.toLowerCase()
    const results = games.filter(
      (game) =>
        game.title.toLowerCase().includes(lowercaseQuery) || game.description.toLowerCase().includes(lowercaseQuery),
    )
    setFilteredGames(results)
  }, [games, searchQuery])

  // Load more games
  const loadMoreGames = async () => {
    if (loading || !hasMore) return

    setLoading(true)
    try {
      const { games: newGames, nextPage } = await getUnblockedGames(page)
      
      // Filter out any duplicate games
      const existingGameIds = new Set(games.map(game => game.id))
      const uniqueNewGames = newGames.filter(game => !existingGameIds.has(game.id))
      
      if (uniqueNewGames.length > 0) {
        setGames((prev) => [...prev, ...uniqueNewGames])
        setPage(nextPage || page + 1)
        setHasMore(!!nextPage)
      } else {
        // If all new games are duplicates, try the next page
        setPage(page + 1)
      }
    } catch (error) {
      console.error("Error loading more games:", error)
    } finally {
      setLoading(false)
    }
  }

  // Group games by first letter for better organization
  const gamesByCategory: Record<string, Game[]> = React.useMemo(() => {
    const result: Record<string, Game[]> = {}
    const seenGameIds = new Set<string>()

    // If search is active, just use "Search Results" as the category
    if (searchQuery) {
      if (filteredGames.length > 0) {
        // Filter out duplicates in search results
        const uniqueSearchResults = filteredGames.filter(game => {
          if (seenGameIds.has(game.id)) return false
          seenGameIds.add(game.id)
          return true
        })
        result["Search Results"] = uniqueSearchResults
      } else {
        result["No Results"] = []
      }
      return result
    }

    // Otherwise, group by first letter
    filteredGames.forEach((game) => {
      // Skip if we've already seen this game
      if (seenGameIds.has(game.id)) return
      seenGameIds.add(game.id)

      const firstLetter = game.title.charAt(0).toUpperCase()
      if (!result[firstLetter]) {
        result[firstLetter] = []
      }
      result[firstLetter].push(game)
    })

    return result
  }, [filteredGames, searchQuery])

  // Sort categories alphabetically, but keep "Search Results" at the top
  const sortedCategories = React.useMemo(() => {
    return Object.keys(gamesByCategory).sort((a, b) => {
      if (a === "Search Results") return -1
      if (b === "Search Results") return 1
      if (a === "No Results") return -1
      if (b === "No Results") return 1
      return a.localeCompare(b)
    })
  }, [gamesByCategory])

  // Handle scroll for infinite loading
  React.useEffect(() => {
    const handleScroll = () => {
      const sidebarContent = document.querySelector(".sidebar-content")
      if (!sidebarContent) return

      const { scrollTop, scrollHeight, clientHeight } = sidebarContent
      if (scrollHeight - scrollTop <= clientHeight + 100) {
        loadMoreGames()
      }
    }

    const sidebarContent = document.querySelector(".sidebar-content")
    if (sidebarContent) {
      sidebarContent.addEventListener("scroll", handleScroll)
      return () => sidebarContent.removeEventListener("scroll", handleScroll)
    }
  }, [page, loading, hasMore])

  return (
    <nav aria-label="Games navigation">
      {sortedCategories.map((category) => (
        <SidebarGroup key={category}>
          <SidebarGroupLabel>{category}</SidebarGroupLabel>
          <SidebarGroupContent>
            {category === "No Results" ? (
              <div className="px-4 py-2 text-sm text-muted-foreground">No games found. Try a different search.</div>
            ) : (
              <SidebarMenu>
                {gamesByCategory[category].map((game) => (
                  <SidebarMenuItem key={game.id}>
                    <SidebarMenuButton
                      asChild
                      isActive={activeSlug === game.slug}
                      className="flex items-center gap-3"
                    >
                      <Link href={`/games/${game.slug}`} aria-label={`Play ${game.title}`}>
                        <Image
                          src={game.image || "/placeholder.svg"}
                          alt={`${game.title} thumbnail`}
                          width={40}
                          height={40}
                          className="rounded-md"
                        />
                        <span>{game.title}</span>
                      </Link>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                ))}
              </SidebarMenu>
            )}
          </SidebarGroupContent>
        </SidebarGroup>
      ))}
      {loading && (
        <div className="flex justify-center py-4">
          <div className="h-6 w-6 animate-spin rounded-full border-2 border-primary border-t-transparent" />
        </div>
      )}
    </nav>
  )
} 