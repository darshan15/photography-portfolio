import { useState } from 'react'
import { Link } from 'react-router-dom'
import galleryData from '../../data/gallery.json'
import LazyImage from '../ui/LazyImage'

const { albums } = galleryData

export default function Albums() {
  const [filter, setFilter] = useState('All')
  const years = ['All', ...new Set(albums.map(a => String(a.year))).values()]

  const visible = filter === 'All'
    ? albums
    : albums.filter(a => String(a.year) === filter)

  return (
    <>
      {/* Page header */}
      <div className="pt-32 pb-12 bg-white dark:bg-neutral-900 border-b border-neutral-100 dark:border-neutral-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <p className="text-xs font-semibold uppercase tracking-[0.2em] text-gold-500 mb-3">
            Portfolio
          </p>
          <h1 className="font-serif text-4xl md:text-5xl text-neutral-900 dark:text-neutral-100 mb-4">
            Albums
          </h1>
          <p className="text-neutral-500 dark:text-neutral-400 max-w-lg text-sm leading-relaxed">
            Browse through collections spanning weddings, portraits, corporate events, and more.
          </p>

          {/* Year filter */}
          <div className="flex items-center gap-2 mt-8 flex-wrap">
            {years.map(y => (
              <button
                key={y}
                onClick={() => setFilter(y)}
                className={`px-4 py-1.5 text-xs font-semibold uppercase tracking-widest rounded-full border transition-colors ${
                  filter === y
                    ? 'bg-gold-500 border-gold-500 text-white'
                    : 'border-neutral-200 dark:border-neutral-700 text-neutral-500 dark:text-neutral-400 hover:border-gold-500/50 hover:text-gold-500'
                }`}
              >
                {y}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Album grid */}
      <div className="py-16 bg-neutral-50 dark:bg-neutral-950 min-h-screen">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {visible.length === 0 ? (
            <p className="text-center text-neutral-500 py-20">No albums found.</p>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
              {visible.map((album, i) => (
                <AlbumCard key={album.id} album={album} index={i} />
              ))}
            </div>
          )}
        </div>
      </div>
    </>
  )
}

function AlbumCard({ album, index }) {
  return (
    <Link
      to={`/albums/${album.id}`}
      className="group block"
      style={{ animationDelay: `${index * 0.08}s` }}
    >
      {/* Cover */}
      <div className="relative aspect-[4/3] rounded-2xl overflow-hidden bg-neutral-200 dark:bg-neutral-800 mb-5">
        <LazyImage
          src={album.cover}
          alt={album.name}
          className="absolute inset-0"
          imgClassName="group-hover:scale-105 transition-transform duration-700"
        />
        {/* Overlay on hover */}
        <div className="absolute inset-0 bg-black/0 group-hover:bg-black/30 transition-all duration-300 flex items-center justify-center">
          <div className="opacity-0 group-hover:opacity-100 transition-opacity duration-300 border border-white/70 text-white text-xs font-semibold uppercase tracking-widest px-6 py-2.5 rounded-full">
            View Album
          </div>
        </div>
        {/* Photo count badge */}
        <div className="absolute top-3 right-3 bg-black/50 backdrop-blur-sm text-white text-xs px-2.5 py-1 rounded-full">
          {album.photos.length} photos
        </div>
      </div>

      {/* Info */}
      <div>
        <h2 className="font-serif text-xl text-neutral-900 dark:text-neutral-100 mb-1 group-hover:text-gold-500 transition-colors">
          {album.name}
        </h2>
        <p className="text-xs text-neutral-400 dark:text-neutral-500 mb-2">{album.year}</p>
        <p className="text-sm text-neutral-500 dark:text-neutral-400 leading-relaxed line-clamp-2">
          {album.description}
        </p>
      </div>
    </Link>
  )
}
