import { useEffect, useCallback } from 'react'

export default function Lightbox({ photos, currentIndex, onClose, onNavigate }) {
  const photo = photos[currentIndex]
  const total = photos.length

  const prev = useCallback(() =>
    onNavigate((currentIndex - 1 + total) % total), [currentIndex, total, onNavigate])

  const next = useCallback(() =>
    onNavigate((currentIndex + 1) % total), [currentIndex, total, onNavigate])

  useEffect(() => {
    const onKey = (e) => {
      if (e.key === 'Escape')     onClose()
      if (e.key === 'ArrowLeft')  prev()
      if (e.key === 'ArrowRight') next()
    }
    window.addEventListener('keydown', onKey)
    const prev_overflow = document.body.style.overflow
    document.body.style.overflow = 'hidden'
    return () => {
      window.removeEventListener('keydown', onKey)
      document.body.style.overflow = prev_overflow
    }
  }, [onClose, prev, next])

  if (!photo) return null

  return (
    <div
      className="fixed inset-0 z-[200] bg-black/96 flex items-center justify-center animate-fade-in"
      onClick={onClose}
    >
      {/* Top bar */}
      <div className="absolute top-0 inset-x-0 flex items-center justify-between px-5 py-4">
        <span className="text-white/50 text-sm font-medium tabular-nums">
          {currentIndex + 1} / {total}
        </span>
        <button
          onClick={onClose}
          aria-label="Close lightbox"
          className="p-2 text-white/60 hover:text-white transition-colors rounded-full hover:bg-white/10"
        >
          <XIcon />
        </button>
      </div>

      {/* Main image area */}
      <div
        className="relative flex items-center justify-center w-full h-full px-16 py-16"
        onClick={e => e.stopPropagation()}
      >
        <img
          key={photo.id}
          src={photo.url}
          alt={photo.caption || ''}
          className="max-w-full max-h-full object-contain animate-fade-in rounded-sm shadow-2xl"
          style={{ maxHeight: 'calc(100vh - 160px)' }}
        />

        {photo.caption && (
          <div className="absolute bottom-5 inset-x-0 text-center px-8">
            <p className="text-white/70 text-sm font-light tracking-wide">{photo.caption}</p>
          </div>
        )}
      </div>

      {/* Prev / Next */}
      {total > 1 && (
        <>
          <button
            onClick={e => { e.stopPropagation(); prev() }}
            aria-label="Previous photo"
            className="absolute left-3 top-1/2 -translate-y-1/2 p-3 text-white/60 hover:text-white bg-white/5 hover:bg-white/15 rounded-full transition-all"
          >
            <ChevronLeftIcon />
          </button>
          <button
            onClick={e => { e.stopPropagation(); next() }}
            aria-label="Next photo"
            className="absolute right-3 top-1/2 -translate-y-1/2 p-3 text-white/60 hover:text-white bg-white/5 hover:bg-white/15 rounded-full transition-all"
          >
            <ChevronRightIcon />
          </button>
        </>
      )}
    </div>
  )
}

function XIcon() {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <line x1="18" y1="6"  x2="6"  y2="18"/>
      <line x1="6"  y1="6"  x2="18" y2="18"/>
    </svg>
  )
}

function ChevronLeftIcon() {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <polyline points="15 18 9 12 15 6"/>
    </svg>
  )
}

function ChevronRightIcon() {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <polyline points="9 18 15 12 9 6"/>
    </svg>
  )
}
