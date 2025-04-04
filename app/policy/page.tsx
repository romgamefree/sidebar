import type { Metadata } from "next"
import { AppSidebar } from "@/components/app-sidebar"
import { getUnblockedGames } from "@/lib/game-service"
import { SidebarInset, SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar"
import { siteConfig } from "@/lib/seo-utils"

export const metadata: Metadata = {
  title: "Privacy Policy & Terms of Service | Unblocked Games Hub",
  description: "Read our privacy policy and terms of service to understand how we handle your data and the rules for using our platform.",
  alternates: {
    canonical: `${siteConfig.url}/policy`,
  },
}

export default async function PolicyPage() {
  const games = await getUnblockedGames()

  return (
    <SidebarProvider>
      <AppSidebar games={games} />
      <SidebarInset>
        <header className="flex h-16 shrink-0 items-center gap-2 border-b px-4">
          <SidebarTrigger className="-ml-1" />
          <h1 className="text-xl font-bold">Privacy Policy & Terms</h1>
        </header>
        <main className="flex flex-1 flex-col gap-8 p-4">
          <section className="mx-auto max-w-3xl space-y-8">
            <div className="space-y-4">
              <h2 className="text-2xl font-bold">Privacy Policy</h2>
              <div className="space-y-4 text-muted-foreground">
                <p>
                  At Unblocked Games Hub, we take your privacy seriously. This Privacy Policy explains how we collect, use,
                  and protect your personal information when you use our website.
                </p>
                <h3 className="font-semibold text-foreground">Information We Collect</h3>
                <ul className="list-inside list-disc space-y-2">
                  <li>Basic usage data (browser type, device information)</li>
                  <li>Game preferences and favorites</li>
                  <li>Contact information (if provided through our contact form)</li>
                </ul>
                <h3 className="font-semibold text-foreground">How We Use Your Information</h3>
                <ul className="list-inside list-disc space-y-2">
                  <li>To improve our website and services</li>
                  <li>To respond to your inquiries</li>
                  <li>To provide personalized game recommendations</li>
                </ul>
              </div>
            </div>

            <div className="space-y-4">
              <h2 className="text-2xl font-bold">Terms of Service</h2>
              <div className="space-y-4 text-muted-foreground">
                <p>
                  By using Unblocked Games Hub, you agree to these Terms of Service. Please read them carefully before
                  using our platform.
                </p>
                <h3 className="font-semibold text-foreground">User Responsibilities</h3>
                <ul className="list-inside list-disc space-y-2">
                  <li>Use the platform responsibly and legally</li>
                  <li>Respect other users and their privacy</li>
                  <li>Do not attempt to bypass security measures</li>
                </ul>
                <h3 className="font-semibold text-foreground">Content Guidelines</h3>
                <ul className="list-inside list-disc space-y-2">
                  <li>All games are provided for entertainment purposes only</li>
                  <li>We are not responsible for third-party game content</li>
                  <li>Users must comply with their local laws and regulations</li>
                </ul>
              </div>
            </div>

            <div className="space-y-4">
              <h2 className="text-2xl font-bold">Cookie Policy</h2>
              <div className="space-y-4 text-muted-foreground">
                <p>
                  We use cookies to enhance your browsing experience. By using our website, you consent to our use of
                  cookies as described in this policy.
                </p>
                <h3 className="font-semibold text-foreground">Types of Cookies We Use</h3>
                <ul className="list-inside list-disc space-y-2">
                  <li>Essential cookies for website functionality</li>
                  <li>Analytics cookies to understand usage patterns</li>
                  <li>Preference cookies to remember your settings</li>
                </ul>
              </div>
            </div>

            <div className="space-y-4">
              <h2 className="text-2xl font-bold">Contact Us</h2>
              <p className="text-muted-foreground">
                If you have any questions about our policies, please contact us at{" "}
                <a href="mailto:contact@unblocked-games-hub.com" className="text-primary hover:underline">
                  contact@unblocked-games-hub.com
                </a>
              </p>
            </div>
          </section>
        </main>
      </SidebarInset>
    </SidebarProvider>
  )
} 