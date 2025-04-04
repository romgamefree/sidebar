"use client"

import * as React from "react"
import { Gamepad2 } from "lucide-react"

import { SearchForm } from "./search-form"
import type { Game } from "@/lib/game-service"
import { Sidebar, SidebarContent, SidebarHeader, SidebarRail } from "@/components/ui/sidebar"
import { SidebarGamesList } from "./sidebar-games-list"

interface AppSidebarProps extends React.ComponentProps<typeof Sidebar> {
  games: Game[]
  currentSlug?: string
}

export function AppSidebar({ games, currentSlug, ...props }: AppSidebarProps) {
  const [searchQuery, setSearchQuery] = React.useState("")

  return (
    <Sidebar {...props}>
      <SidebarHeader>
        <div className="flex items-center gap-2 p-4">
          <Gamepad2 className="h-6 w-6" aria-hidden="true" />
          <h1 className="text-xl font-bold">Unblocked Games</h1>
        </div>
        <SearchForm onSearch={setSearchQuery} />
      </SidebarHeader>
      <SidebarContent className="sidebar-content">
        <SidebarGamesList 
          initialGames={games} 
          currentSlug={currentSlug} 
          searchQuery={searchQuery}
        />
      </SidebarContent>
      <SidebarRail />
    </Sidebar>
  )
}

