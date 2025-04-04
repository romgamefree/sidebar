"use client"

import { useEffect, useState } from "react"
import type { Game } from "@/lib/game-service"

interface GamePlayerProps {
  game: Game
}

export function GamePlayer({ game }: GamePlayerProps) {
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    // Simulate game loading
    const timer = setTimeout(() => {
      setIsLoading(false)
    }, 1500)

    return () => clearTimeout(timer)
  }, [game.id])

  return (
    <article className="flex h-full w-full flex-col">
      {/* <header className="mb-4">
        <h1 className="text-2xl font-bold">{game.title}</h1>
        <p className="text-muted-foreground">{game.description}</p>
      </header> */}

      <section className="relative flex-1 rounded-lg border">
        {isLoading ? (
          <div className="absolute inset-0 flex items-center justify-center bg-muted/50">
            <div className="flex flex-col items-center gap-2">
              <div
                className="h-8 w-8 animate-spin rounded-full border-4 border-primary border-t-transparent"
                aria-hidden="true"
              ></div>
              <p>Loading game...</p>
            </div>
          </div>
        ) : (
          <div className="h-full w-full overflow-hidden rounded-lg bg-black">
            {/* In a real implementation, this would be an iframe or game embed */}
            <div className="flex h-full items-center justify-center">
              <div className="text-center">
                <h2 className="text-xl font-semibold text-white">{game.title} is ready to play!</h2>
                <p className="mt-2 text-gray-300">In a real implementation, the game would be embedded here.</p>
              </div>
            </div>
          </div>
        )}
      </section>
    </article>
  )
}

