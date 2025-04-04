import type { Metadata } from "next"
import { notFound } from "next/navigation"
import Script from "next/script"

import { AppSidebar } from "@/components/app-sidebar"
import { GamePlayer } from "@/components/game-player"
import { getGameBySlug, getUnblockedGames } from "@/lib/game-service"
import { getGameMetadata, generateGameJsonLd } from "@/lib/seo-utils"
import { SidebarInset, SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar"

// Generate metadata for the game page
export async function generateMetadata({
  params,
}: {
  params: { slug: string }
}): Promise<Metadata> {
  const { slug } = await params
  const game = await getGameBySlug(slug)

  if (!game) {
    return {
      title: "Game Not Found",
      description: "The requested game could not be found.",
    }
  }

  const metadata = getGameMetadata(game)

  return {
    title: metadata.title,
    description: metadata.description,
    keywords: metadata.keywords,
    openGraph: {
      title: metadata.title,
      description: metadata.description,
      url: metadata.url,
      images: [
        {
          url: metadata.ogImage || "/og-image.jpg",
          width: 1200,
          height: 630,
          alt: game.title,
        },
      ],
      type: "website",
    },
    twitter: {
      card: "summary_large_image",
      title: metadata.title,
      description: metadata.description,
      images: [metadata.ogImage || "/og-image.jpg"],
    },
    alternates: {
      canonical: metadata.url,
    },
  }
}

export default async function GamePage({
  params,
}: {
  params: { slug: string }
}) {
  const { slug } = params
  const game = await getGameBySlug(slug)
  const { games } = await getUnblockedGames()

  if (!game) {
    notFound()
  }

  // Generate JSON-LD for this game
  const jsonLd = generateGameJsonLd(game)

  return (
    <>
      <Script
        id={`game-jsonld-${game.id}`}
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <SidebarProvider>
        <AppSidebar games={games} currentSlug={slug} />
        <SidebarInset>
          <header className="flex h-16 shrink-0 items-center gap-2 border-b px-4">
            <SidebarTrigger className="-ml-1" />
            <h1 className="text-xl font-bold">{game.title}</h1>
          </header>
          <main className="flex flex-1 p-4">
            <GamePlayer game={game} />
          </main>
        </SidebarInset>
      </SidebarProvider>
    </>
  )
}

