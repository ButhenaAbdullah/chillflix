"use client"

import { useState } from "react"
import Link from "next/link"
import { Play, Plus, ThumbsUp, ChevronDown } from "lucide-react"
import { Movie, getImageUrl } from "@/lib/tmdb"
import { cn } from "@/lib/utils"

interface MovieCardProps {
  movie: Movie
  index?: number
}

export function MovieCard({ movie, index }: MovieCardProps) {
  const [isHovered, setIsHovered] = useState(false)

  return (
    <Link href={`/movie/${movie.id}`}>
      <div
        className="relative group cursor-pointer"
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
      >
        {/* Card Container */}
        <div
          className={cn(
            "relative aspect-[2/3] rounded-md overflow-hidden transition-all duration-300",
            isHovered && "scale-110 z-20 shadow-2xl shadow-black/50"
          )}
        >
          <img
            src={getImageUrl(movie.poster_path, "w500")}
            alt={movie.title}
            className="absolute inset-0 w-full h-full object-cover"
          />

          {/* Ranking Badge */}
          {index !== undefined && index < 10 && (
            <div className="absolute bottom-0 left-0 text-8xl font-black text-white/30 leading-none -translate-x-2 translate-y-2">
              {index + 1}
            </div>
          )}

          {/* Hover Overlay */}
          <div
            className={cn(
              "absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent opacity-0 transition-opacity duration-300",
              isHovered && "opacity-100"
            )}
          />

          {/* Quick Info on Hover */}
          {isHovered && (
            <div className="absolute inset-x-0 bottom-0 p-3 space-y-2">
              <div className="flex items-center justify-between gap-2">
                <div className="flex items-center gap-1">
                  <button className="p-1.5 bg-white rounded-full hover:bg-white/90 transition">
                    <Play className="h-4 w-4 text-black fill-current" />
                  </button>
                  <button className="p-1.5 bg-black/60 border border-white/40 rounded-full hover:border-white transition">
                    <Plus className="h-4 w-4 text-white" />
                  </button>
                  <button className="p-1.5 bg-black/60 border border-white/40 rounded-full hover:border-white transition">
                    <ThumbsUp className="h-4 w-4 text-white" />
                  </button>
                </div>
                <button className="p-1.5 bg-black/60 border border-white/40 rounded-full hover:border-white transition">
                  <ChevronDown className="h-4 w-4 text-white" />
                </button>
              </div>

              <div className="flex items-center gap-2 text-xs">
                <span className="text-green-500 font-semibold">
                  {Math.round(movie.vote_average * 10)}% Match
                </span>
                <span className="text-white/70">{movie.release_date?.split("-")[0]}</span>
              </div>
            </div>
          )}
        </div>
      </div>
    </Link>
  )
}
