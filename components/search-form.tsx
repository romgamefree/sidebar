"use client"

import type React from "react"

import { Search, X } from "lucide-react"
import { useCallback, useState } from "react"

import { Label } from "@/components/ui/label"
import { SidebarGroup, SidebarGroupContent, SidebarInput } from "@/components/ui/sidebar"

interface SearchFormProps extends React.ComponentProps<"form"> {
  onSearch: (query: string) => void
}

export function SearchForm({ onSearch, ...props }: SearchFormProps) {
  const [searchQuery, setSearchQuery] = useState("")

  const handleSearch = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      const query = e.target.value
      setSearchQuery(query)
      onSearch(query)
    },
    [onSearch],
  )

  const clearSearch = useCallback(() => {
    setSearchQuery("")
    onSearch("")
  }, [onSearch])

  return (
    <form {...props} onSubmit={(e) => e.preventDefault()}>
      <SidebarGroup className="py-0">
        <SidebarGroupContent className="relative">
          <Label htmlFor="search" className="sr-only">
            Search Games
          </Label>
          <SidebarInput
            id="search"
            value={searchQuery}
            onChange={handleSearch}
            placeholder="Search games..."
            className="pl-8 pr-8"
          />
          <Search className="pointer-events-none absolute left-2 top-1/2 size-4 -translate-y-1/2 select-none opacity-50" />
          {searchQuery && (
            <button
              type="button"
              onClick={clearSearch}
              className="absolute right-2 top-1/2 -translate-y-1/2 rounded-full p-1 hover:bg-muted"
              aria-label="Clear search"
            >
              <X className="size-3" />
            </button>
          )}
        </SidebarGroupContent>
      </SidebarGroup>
    </form>
  )
}

