import Link from "next/link"
import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "Page Not Found | Unblocked Games Hub",
  description: "The page you are looking for does not exist.",
  robots: {
    index: false,
    follow: false,
  },
}

export default function NotFound() {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center p-4 text-center">
      <h1 className="mb-4 text-4xl font-bold">404 - Page Not Found</h1>
      <p className="mb-8 text-lg text-muted-foreground">
        The game or page you're looking for doesn't exist or has been moved.
      </p>
      <Link href="/games" className="rounded-md bg-primary px-4 py-2 text-primary-foreground hover:bg-primary/90">
        Browse All Games
      </Link>
    </div>
  )
}

