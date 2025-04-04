import type { Metadata } from "next"

import { AppSidebar } from "@/components/app-sidebar"
import { getHomeMetadata } from "@/lib/seo-utils"
import { getUnblockedGames } from "@/lib/game-service"
import { SidebarInset, SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar"

// Generate metadata for the games page
export const metadata: Metadata = {
  ...getHomeMetadata(),
  title: "Browse All Games | Unblocked Games Hub",
  alternates: {
    canonical: `${getHomeMetadata().url}/games`,
  },
}

export default async function GamesPage() {
  const games = await getUnblockedGames()

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
            <div className="grid gap-4 md:grid-cols-3 lg:grid-cols-4">
              {games.map((game) => (
                <article
                  key={game.id}
                  className="group flex flex-col overflow-hidden rounded-lg border transition-colors hover:border-primary"
                >
                  <a href={`/games/${game.slug}`} className="flex flex-col h-full">
                    <div className="aspect-video w-full overflow-hidden bg-muted">
                      <img
                        src={game.thumbnail || "/placeholder.svg"}
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
            </div>
          </section>
        </main>
      </SidebarInset>
    </SidebarProvider>
  )
}

