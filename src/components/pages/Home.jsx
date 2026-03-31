import { Link } from 'react-router-dom'
import galleryData from '../../data/gallery.json'
import RandomSpotlight from '../ui/RandomSpotlight'
import LazyImage from '../ui/LazyImage'

const { photographer, services, albums } = galleryData

const SERVICE_ICONS = {
  home:     <HomeIcon />,
  sparkles: <SparklesIcon />,
  heart:    <HeartIcon />,
  camera:   <CameraIcon />,
  user:     <UserIcon />,
}

export default function Home() {
  const recentAlbums = albums.slice(0, 3)

  return (
    <>
      {/* ── Hero ── */}
      <section className="relative h-screen min-h-[600px] flex items-center justify-center overflow-hidden">
        {/* Background */}
        <div className="absolute inset-0 bg-neutral-900">
          <img
            src={photographer.hero_image}
            alt="Hero"
            className="w-full h-full object-cover animate-ken-burns opacity-60"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-black/40 via-black/20 to-black/60" />
        </div>

        {/* Content */}
        <div className="relative z-10 text-center text-white px-4">
          <p className="animate-fade-in-up text-xs font-semibold uppercase tracking-[0.3em] text-gold-400 mb-5">
            Through my lens Photography
          </p>
          <h1 className="animate-fade-in-up animation-delay-200 font-serif text-5xl md:text-7xl lg:text-8xl font-bold leading-none mb-6">
            {photographer.name}
          </h1>
          <p className="animate-fade-in-up animation-delay-300 text-lg md:text-xl text-white/80 max-w-xl mx-auto mb-10 font-light leading-relaxed">
            {photographer.tagline}
          </p>
          <div className="animate-fade-in-up animation-delay-500 flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              to="/albums"
              className="px-8 py-3.5 bg-white text-neutral-900 text-sm font-semibold uppercase tracking-widest rounded-full hover:bg-neutral-100 transition-colors"
            >
              View All Albums
            </Link>
            <Link
              to="/contact"
              className="px-8 py-3.5 border border-white/50 text-white text-sm font-semibold uppercase tracking-widest rounded-full hover:bg-white/10 transition-colors"
            >
              Book a Session
            </Link>
          </div>
        </div>

        {/* Scroll indicator */}
        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 animate-fade-in animation-delay-700 flex flex-col items-center gap-2">
          <span className="text-white/40 text-xs uppercase tracking-widest">Scroll</span>
          <div className="w-px h-10 bg-gradient-to-b from-white/40 to-transparent" />
        </div>
      </section>

      {/* ── Spotlight ── */}
      <RandomSpotlight />

      {/* ── Services ── */}
      <section className="py-20 md:py-28 bg-neutral-50 dark:bg-neutral-950">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-14">
            <p className="text-xs font-semibold uppercase tracking-[0.2em] text-gold-500 mb-3">
              What I Do
            </p>
            <h2 className="font-serif text-3xl md:text-4xl text-neutral-900 dark:text-neutral-100">
              Services
            </h2>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {services.map((service, i) => (
              <div
                key={service.id}
                className="group p-8 bg-white dark:bg-neutral-900 rounded-2xl border border-neutral-100 dark:border-neutral-800 hover:border-gold-500/40 hover:shadow-lg transition-all duration-300"
                style={{ animationDelay: `${i * 0.1}s` }}
              >
                <div className="w-12 h-12 bg-gold-500/10 rounded-xl flex items-center justify-center mb-6 text-gold-500 group-hover:bg-gold-500/20 transition-colors">
                  {SERVICE_ICONS[service.icon]}
                </div>
                <h3 className="font-serif text-xl text-neutral-900 dark:text-neutral-100 mb-3">
                  {service.title}
                </h3>
                <p className="text-sm text-neutral-500 dark:text-neutral-400 leading-relaxed mb-4">
                  {service.description}
                </p>
                <p className="text-xs font-semibold text-gold-500">
                  {service.starting_price}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Recent Albums ── */}
      <section className="py-20 md:py-28 bg-white dark:bg-neutral-900">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-end justify-between mb-12">
            <div>
              <p className="text-xs font-semibold uppercase tracking-[0.2em] text-gold-500 mb-3">
                Recent Work
              </p>
              <h2 className="font-serif text-3xl md:text-4xl text-neutral-900 dark:text-neutral-100">
                Latest Albums
              </h2>
            </div>
            <Link
              to="/albums"
              className="hidden sm:flex items-center gap-2 text-sm font-medium text-neutral-500 dark:text-neutral-400 hover:text-gold-500 transition-colors"
            >
              View all <ArrowRightIcon />
            </Link>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {recentAlbums.map(album => (
              <Link key={album.id} to={`/albums/${album.id}`} className="group block">
                <div className="relative aspect-[4/3] rounded-xl overflow-hidden mb-4 bg-neutral-200 dark:bg-neutral-800">
                  <LazyImage
                    src={album.cover}
                    alt={album.name}
                    className="absolute inset-0"
                    imgClassName="group-hover:scale-105 transition-transform duration-700"
                  />
                  <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-colors duration-300" />
                </div>
                <div className="flex items-center justify-between">
                  <div>
                    <h3 className="font-serif text-xl text-neutral-900 dark:text-neutral-100 mb-1 group-hover:text-gold-500 transition-colors">
                      {album.name}
                    </h3>
                    <p className="text-xs text-neutral-500 dark:text-neutral-400">
                      {album.photos.length} photos · {album.year}
                    </p>
                  </div>
                  <ArrowRightIcon className="text-neutral-400 group-hover:text-gold-500 group-hover:translate-x-1 transition-all" />
                </div>
              </Link>
            ))}
          </div>

          <div className="mt-10 text-center sm:hidden">
            <Link
              to="/albums"
              className="inline-flex items-center gap-2 text-sm font-medium text-gold-500"
            >
              View all albums <ArrowRightIcon />
            </Link>
          </div>
        </div>
      </section>

      {/* ── CTA Banner ── */}
      <section className="relative py-24 overflow-hidden bg-neutral-900 dark:bg-black">
        <div className="absolute inset-0 opacity-20">
          <img
            src="https://picsum.photos/seed/cta-banner/1920/600"
            alt=""
            className="w-full h-full object-cover"
          />
        </div>
        <div className="relative z-10 max-w-3xl mx-auto text-center px-4">
          <p className="text-xs font-semibold uppercase tracking-[0.2em] text-gold-400 mb-4">
            Let's Create Together
          </p>
          <h2 className="font-serif text-3xl md:text-5xl text-white mb-6">
            "Photography is the story I fail to put into words."
          </h2>
          <p className="text-neutral-400 text-sm mb-10 italic">— Destin Sparks</p>
          <Link
            to="/contact"
            className="inline-flex items-center gap-2 px-10 py-4 bg-gold-500 text-white text-sm font-semibold uppercase tracking-widest rounded-full hover:bg-gold-600 transition-colors"
          >
            Start Your Story
          </Link>
        </div>
      </section>
    </>
  )
}

/* ── Icon components ── */
function HomeIcon() {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="1.5">
      <path d="M3 9.5L12 3l9 6.5V20a1 1 0 0 1-1 1H4a1 1 0 0 1-1-1V9.5z"/>
      <path d="M9 21V12h6v9"/>
    </svg>
  )
}
function SparklesIcon() {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="1.5">
      <path d="M12 3l1.5 4.5L18 9l-4.5 1.5L12 15l-1.5-4.5L6 9l4.5-1.5z"/>
      <path d="M5 3l.75 2.25L8 6l-2.25.75L5 9l-.75-2.25L2 6l2.25-.75z" strokeWidth="1"/>
    </svg>
  )
}
function HeartIcon() {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="1.5">
      <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"/>
    </svg>
  )
}
function CameraIcon() {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="1.5">
      <path d="M23 19a2 2 0 0 1-2 2H3a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h4l2-3h6l2 3h4a2 2 0 0 1 2 2z"/>
      <circle cx="12" cy="13" r="4"/>
    </svg>
  )
}
function UserIcon() {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="1.5">
      <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"/>
      <circle cx="12" cy="7" r="4"/>
    </svg>
  )
}
function ArrowRightIcon({ className = '' }) {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
      <line x1="5" y1="12" x2="19" y2="12"/>
      <polyline points="12 5 19 12 12 19"/>
    </svg>
  )
}
