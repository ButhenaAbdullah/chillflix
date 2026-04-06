import { notFound } from "next/navigation"
import Link from "next/link"
import { ArrowLeft, Play, Plus, Share2, ThumbsUp, Clock, Star, Calendar } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import {
  getMovieDetails,
  getMovieImages,
  getMovieCredits,
  getMovieVideos,
  getSimilarMovies,
  getImageUrl,
  MovieDetails,
  MovieImages,
  Cast,
  Video,
  Movie,
} from "@/lib/tmdb"
import { MovieRow } from "@/components/movie-row"

interface MoviePageProps {
  params: Promise<{ id: string }>
}

export default async function MoviePage({ params }: MoviePageProps) {
  const { id } = await params
  const movieId = parseInt(id)

  if (isNaN(movieId)) {
    notFound()
  }

  let movie: MovieDetails
  let images: MovieImages
  let credits: { cast: Cast[] }
  let videos: { results: Video[] }
  let similarMovies: Movie[]

  try {
    ;[movie, images, credits, videos, similarMovies] = await Promise.all([
      getMovieDetails(movieId),
      getMovieImages(movieId),
      getMovieCredits(movieId),
      getMovieVideos(movieId),
      getSimilarMovies(movieId),
    ])
  } catch (error) {
    console.error("Failed to fetch movie details:", error)
    notFound()
  }

  // Get movie logo (prefer English)
  const englishLogo = images.logos.find((logo) => logo.iso_639_1 === "en")
  const movieLogo = englishLogo?.file_path || images.logos[0]?.file_path || null

  // Get trailer
  const trailer = videos.results.find(
    (video) => video.type === "Trailer" && video.site === "YouTube"
  )

  // Format runtime
  const hours = Math.floor(movie.runtime / 60)
  const minutes = movie.runtime % 60
  const runtime = `${hours}h ${minutes}m`

  // Top cast
  const topCast = credits.cast.slice(0, 8)

  return (
    <main className="min-h-screen bg-black text-white">
      {/* Hero Section with Backdrop */}
      <section className="relative h-[70vh] md:h-[80vh] w-full">
        <div className="absolute inset-0">
          <img
            src={getImageUrl(movie.backdrop_path, "original")}
            alt={movie.title}
            className="absolute inset-0 w-full h-full object-cover object-center"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-black via-black/70 to-transparent" />
          <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-black/40" />
        </div>

        {/* Back Button */}
        <Link
          href="/"
          className="absolute top-20 left-4 md:left-12 z-20 flex items-center gap-2 text-white/80 hover:text-white transition"
        >
          <ArrowLeft className="h-5 w-5" />
          <span className="hidden md:inline">Back to Home</span>
        </Link>

        {/* Movie Info */}
        <div  className="relative z-10 h-full flex flex-col justify-end pb-12 md:pb-16 px-4 md:px-12 lg:px-16 max-w-[1800px] mx-auto">
          <div className="max-w-3xl space-y-4 md:space-y-6" style={{ marginTop: "12px" }}>
            {/* Movie Logo or Title */}
            <div className="flex items-end" style={{ marginBottom: "12px" }}>
              {movieLogo ? (
                <img
                  src={getImageUrl(movieLogo, "w500")}
                  alt={movie.title}
                  className="max-w-[300px] md:max-w-[450px] max-h-[150px] h-auto object-contain drop-shadow-2xl"
                  
                />
              ) : (
                <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold text-balance drop-shadow-2xl">
                  {movie.title}
                </h1>
              )}
            </div>

            {/* Tagline */}
            {movie.tagline && (
              <p className="text-white/70 text-lg md:text-xl italic">{movie.tagline}</p>
            )}

            {/* Meta Info */}
            <div className="flex flex-wrap items-center gap-3 md:gap-4 text-sm md:text-base">
              <div className="flex items-center gap-1.5 text-green-500 font-semibold">
                <Star className="h-4 w-4 fill-current" />
                <span>{movie.vote_average.toFixed(1)}</span>
              </div>
              <div className="flex items-center gap-1.5 text-white/80">
                <Calendar className="h-4 w-4" />
                <span>{movie.release_date?.split("-")[0]}</span>
              </div>
              <div className="flex items-center gap-1.5 text-white/80">
                <Clock className="h-4 w-4" />
                <span>{runtime}</span>
              </div>
              <Badge variant="outline" className="border-white/40 text-white">
                HD
              </Badge>
            </div>

            {/* Genres */}
            <div className="flex flex-wrap gap-2">
              {movie.genres.map((genre) => (
                <Badge
                  key={genre.id}
                  variant="secondary"
                  className="bg-white/10 text-white hover:bg-white/20"
                >
                  {genre.name}
                </Badge>
              ))}
            </div>

            {/* Overview */}
            <p className="text-white/80 text-sm md:text-base leading-relaxed max-w-2xl">
              {movie.overview}
            </p>

            {/* Action Buttons */}
            <div className="flex flex-wrap items-center gap-3 pt-2">
              {trailer ? (
                <a
                  href={`https://www.youtube.com/watch?v=${trailer.key}`}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <Button
                    size="lg"
                    className="bg-white text-black hover:bg-white/90 font-semibold gap-2"
                  >
                    <Play className="h-5 w-5 fill-current" />
                    Watch Trailer
                  </Button>
                </a>
              ) : (
                <Button
                  size="lg"
                  className="bg-white text-black hover:bg-white/90 font-semibold gap-2"
                >
                  <Play className="h-5 w-5 fill-current" />
                  Play
                </Button>
              )}
              <Button
                size="lg"
                variant="secondary"
                className="bg-white/20 text-white hover:bg-white/30 font-semibold gap-2 backdrop-blur-sm"
              >
                <Plus className="h-5 w-5" />
                My List
              </Button>
              <Button
                size="icon"
                variant="ghost"
                className="border border-white/40 rounded-full text-white hover:bg-white/10"
              >
                <ThumbsUp className="h-5 w-5" />
              </Button>
              <Button
                size="icon"
                variant="ghost"
                className="border border-white/40 rounded-full text-white hover:bg-white/10"
              >
                <Share2 className="h-5 w-5" />
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Cast Section */}
      {topCast.length > 0 && (
        <section className="py-8 md:py-12 px-4 md:px-12 lg:px-16 max-w-[1800px] mx-auto">
          <h2 className="text-xl md:text-2xl font-semibold mb-6">Top Cast</h2>
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 xl:grid-cols-8 gap-4">
            {topCast.map((actor) => (
              <div key={actor.id} className="text-center group">
                <div className="relative w-full aspect-square rounded-full overflow-hidden mb-3 bg-white/10">
                  {actor.profile_path ? (
                    <img
                      src={getImageUrl(actor.profile_path, "w185")}
                      alt={actor.name}
                      className="absolute inset-0 w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
                    />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center text-4xl text-white/30">
                      {actor.name[0]}
                    </div>
                  )}
                </div>
                <p className="font-medium text-sm text-white truncate">{actor.name}</p>
                <p className="text-xs text-white/60 truncate">{actor.character}</p>
              </div>
            ))}
          </div>
        </section>
      )}

      {/* Similar Movies */}
      {similarMovies.length > 0 && (
        <div className="pb-12">
          <MovieRow title="More Like This" movies={similarMovies} />
        </div>
      )}
    </main>
  )
}
