import { useState, useEffect, useCallback } from 'react'
import galleryData from '../../data/gallery.json'

function shuffle(arr) {
  const a = [...arr]
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1))
    ;[a[i], a[j]] = [a[j], a[i]]
  }
  return a
}

export default function RandomSpotlight() {
  const [slides, setSlides]     = useState([])
  const [current, setCurrent]   = useState(0)
  const [isPaused, setIsPaused] = useState(false)

  useEffect(() => {
    const featured = galleryData.albums.flatMap(album =>
      album.photos
        .filter(p => p.is_featured)
        .map(p => ({ ...p, album_name: album.name }))
    )
    setSlides(shuffle(featured).slice(0, 7))
  }, [])

  const advance = useCallback(() =>
    setCurrent(c => (c + 1) % slides.length), [slides.length])

  useEffect(() => {
    if (slides.length === 0 || isPaused) return
    const id = setInterval(advance, 4500)
    return () => clearInterval(id)
  }, [slides.length, isPaused, advance])

  if (slides.length === 0) return null

  return (
    <section className="py-20 md:py-28 bg-white dark:bg-neutral-900">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

        {/* Heading */}
        <div className="text-center mb-12">
          <p className="text-xs font-semibold uppercase tracking-[0.2em] text-gold-500 mb-3">
            Curated Selections
          </p>
          <h2 className="font-serif text-3xl md:text-4xl text-neutral-900 dark:text-neutral-100">
            Random Spotlight
          </h2>
          <p className="mt-4 text-neutral-500 dark:text-neutral-400 max-w-md mx-auto text-sm leading-relaxed">
            A fresh selection of our finest work — shuffled anew on every visit.
          </p>
        </div>

        {/* Slideshow */}
        <div
          className="relative aspect-[16/9] md:aspect-[21/9] rounded-2xl overflow-hidden shadow-2xl bg-neutral-200 dark:bg-neutral-800 group"
          onMouseEnter={() => setIsPaused(true)}
          onMouseLeave={() => setIsPaused(false)}
        >
          {slides.map((slide, i) => (
            <div
              key={slide.id}
              className={`absolute inset-0 transition-opacity duration-1000 ${
                i === current ? 'opacity-100' : 'opacity-0'
              }`}
            >
              <img
                src={slide.url}
                alt={slide.caption || slide.album_name}
                className="w-full h-full object-cover"
              />
              {/* Gradient */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/10 to-transparent" />

              {/* Caption */}
              <div className="absolute bottom-6 left-6 right-16 text-white">
                <span className="text-xs font-medium uppercase tracking-widest text-white/60 block mb-1">
                  {slide.album_name}
                </span>
                {slide.caption && (
                  <p className="font-serif text-lg md:text-2xl leading-snug">
                    {slide.caption}
                  </p>
                )}
              </div>
            </div>
          ))}

          {/* Dot navigation */}
          <div className="absolute bottom-5 right-5 flex items-center gap-2">
            {slides.map((_, i) => (
              <button
                key={i}
                onClick={() => setCurrent(i)}
                aria-label={`Go to slide ${i + 1}`}
                className={`rounded-full transition-all duration-300 ${
                  i === current
                    ? 'w-5 h-2 bg-white'
                    : 'w-2 h-2 bg-white/40 hover:bg-white/70'
                }`}
              />
            ))}
          </div>

          {/* Progress bar */}
          <div className="absolute bottom-0 inset-x-0 h-0.5 bg-white/10">
            <div
              key={current}
              className="h-full bg-gold-500 transition-none"
              style={{
                animation: isPaused ? 'none' : 'progress 4.5s linear forwards',
              }}
            />
          </div>
        </div>
      </div>

      <style>{`
        @keyframes progress {
          from { width: 0%; }
          to   { width: 100%; }
        }
      `}</style>
    </section>
  )
}
