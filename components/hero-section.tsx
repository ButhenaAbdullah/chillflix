"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { Play, Info, Volume2, VolumeX } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Movie, MovieImages, getImageUrl, getMovieImages } from "@/lib/tmdb"
import { cn } from "@/lib/utils"

interface HeroSectionProps {
  movies: Movie[]
}

export function HeroSection({ movies }: HeroSectionProps) {
  const [currentIndex, setCurrentIndex] = useState(0)
  const [isMuted, setIsMuted] = useState(true)
  const [movieLogo, setMovieLogo] = useState<string | null>(null)
  const [isLoading, setIsLoading] = useState(true)

  const featuredMovies = movies.slice(0, 5)
  const currentMovie = featuredMovies[currentIndex]

  useEffect(() => {
    const fetchLogo = async () => {
      if (currentMovie) {
        setIsLoading(true)
        try {
          const images: MovieImages = await getMovieImages(currentMovie.id)
          const englishLogo = images.logos.find((logo) => logo.iso_639_1 === "en")
          const anyLogo = images.logos[0]
          const logoPath = englishLogo?.file_path || anyLogo?.file_path || null
          setMovieLogo(logoPath ? getImageUrl(logoPath, "w500") : null)
        } catch (error) {
          console.error("Failed to fetch movie logo:", error)
          setMovieLogo(null)
        }
        setIsLoading(false)
      }
    }
    fetchLogo()
  }, [currentMovie])

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % featuredMovies.length)
    }, 8000)
    return () => clearInterval(interval)
  }, [featuredMovies.length])

  if (!currentMovie) return null

  return (
    <section className="relative h-[85vh] md:h-screen w-full overflow-hidden">
      {/* Background Image */}
      <div className="absolute inset-0">
        <img
          src={getImageUrl(currentMovie.backdrop_path, "original")}
          alt={currentMovie.title}
          className="absolute inset-0 w-full h-full object-cover object-center"
        />
        {/* Gradient Overlays */}
        <div className="absolute inset-0 bg-gradient-to-r from-black via-black/60 to-transparent" />
        <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-black/30" />
      </div>

      {/* Content */}
      <div className="relative z-10 h-full flex flex-col justify-end pb-32 md:pb-48 px-4 md:px-12 lg:px-16 max-w-[1800px] mx-auto">
        <div className="max-w-2xl space-y-4 md:space-y-6">
          {/* Movie Logo or Title */}
          <div className="min-h-[80px] md:min-h-[120px] flex items-end">
            {isLoading ? (
              <div className="w-64 h-16 md:w-96 md:h-24 bg-white/10 animate-pulse rounded" />
            ) : movieLogo ? (
              <img
                src={movieLogo}
                alt={currentMovie.title}
                className="max-w-[280px] md:max-w-[400px] max-h-[120px] h-auto object-contain drop-shadow-2xl"
              />
            ) : (
              <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold text-white text-balance drop-shadow-2xl">
                {currentMovie.title}
              </h1>
            )}
          </div>

          {/* Movie Info */}
          <div className="flex items-center gap-3 text-white/90">
            <span className="text-green-500 font-semibold">
              {Math.round(currentMovie.vote_average * 10)}% Match
            </span>
            <span className="text-sm">{currentMovie.release_date?.split("-")[0]}</span>
            <span className="border border-white/40 px-1.5 py-0.5 text-xs rounded">HD</span>
          </div>

          {/* Overview */}
          <p className="text-white/80 text-sm md:text-base line-clamp-3 leading-relaxed max-w-xl">
            {currentMovie.overview}
          </p>

          {/* Action Buttons */}
          <div className="flex items-center gap-3 pt-2">
            <Button
              size="lg"
              className="bg-white text-black hover:bg-white/90 font-semibold gap-2"
            >
              <Play className="h-5 w-5 fill-current" />
              Play
            </Button>
            <Link href={`/movie/${currentMovie.id}`}>
              <Button
                size="lg"
                variant="secondary"
                className="bg-white/20 text-white hover:bg-white/30 font-semibold gap-2 backdrop-blur-sm"
              >
                <Info className="h-5 w-5" />
                More Info
              </Button>
            </Link>
          </div>
        </div>

        {/* Mute Button */}
        <Button
          variant="ghost"
          size="icon"
          className="absolute right-4 md:right-12 bottom-32 md:bottom-48 border border-white/40 rounded-full text-white hover:bg-white/10"
          onClick={() => setIsMuted(!isMuted)}
        >
          {isMuted ? <VolumeX className="h-5 w-5" /> : <Volume2 className="h-5 w-5" />}
        </Button>

        {/* Slide Indicators */}
        <div className="absolute right-4 md:right-12 bottom-20 md:bottom-36 flex flex-col gap-1">
          {featuredMovies.map((_, index) => (
            <button
              key={index}
              onClick={() => setCurrentIndex(index)}
              className={cn(
                "w-1 h-6 rounded-full transition-all duration-300",
                index === currentIndex ? "bg-white" : "bg-white/30 hover:bg-white/50"
              )}
            />
          ))}
        </div>
      </div>
    </section>
  )
}
