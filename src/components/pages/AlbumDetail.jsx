import { useState } from 'react'
import { Link, useParams, Navigate } from 'react-router-dom'
import galleryData from '../../data/gallery.json'
import LazyImage from '../ui/LazyImage'
import Lightbox from '../ui/Lightbox'

export default function AlbumDetail() {
  const { id } = useParams()
  const album = galleryData.albums.find(a => a.id === id)
  const [lightboxIndex, setLightboxIndex] = useState(null)

  if (!album) return <Navigate to="/albums" replace />

  return (
    <>
      {/* Album header */}
      <div className="pt-28 md:pt-36 pb-12 bg-white dark:bg-neutral-900">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

          {/* Breadcrumb */}
          <nav className="flex items-center gap-2 text-xs text-neutral-400 dark:text-neutral-500 mb-8">
            <Link to="/" className="hover:text-gold-500 transition-colors">Home</Link>
            <span>/</span>
            <Link to="/albums" className="hover:text-gold-500 transition-colors">Albums</Link>
            <span>/</span>
            <span className="text-neutral-700 dark:text-neutral-300">{album.name}</span>
          </nav>

          <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-6">
            <div>
              <p className="text-xs font-semibold uppercase tracking-[0.2em] text-gold-500 mb-3">
                {album.year}
              </p>
              <h1 className="font-serif text-4xl md:text-5xl text-neutral-900 dark:text-neutral-100 mb-4">
                {album.name}
              </h1>
              <p className="text-neutral-500 dark:text-neutral-400 max-w-lg text-sm leading-relaxed">
                {album.description}
              </p>
            </div>
            <div className="shrink-0 text-right">
              <span className="text-4xl font-serif font-bold text-neutral-200 dark:text-neutral-800">
                {album.photos.length}
              </span>
              <p className="text-xs uppercase tracking-widest text-neutral-400 -mt-1">photos</p>
            </div>
          </div>
        </div>
      </div>

      {/* Masonry grid */}
      <div className="py-8 pb-20 bg-neutral-50 dark:bg-neutral-950 min-h-screen">
        <div className="max-w-7xl mx-auto px-2 sm:px-4">
          <div className="masonry-grid">
            {album.photos.map((photo, i) => (
              <div key={photo.id} className="masonry-item">
                <LazyImage
                  src={photo.thumbnail}
                  alt={photo.caption || album.name}
                  className="w-full rounded-lg"
                  imgClassName="hover:opacity-90 transition-opacity"
                  onClick={() => setLightboxIndex(i)}
                />
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Lightbox */}
      {lightboxIndex !== null && (
        <Lightbox
          photos={album.photos}
          currentIndex={lightboxIndex}
          onClose={() => setLightboxIndex(null)}
          onNavigate={setLightboxIndex}
        />
      )}
    </>
  )
}
