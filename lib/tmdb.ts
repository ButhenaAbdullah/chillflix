const API_KEY = "ef9c70b0814f50c310e540f87a45c022"
const BASE_URL = "https://api.themoviedb.org/3"
const IMAGE_BASE_URL = "https://image.tmdb.org/t/p"

export interface Movie {
  id: number
  title: string
  overview: string
  poster_path: string | null
  backdrop_path: string | null
  release_date: string
  vote_average: number
  genre_ids: number[]
  adult: boolean
}

export interface MovieDetails extends Movie {
  runtime: number
  genres: { id: number; name: string }[]
  tagline: string
  status: string
  budget: number
  revenue: number
  production_companies: { id: number; name: string; logo_path: string | null }[]
}

export interface MovieImages {
  logos: {
    aspect_ratio: number
    file_path: string
    height: number
    width: number
    iso_639_1: string | null
  }[]
  backdrops: {
    aspect_ratio: number
    file_path: string
    height: number
    width: number
  }[]
  posters: {
    aspect_ratio: number
    file_path: string
    height: number
    width: number
  }[]
}

export interface Cast {
  id: number
  name: string
  character: string
  profile_path: string | null
}

export interface Video {
  id: string
  key: string
  name: string
  site: string
  type: string
}

export function getImageUrl(path: string | null, size: string = "original"): string {
  if (!path) return "/placeholder.svg"
  return `${IMAGE_BASE_URL}/${size}${path}`
}

export async function getTrending(): Promise<Movie[]> {
  const res = await fetch(`${BASE_URL}/trending/movie/week?api_key=${API_KEY}`)
  const data = await res.json()
  return data.results
}

export async function getPopular(): Promise<Movie[]> {
  const res = await fetch(`${BASE_URL}/movie/popular?api_key=${API_KEY}`)
  const data = await res.json()
  return data.results
}

export async function getTopRated(): Promise<Movie[]> {
  const res = await fetch(`${BASE_URL}/movie/top_rated?api_key=${API_KEY}`)
  const data = await res.json()
  return data.results
}

export async function getUpcoming(): Promise<Movie[]> {
  const res = await fetch(`${BASE_URL}/movie/upcoming?api_key=${API_KEY}`)
  const data = await res.json()
  return data.results
}

export async function getNowPlaying(): Promise<Movie[]> {
  const res = await fetch(`${BASE_URL}/movie/now_playing?api_key=${API_KEY}`)
  const data = await res.json()
  return data.results
}

export async function getMovieDetails(id: number): Promise<MovieDetails> {
  const res = await fetch(`${BASE_URL}/movie/${id}?api_key=${API_KEY}`)
  return res.json()
}

export async function getMovieImages(id: number): Promise<MovieImages> {
  const res = await fetch(`${BASE_URL}/movie/${id}/images?api_key=${API_KEY}&include_image_language=en,null`)
  return res.json()
}

export async function getMovieCredits(id: number): Promise<{ cast: Cast[] }> {
  const res = await fetch(`${BASE_URL}/movie/${id}/credits?api_key=${API_KEY}`)
  return res.json()
}

export async function getMovieVideos(id: number): Promise<{ results: Video[] }> {
  const res = await fetch(`${BASE_URL}/movie/${id}/videos?api_key=${API_KEY}`)
  return res.json()
}

export async function getSimilarMovies(id: number): Promise<Movie[]> {
  const res = await fetch(`${BASE_URL}/movie/${id}/similar?api_key=${API_KEY}`)
  const data = await res.json()
  return data.results
}

export async function searchMovies(query: string): Promise<Movie[]> {
  const res = await fetch(`${BASE_URL}/search/movie?api_key=${API_KEY}&query=${encodeURIComponent(query)}`)
  const data = await res.json()
  return data.results
}

export async function getGenres(): Promise<{ id: number; name: string }[]> {
  const res = await fetch(`${BASE_URL}/genre/movie/list?api_key=${API_KEY}`)
  const data = await res.json()
  return data.genres
}

export async function getMoviesByGenre(genreId: number): Promise<Movie[]> {
  const res = await fetch(`${BASE_URL}/discover/movie?api_key=${API_KEY}&with_genres=${genreId}`)
  const data = await res.json()
  return data.results
}
