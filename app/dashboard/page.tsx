import { redirect } from "next/navigation"

export default function DashboardPage() {
  // Redirect to games page
  redirect("/games")
}

