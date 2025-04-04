import type { Metadata } from "next"

import { AppSidebar } from "@/components/app-sidebar"
import { getHomeMetadata } from "@/lib/seo-utils"
import { getUnblockedGames } from "@/lib/game-service"
import { SidebarInset, SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar"
import { GamesList } from "@/components/games-list"

// Generate metadata for the games page
export const metadata: Metadata = {
  ...getHomeMetadata(),
  title: "Browse All Games | Unblocked Games Hub",
  alternates: {
    canonical: `${getHomeMetadata().url}/games`,
  },
}

export default async function GamesPage() {
  const { games } = await getUnblockedGames()

  return (
    <SidebarProvider>
      <AppSidebar games={games} />
      <SidebarInset>
        <header className="flex h-16 shrink-0 items-center gap-2 border-b px-4">
          <SidebarTrigger className="-ml-1" />
          <h1 className="text-xl font-bold">Unblocked Games</h1>
        </header>
        <main className="flex flex-1 flex-col gap-4 p-4">
          <section>
            <h2 className="sr-only">Games Collection</h2>
            <GamesList initialGames={games} />
          </section>
        </main>
      </SidebarInset>
    </SidebarProvider>
  )
}

