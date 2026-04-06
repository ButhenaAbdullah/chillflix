"use client"

import { useState } from "react"
import Link from "next/link"
import { Search, Bell, User, Menu, X } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { cn } from "@/lib/utils"

interface NavbarProps {
  onSearch?: (query: string) => void
}

export function Navbar({ onSearch }: NavbarProps) {
  const [isScrolled, setIsScrolled] = useState(false)
  const [isSearchOpen, setIsSearchOpen] = useState(false)
  const [searchQuery, setSearchQuery] = useState("")
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)

  if (typeof window !== "undefined") {
    window.addEventListener("scroll", () => {
      setIsScrolled(window.scrollY > 50)
    })
  }

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault()
    if (onSearch && searchQuery.trim()) {
      onSearch(searchQuery)
    }
  }

  return (
    <nav
      className={cn(
        "fixed top-0 left-0 right-0 z-50 transition-all duration-300 px-4 md:px-8 py-4",
        isScrolled ? "bg-black/95 backdrop-blur-sm" : "bg-gradient-to-b from-black/80 to-transparent"
      )}
    >
      <div className="flex items-center justify-between max-w-[1800px] mx-auto">
        <div className="flex items-center gap-8">
          <Link href="/" className="text-2xl md:text-3xl font-bold text-red-600 tracking-tight">
            CHILLFLIX
          </Link>

          <div className="hidden md:flex items-center gap-6">
            <Link href="/" className="text-sm text-white hover:text-gray-300 transition">
              Home
            </Link>
            <Link href="/?category=trending" className="text-sm text-white hover:text-gray-300 transition">
              Trending
            </Link>
            <Link href="/?category=top_rated" className="text-sm text-white hover:text-gray-300 transition">
              Top Rated
            </Link>
            <Link href="/?category=upcoming" className="text-sm text-white hover:text-gray-300 transition">
              Upcoming
            </Link>
          </div>
        </div>

        <div className="flex items-center gap-4">
          <form onSubmit={handleSearch} className="relative hidden md:block">
            <div
              className={cn(
                "flex items-center transition-all duration-300 overflow-hidden",
                isSearchOpen ? "w-64 bg-black/80 border border-white/20 rounded" : "w-8"
              )}
            >
              <Button
                type="button"
                variant="ghost"
                size="icon"
                className="shrink-0 text-white hover:text-red-500"
                onClick={() => setIsSearchOpen(!isSearchOpen)}
              >
                <Search className="h-5 w-5" />
              </Button>
              {isSearchOpen && (
                <Input
                  type="text"
                  placeholder="Search movies..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="border-0 bg-transparent text-white placeholder:text-gray-400 focus-visible:ring-0 focus-visible:ring-offset-0"
                />
              )}
            </div>
          </form>

          <Button variant="ghost" size="icon" className="hidden md:flex text-white hover:text-red-500">
            <Bell className="h-5 w-5" />
          </Button>

          <Button variant="ghost" size="icon" className="hidden md:flex text-white hover:text-red-500">
            <User className="h-5 w-5" />
          </Button>

          <Button
            variant="ghost"
            size="icon"
            className="md:hidden text-white"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          >
            {isMobileMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </Button>
        </div>
      </div>

      {/* Mobile Menu */}
      {isMobileMenuOpen && (
        <div className="md:hidden absolute top-full left-0 right-0 bg-black/95 backdrop-blur-sm border-t border-white/10 p-4">
          <form onSubmit={handleSearch} className="mb-4">
            <Input
              type="text"
              placeholder="Search movies..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="bg-white/10 border-white/20 text-white placeholder:text-gray-400"
            />
          </form>
          <div className="flex flex-col gap-3">
            <Link href="/" className="text-white hover:text-red-500 transition py-2">
              Home
            </Link>
            <Link href="/?category=trending" className="text-white hover:text-red-500 transition py-2">
              Trending
            </Link>
            <Link href="/?category=top_rated" className="text-white hover:text-red-500 transition py-2">
              Top Rated
            </Link>
            <Link href="/?category=upcoming" className="text-white hover:text-red-500 transition py-2">
              Upcoming
            </Link>
          </div>
        </div>
      )}
    </nav>
  )
}
