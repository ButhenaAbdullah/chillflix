import {
  getTrending,
  getPopular,
  getTopRated,
  getUpcoming,
  getNowPlaying,
} from "@/lib/tmdb"
import { Navbar } from "@/components/navbar"
import { HeroSection } from "@/components/hero-section"
import { MovieRow } from "@/components/movie-row"

export default async function HomePage() {
  const [trending, popular, topRated, upcoming, nowPlaying] = await Promise.all([
    getTrending(),
    getPopular(),
    getTopRated(),
    getUpcoming(),
    getNowPlaying(),
  ])

  return (
    <main className="min-h-screen bg-black">
      <Navbar />

      <HeroSection movies={trending} />

      <div className="relative z-10 -mt-32 md:-mt-48 space-y-2">
        <MovieRow title="Trending Now" movies={trending} showRanking />
        <MovieRow title="Popular on Chillflix" movies={popular} />
        <MovieRow title="Top Rated" movies={topRated} />
        <MovieRow title="New Releases" movies={nowPlaying} />
        <MovieRow title="Coming Soon" movies={upcoming} />
      </div>

      {/* Footer */}
      <footer className="py-12 px-4 md:px-12 lg:px-16 mt-8">
        <div className="max-w-[1800px] mx-auto">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-sm text-white/60">
            <div className="space-y-3">
              <h3 className="text-white font-medium">Navigation</h3>
              <ul className="space-y-2">
                <li><a href="#" className="hover:text-white transition">Home</a></li>
                <li><a href="#" className="hover:text-white transition">TV Shows</a></li>
                <li><a href="#" className="hover:text-white transition">Movies</a></li>
                <li><a href="#" className="hover:text-white transition">New & Popular</a></li>
              </ul>
            </div>
            <div className="space-y-3">
              <h3 className="text-white font-medium">Help</h3>
              <ul className="space-y-2">
                <li><a href="#" className="hover:text-white transition">FAQ</a></li>
                <li><a href="#" className="hover:text-white transition">Help Center</a></li>
                <li><a href="#" className="hover:text-white transition">Account</a></li>
                <li><a href="#" className="hover:text-white transition">Contact Us</a></li>
              </ul>
            </div>
            <div className="space-y-3">
              <h3 className="text-white font-medium">Legal</h3>
              <ul className="space-y-2">
                <li><a href="#" className="hover:text-white transition">Privacy</a></li>
                <li><a href="#" className="hover:text-white transition">Terms of Service</a></li>
                <li><a href="#" className="hover:text-white transition">Cookie Preferences</a></li>
              </ul>
            </div>
            <div className="space-y-3">
              <h3 className="text-white font-medium">Social</h3>
              <ul className="space-y-2">
                <li><a href="#" className="hover:text-white transition">Twitter</a></li>
                <li><a href="#" className="hover:text-white transition">Instagram</a></li>
                <li><a href="#" className="hover:text-white transition">Facebook</a></li>
              </ul>
            </div>
          </div>
          <div className="mt-12 pt-8 border-t border-white/10 text-center text-white/40 text-sm">
            <p>© 2026 SetaX. All rights reserved.</p>
            <p className="mt-2"></p>
          </div>
        </div>
      </footer>
    </main>
  )
}
