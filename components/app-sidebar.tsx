"use client"

import * as React from "react"
import Image from "next/image"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { Gamepad2 } from "lucide-react"

import { SearchForm } from "./search-form"
import type { Game } from "@/lib/game-service"
import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarRail,
} from "@/components/ui/sidebar"

interface AppSidebarProps extends React.ComponentProps<typeof Sidebar> {
  games: Game[]
  currentSlug?: string
}

export function AppSidebar({ games, currentSlug, ...props }: AppSidebarProps) {
  const pathname = usePathname()
  const [filteredGames, setFilteredGames] = React.useState<Game[]>(Array.isArray(games) ? games : [])
  const [searchActive, setSearchActive] = React.useState(false)

  // If no currentSlug is provided, try to extract it from the pathname
  const activeSlug =
    currentSlug ||
    (() => {
      const match = pathname.match(/\/games\/([^/]+)/)
      return match ? match[1] : undefined
    })()

  // Handle search
  const handleSearch = React.useCallback(
    (query: string) => {
      setSearchActive(!!query)

      if (!query) {
        setFilteredGames(games)
        return
      }

      const lowercaseQuery = query.toLowerCase()
      const results = games.filter(
        (game) =>
          game.title.toLowerCase().includes(lowercaseQuery) || game.description.toLowerCase().includes(lowercaseQuery),
      )

      setFilteredGames(results)
    },
    [games],
  )

  // Group games by first letter for better organization
  const gamesByCategory: Record<string, Game[]> = React.useMemo(() => {
    const result: Record<string, Game[]> = {}

    // If search is active, just use "Search Results" as the category
    if (searchActive) {
      if (filteredGames.length > 0) {
        result["Search Results"] = filteredGames
      } else {
        result["No Results"] = []
      }
      return result
    }

    // Otherwise, group by first letter
    filteredGames.forEach((game) => {
      const firstLetter = game.title.charAt(0).toUpperCase()
      if (!result[firstLetter]) {
        result[firstLetter] = []
      }
      result[firstLetter].push(game)
    })

    return result
  }, [filteredGames, searchActive])

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

  return (
    <Sidebar {...props}>
      <SidebarHeader>
        <div className="flex items-center gap-2 p-4">
          <Gamepad2 className="h-6 w-6" aria-hidden="true" />
          <h1 className="text-xl font-bold">Unblocked Games</h1>
        </div>
        <SearchForm onSearch={handleSearch} />
      </SidebarHeader>
      <SidebarContent>
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
        </nav>
      </SidebarContent>
      <SidebarRail />
    </Sidebar>
  )
}

