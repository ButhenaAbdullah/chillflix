import Link from "next/link"
import { Clapperboard, Compass, Home, Popcorn, RefreshCcw } from "lucide-react"

import { Navbar } from "@/components/navbar"
import { Button } from "@/components/ui/button"

const spotlights = [
  {
    title: "Trending Now",
    href: "/?category=trending",
    description: "See what everyone is watching this week across Chillflix.",
    gradient: "from-red-600/80 via-orange-500/70 to-amber-400/60",
  },
  {
    title: "Top Rated",
    href: "/?category=top_rated",
    description: "Award winners and critic favorites you can't skip.",
    gradient: "from-white/10 via-white/5 to-white/0",
  },
  {
    title: "New Releases",
    href: "/?category=now_playing",
    description: "Fresh arrivals that just dropped into the catalog.",
    gradient: "from-purple-600/60 via-blue-500/50 to-cyan-400/40",
  },
]

export default function NotFound() {
  return (
    <div className="relative min-h-screen overflow-hidden bg-gradient-to-b from-black via-[#0b0b0f] to-black text-white">
      {/* Atmosphere */}
      <div className="pointer-events-none absolute -left-32 top-0 h-80 w-80 rounded-full bg-red-600/30 blur-3xl" />
      <div className="pointer-events-none absolute right-0 top-10 h-72 w-72 rounded-full bg-purple-600/25 blur-3xl" />
      <div className="pointer-events-none absolute inset-x-10 bottom-0 h-40 rounded-full bg-red-500/20 blur-3xl" />

      <Navbar />

      <main className="relative z-10 mx-auto max-w-[1800px] px-4 pb-16 pt-28 md:px-12 lg:px-16">
        <div className="flex items-center gap-2 text-sm text-white/50">
          <Home className="h-4 w-4" />
          <span className="text-white/50">/</span>
          <span className="text-white/70">Page not found</span>
        </div>

        <div className="mt-10 grid items-start gap-12 lg:grid-cols-[1.1fr,0.9fr]">
          <section className="space-y-6">
            <div className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-4 py-1 text-xs font-semibold uppercase tracking-[0.18em] text-white/70 backdrop-blur">
              <Clapperboard className="h-4 w-4 text-red-400" />
              404 Scene Missing
            </div>

            <div className="space-y-4">
              <p className="text-5xl font-black leading-tight md:text-6xl">
                Lost the reel. <span className="text-red-500">This page isn’t in our library.</span>
              </p>
              <p className="max-w-2xl text-lg text-white/70">
                The title you tried to play couldn&apos;t be found. Jump back to the home screen or pick a
                queue below to keep your marathon rolling.
              </p>
            </div>

            <div className="flex flex-wrap gap-3">
              <Button
                asChild
                size="lg"
                className="bg-red-600 text-white shadow-[0_0_45px_-12px_rgba(248,50,50,0.8)] transition hover:bg-red-500"
              >
                <Link href="/">Go to Homepage</Link>
              </Button>
              <Button
                asChild
                size="lg"
                variant="secondary"
                className="bg-white/10 text-white shadow-[0_10px_40px_-22px_rgba(0,0,0,0.8)] backdrop-blur hover:bg-white/20"
              >
                <Link href="/?category=trending">Browse Trending</Link>
              </Button>
              <Button
                asChild
                size="lg"
                variant="ghost"
                className="text-white hover:text-red-400"
              >
                <Link href="/?category=upcoming">
                  <RefreshCcw className="mr-2 h-4 w-4" />
                  Try Another Title
                </Link>
              </Button>
            </div>

            <div className="grid gap-4 text-sm text-white/70 md:grid-cols-3">
              <div className="rounded-2xl border border-white/10 bg-white/5 p-4 backdrop-blur">
                <p className="text-white font-semibold">Fast Search</p>
                <p className="mt-1 text-white/60">Use the search bar in the top-right to jump to any movie.</p>
              </div>
              <div className="rounded-2xl border border-white/10 bg-white/5 p-4 backdrop-blur">
                <p className="text-white font-semibold">Continue Watching</p>
                <p className="mt-1 text-white/60">Your last session is saved on the home screen.</p>
              </div>
              <div className="rounded-2xl border border-white/10 bg-white/5 p-4 backdrop-blur">
                <p className="text-white font-semibold">Need Help?</p>
                <p className="mt-1 text-white/60">Visit Help Center from the footer to report a bad link.</p>
              </div>
            </div>
          </section>

          <aside className="relative">
            <div className="absolute inset-0 -z-10 rounded-3xl bg-gradient-to-br from-white/10 via-white/0 to-white/0 blur-2xl" />
            <div className="overflow-hidden rounded-3xl border border-white/10 bg-white/5 p-6 shadow-2xl backdrop-blur">
              <div className="flex items-center gap-3 border-b border-white/10 pb-4">
                <div className="grid size-12 place-items-center rounded-2xl bg-gradient-to-br from-red-600 to-orange-500">
                  <Popcorn className="h-6 w-6" />
                </div>
                <div>
                  <p className="text-sm text-white/60">Curated for you</p>
                  <p className="font-semibold">Pick another lane</p>
                </div>
              </div>

              <div className="mt-4 grid gap-4 sm:grid-cols-2">
                {spotlights.map((item) => (
                  <div
                    key={item.title}
                    className={`group relative overflow-hidden rounded-2xl border border-white/10 bg-gradient-to-br ${item.gradient} p-4 shadow-lg transition duration-300 hover:-translate-y-1 hover:shadow-red-500/20`}
                  >
                    <div className="flex items-start justify-between gap-3">
                      <div>
                        <p className="text-xs uppercase tracking-[0.2em] text-white/70">Queue</p>
                        <h3 className="text-lg font-semibold text-white">{item.title}</h3>
                        <p className="mt-2 text-sm text-white/75">{item.description}</p>
                      </div>
                      <Compass className="h-5 w-5 text-white/60" />
                    </div>

                    <div className="relative mt-4 h-24 overflow-hidden rounded-xl border border-white/20 bg-black/30">
                      <div className="absolute inset-0 bg-gradient-to-r from-black/70 via-black/20 to-transparent" />
                      <img
                        src="/placeholder.jpg"
                        alt={`${item.title} preview`}
                        className="h-full w-full object-cover opacity-80 transition duration-500 group-hover:scale-105"
                      />
                    </div>

                    <Button
                      asChild
                      size="sm"
                      className="mt-3 bg-white/20 text-white backdrop-blur hover:bg-white/30"
                    >
                      <Link href={item.href}>Open queue</Link>
                    </Button>
                  </div>
                ))}
              </div>
            </div>
          </aside>
        </div>
      </main>
    </div>
  )
}
