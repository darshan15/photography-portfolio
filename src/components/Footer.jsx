import { Link } from 'react-router-dom'
import galleryData from '../data/gallery.json'

export default function Footer() {
  const { name, email, instagram, location } = galleryData.photographer

  return (
    <footer className="bg-neutral-900 dark:bg-black text-neutral-400">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12 mb-12">

          {/* Brand */}
          <div>
            <h3 className="font-serif text-2xl text-white mb-3">{name}</h3>
            <p className="text-sm leading-relaxed text-neutral-500 mb-6">
              Professional photography services across Texas and worldwide. Every moment deserves to be remembered beautifully.
            </p>
            <a
              href={`mailto:${email}`}
              className="text-sm text-gold-500 hover:text-gold-400 transition-colors"
            >
              {email}
            </a>
          </div>

          {/* Navigation */}
          <div>
            <h4 className="text-xs font-semibold uppercase tracking-widest text-neutral-500 mb-5">
              Navigate
            </h4>
            <nav className="flex flex-col gap-3">
              {[
                { to: '/',        label: 'Home' },
                { to: '/albums',  label: 'Albums' },
                { to: '/about',   label: 'About' },
                { to: '/contact', label: 'Contact' },
              ].map(({ to, label }) => (
                <Link
                  key={to}
                  to={to}
                  className="text-sm hover:text-white transition-colors"
                >
                  {label}
                </Link>
              ))}
            </nav>
          </div>

          {/* Info */}
          <div>
            <h4 className="text-xs font-semibold uppercase tracking-widest text-neutral-500 mb-5">
              Info
            </h4>
            <div className="flex flex-col gap-3 text-sm">
              <span>{location}</span>
              <span>{instagram}</span>
              <Link
                to="/contact"
                className="inline-flex items-center gap-2 mt-2 px-5 py-2.5 bg-gold-500 text-white text-xs font-semibold uppercase tracking-widest rounded-full hover:bg-gold-600 transition-colors w-fit"
              >
                Book a Session
              </Link>
            </div>
          </div>
        </div>

        <div className="pt-8 border-t border-neutral-800 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-neutral-600">
          <span>© {new Date().getFullYear()} {name}. All rights reserved.</span>
          <span>Crafted with care in Austin</span>
        </div>
      </div>
    </footer>
  )
}
