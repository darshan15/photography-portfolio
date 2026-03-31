import { Link } from 'react-router-dom'
import galleryData from '../../data/gallery.json'
import LazyImage from '../ui/LazyImage'

const { photographer, services } = galleryData

const SERVICE_ICONS = {
  home:     <HomeIcon />,
  sparkles: <SparklesIcon />,
  heart:    <HeartIcon />,
  camera:   <CameraIcon />,
  user:     <UserIcon />,
}

export default function About() {
  const stats = [
    { value: `${photographer.years_experience}+`, label: 'Years of Experience' },
    { value: `${photographer.events_captured}+`,  label: 'Events Captured' },
    { value: `${photographer.happy_clients}+`,    label: 'Happy Clients' },
    { value: `${photographer.countries_traveled}`, label: 'Countries Traveled' },
  ]

  return (
    <>
      {/* Page header */}
      <div className="pt-32 pb-16 bg-white dark:bg-neutral-900 border-b border-neutral-100 dark:border-neutral-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <p className="text-xs font-semibold uppercase tracking-[0.2em] text-gold-500 mb-3">
            The Photographer
          </p>
          <h1 className="font-serif text-4xl md:text-6xl text-neutral-900 dark:text-neutral-100">
            About Me
          </h1>
        </div>
      </div>

      {/* Bio section */}
      <section className="py-20 md:py-28 bg-neutral-50 dark:bg-neutral-950">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">

            {/* Headshot */}
            <div className="relative">
              <div className="relative aspect-[3/4] rounded-2xl overflow-hidden bg-neutral-200 dark:bg-neutral-800 max-w-sm mx-auto lg:mx-0">
                <LazyImage
                  src={photographer.headshot}
                  alt={photographer.name}
                  className="absolute inset-0"
                />
              </div>
              {/* Decorative accent */}
              <div className="absolute -bottom-4 -right-4 w-48 h-48 border-2 border-gold-500/20 rounded-2xl -z-10 hidden lg:block" />
              <div className="absolute -top-4 -left-4 w-24 h-24 bg-gold-500/5 rounded-xl -z-10 hidden lg:block" />
            </div>

            {/* Bio text */}
            <div>
              <h2 className="font-serif text-3xl md:text-4xl text-neutral-900 dark:text-neutral-100 mb-6">
                {photographer.name}
              </h2>
              <div className="space-y-4 text-neutral-600 dark:text-neutral-400 text-sm leading-relaxed">
                {photographer.bio.split('\n\n').map((paragraph, i) => (
                  <p key={i}>{paragraph}</p>
                ))}
              </div>

              {/* Contact info */}
              <div className="mt-8 space-y-2 text-sm">
                {[
                  { icon: <MailIcon />,      text: photographer.email },
                  { icon: <PhoneIcon />,     text: photographer.phone },
                  { icon: <PinIcon />,       text: photographer.location },
                  { icon: <InstagramIcon />, text: photographer.instagram },
                  { icon: <FacebookIcon />,  text: photographer.facebook },
                ].map(({ icon, text }) => (
                  <div key={text} className="flex items-center gap-3 text-neutral-500 dark:text-neutral-400">
                    <span className="text-gold-500 shrink-0">{icon}</span>
                    <span>{text}</span>
                  </div>
                ))}
              </div>

              <div className="mt-8">
                <Link
                  to="/contact"
                  className="inline-flex items-center gap-2 px-8 py-3.5 bg-gold-500 text-white text-sm font-semibold uppercase tracking-widest rounded-full hover:bg-gold-600 transition-colors"
                >
                  Book a Session
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Stats */}
      <section className="py-16 bg-neutral-900 dark:bg-black">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-8 text-center">
            {stats.map(({ value, label }) => (
              <div key={label}>
                <div className="font-serif text-4xl md:text-5xl font-bold text-white mb-2">
                  {value}
                </div>
                <p className="text-xs text-neutral-500 uppercase tracking-widest">{label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Services detail */}
      <section className="py-20 md:py-28 bg-white dark:bg-neutral-900">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-14">
            <p className="text-xs font-semibold uppercase tracking-[0.2em] text-gold-500 mb-3">
              Specialisations
            </p>
            <h2 className="font-serif text-3xl md:text-4xl text-neutral-900 dark:text-neutral-100">
              Services Offered
            </h2>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            {services.map(service => (
              <div
                key={service.id}
                className="flex gap-6 p-8 bg-neutral-50 dark:bg-neutral-800/50 rounded-2xl border border-neutral-100 dark:border-neutral-800 hover:border-gold-500/30 transition-colors"
              >
                <div className="w-12 h-12 bg-gold-500/10 text-gold-500 rounded-xl flex items-center justify-center shrink-0">
                  {SERVICE_ICONS[service.icon]}
                </div>
                <div>
                  <div className="flex items-center justify-between gap-4 mb-2">
                    <h3 className="font-serif text-xl text-neutral-900 dark:text-neutral-100">
                      {service.title}
                    </h3>
                    <span className="text-xs font-semibold text-gold-500 whitespace-nowrap">
                      {service.starting_price}
                    </span>
                  </div>
                  <p className="text-sm text-neutral-500 dark:text-neutral-400 leading-relaxed">
                    {service.description}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Equipment */}
      <section className="py-16 bg-neutral-50 dark:bg-neutral-950">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-10">
            <p className="text-xs font-semibold uppercase tracking-[0.2em] text-gold-500 mb-3">
              The Craft
            </p>
            <h2 className="font-serif text-3xl text-neutral-900 dark:text-neutral-100">
              Equipment
            </h2>
          </div>
          <div className="flex flex-wrap justify-center gap-3">
            {photographer.equipment.map(item => (
              <span
                key={item}
                className="px-5 py-2.5 bg-white dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-800 rounded-full text-sm text-neutral-700 dark:text-neutral-300"
              >
                {item}
              </span>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-20 bg-white dark:bg-neutral-900 text-center">
        <div className="max-w-xl mx-auto px-4">
          <h2 className="font-serif text-3xl md:text-4xl text-neutral-900 dark:text-neutral-100 mb-5">
            Ready to create something beautiful?
          </h2>
          <p className="text-neutral-500 dark:text-neutral-400 text-sm mb-8">
            Reach out to discuss your vision. Every story starts with a conversation.
          </p>
          <Link
            to="/contact"
            className="inline-flex items-center gap-2 px-10 py-4 bg-neutral-900 dark:bg-white text-white dark:text-neutral-900 text-sm font-semibold uppercase tracking-widest rounded-full hover:opacity-90 transition-opacity"
          >
            Get in Touch
          </Link>
        </div>
      </section>
    </>
  )
}

/* ── Icons ── */
function HomeIcon() {
  return <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="1.5"><path d="M3 9.5L12 3l9 6.5V20a1 1 0 0 1-1 1H4a1 1 0 0 1-1-1V9.5z"/><path d="M9 21V12h6v9"/></svg>
}
function SparklesIcon() {
  return <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="1.5"><path d="M12 3l1.5 4.5L18 9l-4.5 1.5L12 15l-1.5-4.5L6 9l4.5-1.5z"/></svg>
}
function HeartIcon() {
  return <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="1.5"><path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"/></svg>
}
function CameraIcon() {
  return <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="1.5"><path d="M23 19a2 2 0 0 1-2 2H3a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h4l2-3h6l2 3h4a2 2 0 0 1 2 2z"/><circle cx="12" cy="13" r="4"/></svg>
}
function UserIcon() {
  return <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="1.5"><path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"/><circle cx="12" cy="7" r="4"/></svg>
}
function MailIcon() {
  return <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="1.5"><rect x="2" y="4" width="20" height="16" rx="2"/><path d="M2 7l10 7 10-7"/></svg>
}
function PhoneIcon() {
  return <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="1.5"><path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07A19.5 19.5 0 0 1 4.15 12a19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 3.05 1.37h3a2 2 0 0 1 2 1.72c.127.96.361 1.903.7 2.81a2 2 0 0 1-.45 2.11L7.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0 1 22 16.92z"/></svg>
}
function PinIcon() {
  return <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="1.5"><path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"/><circle cx="12" cy="10" r="3"/></svg>
}
function InstagramIcon() {
  return <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="1.5"><rect x="2" y="2" width="20" height="20" rx="5"/><circle cx="12" cy="12" r="4"/><circle cx="17.5" cy="6.5" r="0.5" fill="currentColor"/></svg>
}
function FacebookIcon() {
  return <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="1.5"><path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"/></svg>
}
function TwitterIcon() {
  return <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="1.5"><path d="M22 4s-.7 2.1-2 3.4c1.6 10-9.4 17.3-18 11.6 2.2.1 4.4-.6 6-2C3 15.5.5 9.6 3 5c2.2 2.6 5.6 4.1 9 4-.9-4.2 4-6.6 7-3.8 1.1 0 3-1.2 3-1.2z"/></svg>
}
function LinkedInIcon() {
  return <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="1.5"><path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"/><rect x="2" y="9" width="4" height="12"/><circle cx="4" cy="4" r="2"/></svg>
}
