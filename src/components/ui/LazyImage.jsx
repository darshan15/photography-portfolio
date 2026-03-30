import { useState, useRef, useEffect } from 'react'

/**
 * LazyImage — only starts loading once the element enters the viewport.
 * Shows a shimmer skeleton until the image is loaded, then fades it in.
 */
export default function LazyImage({ src, alt, className = '', imgClassName = '', onClick }) {
  const [inView, setInView]   = useState(false)
  const [loaded, setLoaded]   = useState(false)
  const ref = useRef(null)

  useEffect(() => {
    const el = ref.current
    if (!el) return
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setInView(true)
          observer.disconnect()
        }
      },
      { rootMargin: '300px' }
    )
    observer.observe(el)
    return () => observer.disconnect()
  }, [])

  return (
    <div
      ref={ref}
      onClick={onClick}
      className={`relative overflow-hidden ${onClick ? 'cursor-pointer' : ''} ${className}`}
    >
      {/* Shimmer placeholder */}
      {!loaded && <div className="absolute inset-0 shimmer" />}

      {inView && (
        <img
          src={src}
          alt={alt}
          loading="lazy"
          onLoad={() => setLoaded(true)}
          className={`w-full h-full object-cover transition-opacity duration-700 ${
            loaded ? 'opacity-100' : 'opacity-0'
          } ${imgClassName}`}
        />
      )}
    </div>
  )
}
