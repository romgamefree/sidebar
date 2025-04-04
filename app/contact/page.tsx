import type { Metadata } from "next"
import { AppSidebar } from "@/components/app-sidebar"
import { getUnblockedGames } from "@/lib/game-service"
import { SidebarInset, SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar"
import { siteConfig } from "@/lib/seo-utils"

export const metadata: Metadata = {
  title: "Contact Us | Unblocked Games Hub",
  description: "Get in touch with us. We'd love to hear from you!",
  alternates: {
    canonical: `${siteConfig.url}/contact`,
  },
}

export default async function ContactPage() {
  const { games } = await getUnblockedGames()

  return (
    <SidebarProvider>
      <AppSidebar games={games} />
      <SidebarInset>
        <header className="flex h-16 shrink-0 items-center gap-2 border-b px-4">
          <SidebarTrigger className="-ml-1" />
          <h1 className="text-xl font-bold">Contact Us</h1>
        </header>
        <main className="flex flex-1 flex-col gap-8 p-4">
          <section className="mx-auto max-w-2xl space-y-6">
            <div className="space-y-2">
              <h2 className="text-2xl font-bold">Get in Touch</h2>
              <p className="text-muted-foreground">
                Have questions, suggestions, or feedback? We'd love to hear from you!
              </p>
            </div>

            <div className="grid gap-6 sm:grid-cols-2">
              <div className="space-y-2">
                <h3 className="font-semibold">Email</h3>
                <p className="text-muted-foreground">
                  <a href="mailto:contact@unblocked-games-hub.com" className="hover:underline">
                    contact@unblocked-games-hub.com
                  </a>
                </p>
              </div>
              <div className="space-y-2">
                <h3 className="font-semibold">Follow Us</h3>
                <div className="flex gap-4">
                  <a href="#" className="text-muted-foreground hover:underline">
                    Twitter
                  </a>
                  <a href="#" className="text-muted-foreground hover:underline">
                    Facebook
                  </a>
                  <a href="#" className="text-muted-foreground hover:underline">
                    Discord
                  </a>
                </div>
              </div>
            </div>

            <div className="space-y-4">
              <h3 className="font-semibold">Send us a Message</h3>
              <form className="space-y-4">
                <div className="grid gap-4 sm:grid-cols-2">
                  <div className="space-y-2">
                    <label htmlFor="name" className="text-sm font-medium">
                      Name
                    </label>
                    <input
                      id="name"
                      type="text"
                      className="w-full rounded-md border border-input bg-background px-3 py-2 text-sm"
                      placeholder="Your name"
                    />
                  </div>
                  <div className="space-y-2">
                    <label htmlFor="email" className="text-sm font-medium">
                      Email
                    </label>
                    <input
                      id="email"
                      type="email"
                      className="w-full rounded-md border border-input bg-background px-3 py-2 text-sm"
                      placeholder="your@email.com"
                    />
                  </div>
                </div>
                <div className="space-y-2">
                  <label htmlFor="message" className="text-sm font-medium">
                    Message
                  </label>
                  <textarea
                    id="message"
                    rows={4}
                    className="w-full rounded-md border border-input bg-background px-3 py-2 text-sm"
                    placeholder="Your message..."
                  />
                </div>
                <button
                  type="submit"
                  className="w-full rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground hover:bg-primary/90"
                >
                  Send Message
                </button>
              </form>
            </div>
          </section>
        </main>
      </SidebarInset>
    </SidebarProvider>
  )
} 