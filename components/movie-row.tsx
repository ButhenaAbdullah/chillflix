"use client"

import { useRef, useState } from "react"
import { ChevronLeft, ChevronRight } from "lucide-react"
import { Movie } from "@/lib/tmdb"
import { MovieCard } from "./movie-card"
import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"

interface MovieRowProps {
  title: string
  movies: Movie[]
  showRanking?: boolean
}

export function MovieRow({ title, movies, showRanking = false }: MovieRowProps) {
  const rowRef = useRef<HTMLDivElement>(null)
  const [canScrollLeft, setCanScrollLeft] = useState(false)
  const [canScrollRight, setCanScrollRight] = useState(true)

  const checkScroll = () => {
    if (rowRef.current) {
      const { scrollLeft, scrollWidth, clientWidth } = rowRef.current
      setCanScrollLeft(scrollLeft > 0)
      setCanScrollRight(scrollLeft < scrollWidth - clientWidth - 10)
    }
  }

  const scroll = (direction: "left" | "right") => {
    if (rowRef.current) {
      const scrollAmount = rowRef.current.clientWidth * 0.8
      rowRef.current.scrollBy({
        left: direction === "left" ? -scrollAmount : scrollAmount,
        behavior: "smooth",
      })
      setTimeout(checkScroll, 300)
    }
  }

  return (
    <section className="relative py-4 md:py-6 group/row">
      <h2 className="text-lg md:text-xl lg:text-2xl font-semibold text-white mb-3 md:mb-4 px-4 md:px-12 lg:px-16">
        {title}
      </h2>

      <div className="relative">
        {/* Scroll Buttons */}
        <Button
          variant="ghost"
          size="icon"
          className={cn(
            "absolute left-0 top-1/2 -translate-y-1/2 z-10 h-full w-12 rounded-none bg-black/50 hover:bg-black/70 text-white opacity-0 group-hover/row:opacity-100 transition-opacity",
            !canScrollLeft && "hidden"
          )}
          onClick={() => scroll("left")}
        >
          <ChevronLeft className="h-8 w-8" />
        </Button>

        <Button
          variant="ghost"
          size="icon"
          className={cn(
            "absolute right-0 top-1/2 -translate-y-1/2 z-10 h-full w-12 rounded-none bg-black/50 hover:bg-black/70 text-white opacity-0 group-hover/row:opacity-100 transition-opacity",
            !canScrollRight && "hidden"
          )}
          onClick={() => scroll("right")}
        >
          <ChevronRight className="h-8 w-8" />
        </Button>

        {/* Movie Cards Container */}
        <div
          ref={rowRef}
          onScroll={checkScroll}
          className="flex gap-2 md:gap-3 overflow-x-auto scrollbar-hide px-4 md:px-12 lg:px-16 pb-4"
          style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}
        >
          {movies.map((movie, index) => (
            <div key={movie.id} className="shrink-0 w-[140px] md:w-[180px] lg:w-[200px]">
              <MovieCard movie={movie} index={showRanking ? index : undefined} />
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
