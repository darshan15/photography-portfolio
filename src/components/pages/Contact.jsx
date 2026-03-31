import { useState } from 'react'
import galleryData from '../../data/gallery.json'

const { photographer } = galleryData

const EVENT_TYPES = [
  'Wedding', 'Portrait Session', 'Corporate Event',
  'Birthday / Celebration', 'Fashion / Editorial', 'Other',
]

const INITIAL = {
  name: '', email: '', phone: '', event_type: '',
  event_date: '', message: '',
}

export default function Contact() {
  const [form, setForm]       = useState(INITIAL)
  const [errors, setErrors]   = useState({})
  const [submitted, setSubmitted] = useState(false)
  const [loading, setLoading] = useState(false)

  const set = (field) => (e) =>
    setForm(f => ({ ...f, [field]: e.target.value }))

  function validate() {
    const e = {}
    if (!form.name.trim())    e.name    = 'Name is required.'
    if (!form.email.trim())   e.email   = 'Email is required.'
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email))
                              e.email   = 'Enter a valid email address.'
    if (!form.event_type)     e.event_type = 'Please select an event type.'
    if (!form.message.trim()) e.message = 'Please include a message.'
    return e
  }

  async function handleSubmit(e) {
    e.preventDefault()
    const errs = validate()
    if (Object.keys(errs).length) { setErrors(errs); return }
    setErrors({})
    setLoading(true)

    try {
      const res = await fetch(`https://formspree.io/f/${import.meta.env.VITE_FORMSPREE_ID}`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
        body: JSON.stringify({
          name:        form.name,
          email:       form.email,
          phone:       form.phone || '—',
          event_type:  form.event_type,
          event_date:  form.event_date || '—',
          message:     form.message,
          _subject:    `New Photography Inquiry from ${form.name}`,
          _replyto:    form.email,
        }),
      })

      if (res.ok) {
        setSubmitted(true)
        setForm(INITIAL)
      } else {
        const data = await res.json().catch(() => ({}))
        throw new Error(data?.error || 'Submission failed')
      }
    } catch (err) {
      setErrors({ submit: err.message || 'Something went wrong. Please email directly.' })
    } finally {
      setLoading(false)
    }
  }

  return (
    <>
      {/* Page header */}
      <div className="pt-32 pb-16 bg-white dark:bg-neutral-900 border-b border-neutral-100 dark:border-neutral-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <p className="text-xs font-semibold uppercase tracking-[0.2em] text-gold-500 mb-3">
            Let's Talk
          </p>
          <h1 className="font-serif text-4xl md:text-5xl text-neutral-900 dark:text-neutral-100 mb-4">
            Contact & Booking
          </h1>
          <p className="text-neutral-500 dark:text-neutral-400 max-w-lg text-sm leading-relaxed">
            Ready to start your story? Fill in the form below or reach out directly — I respond within 24 hours.
          </p>
        </div>
      </div>

      <div className="py-20 bg-neutral-50 dark:bg-neutral-950">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-5 gap-16">

            {/* Contact info */}
            <div className="lg:col-span-2 space-y-10">
              <div>
                <h2 className="font-serif text-2xl text-neutral-900 dark:text-neutral-100 mb-6">
                  Get in touch
                </h2>
                <div className="space-y-5">
                  {[
                    { icon: <MailIcon />,  label: 'Email',     value: photographer.email },
                    { icon: <PhoneIcon />, label: 'Phone',     value: photographer.phone },
                    { icon: <PinIcon />,   label: 'Based In',  value: photographer.location },
                    { icon: <IgIcon />,    label: 'Instagram', value: photographer.instagram },
                  ].map(({ icon, label, value }) => (
                    <div key={label} className="flex items-start gap-4">
                      <div className="w-10 h-10 bg-gold-500/10 text-gold-500 rounded-lg flex items-center justify-center shrink-0 mt-0.5">
                        {icon}
                      </div>
                      <div>
                        <p className="text-xs font-semibold uppercase tracking-widest text-neutral-400 dark:text-neutral-500 mb-0.5">{label}</p>
                        <p className="text-sm text-neutral-700 dark:text-neutral-300">{value}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Availability note */}
              <div className="p-6 bg-gold-500/5 border border-gold-500/20 rounded-2xl">
                <p className="text-xs font-semibold uppercase tracking-widest text-gold-500 mb-2">Availability</p>
                <p className="text-sm text-neutral-600 dark:text-neutral-400 leading-relaxed">
                  Currently accepting bookings for events from{' '}
                  <strong className="text-neutral-800 dark:text-neutral-200">Spring </strong> onwards.
                  Corporate and portrait sessions available year-round.
                </p>
              </div>
            </div>

            {/* Form */}
            <div className="lg:col-span-3">
              {submitted ? (
                <SuccessMessage onReset={() => { setForm(INITIAL); setSubmitted(false) }} />
              ) : (
                <form
                  onSubmit={handleSubmit}
                  noValidate
                  className="bg-white dark:bg-neutral-900 rounded-2xl p-8 md:p-10 border border-neutral-100 dark:border-neutral-800 shadow-sm"
                >
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                    <Field
                      label="Full Name *"
                      error={errors.name}
                    >
                      <input
                        type="text"
                        value={form.name}
                        onChange={set('name')}
                        placeholder="Jane Smith"
                        className={inputClass(errors.name)}
                      />
                    </Field>

                    <Field label="Email Address *" error={errors.email}>
                      <input
                        type="email"
                        value={form.email}
                        onChange={set('email')}
                        placeholder="jane@example.com"
                        className={inputClass(errors.email)}
                      />
                    </Field>

                    <Field label="Phone Number">
                      <input
                        type="tel"
                        value={form.phone}
                        onChange={set('phone')}
                        placeholder="+1 (212) 555-0000"
                        className={inputClass()}
                      />
                    </Field>

                    <Field label="Event Date">
                      <input
                        type="date"
                        value={form.event_date}
                        onChange={set('event_date')}
                        className={inputClass()}
                      />
                    </Field>

                    <div className="sm:col-span-2">
                      <Field label="Type of Event *" error={errors.event_type}>
                        <select
                          value={form.event_type}
                          onChange={set('event_type')}
                          className={inputClass(errors.event_type)}
                        >
                          <option value="">Select an event type…</option>
                          {EVENT_TYPES.map(t => (
                            <option key={t} value={t}>{t}</option>
                          ))}
                        </select>
                      </Field>
                    </div>

                    <div className="sm:col-span-2">
                      <Field label="Message *" error={errors.message}>
                        <textarea
                          rows={5}
                          value={form.message}
                          onChange={set('message')}
                          placeholder="Tell me about your vision, venue, expected guest count, or any other details…"
                          className={`${inputClass(errors.message)} resize-none`}
                        />
                      </Field>
                    </div>
                  </div>

                  {errors.submit && (
                    <p className="mt-4 p-3 rounded-xl bg-red-50 dark:bg-red-900/20 text-red-600 dark:text-red-400 text-sm text-center">
                      {errors.submit}
                    </p>
                  )}

                  <button
                    type="submit"
                    disabled={loading}
                    className="mt-6 w-full py-4 bg-gold-500 hover:bg-gold-600 text-white text-sm font-semibold uppercase tracking-widest rounded-full transition-colors disabled:opacity-60 disabled:cursor-not-allowed flex items-center justify-center gap-2"
                  >
                    {loading ? (
                      <>
                        <SpinnerIcon />
                        Sending…
                      </>
                    ) : (
                      'Send Inquiry'
                    )}
                  </button>

                  <p className="mt-4 text-center text-xs text-neutral-400 dark:text-neutral-500">
                    I'll respond within 24 hours. No spam, ever.
                  </p>
                </form>
              )}
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

function Field({ label, error, children }) {
  return (
    <div>
      <label className="block text-xs font-semibold uppercase tracking-widest text-neutral-500 dark:text-neutral-400 mb-2">
        {label}
      </label>
      {children}
      {error && <p className="mt-1.5 text-xs text-red-500">{error}</p>}
    </div>
  )
}

function inputClass(hasError = false) {
  return [
    'w-full px-4 py-3 text-sm rounded-xl border outline-none transition-colors',
    'bg-neutral-50 dark:bg-neutral-800',
    'text-neutral-900 dark:text-neutral-100',
    'placeholder:text-neutral-400 dark:placeholder:text-neutral-500',
    hasError
      ? 'border-red-400 focus:border-red-400 focus:ring-2 focus:ring-red-400/20'
      : 'border-neutral-200 dark:border-neutral-700 focus:border-gold-500 focus:ring-2 focus:ring-gold-500/20',
  ].join(' ')
}

function SuccessMessage({ onReset }) {
  return (
    <div className="bg-white dark:bg-neutral-900 rounded-2xl p-10 border border-neutral-100 dark:border-neutral-800 shadow-sm text-center flex flex-col items-center gap-6">
      <div className="w-16 h-16 bg-green-100 dark:bg-green-900/30 text-green-600 dark:text-green-400 rounded-full flex items-center justify-center">
        <CheckIcon />
      </div>
      <div>
        <h3 className="font-serif text-2xl text-neutral-900 dark:text-neutral-100 mb-3">
          Message Received!
        </h3>
        <p className="text-sm text-neutral-500 dark:text-neutral-400 leading-relaxed max-w-sm mx-auto">
          Thank you for reaching out. I'll review your inquiry and get back to you within 24 hours.
        </p>
      </div>
      <button
        onClick={onReset}
        className="px-6 py-2.5 text-sm font-medium text-gold-500 border border-gold-500/30 rounded-full hover:bg-gold-500/5 transition-colors"
      >
        Send another inquiry
      </button>
    </div>
  )
}

/* ── Icons ── */
function MailIcon() {
  return <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="1.5"><rect x="2" y="4" width="20" height="16" rx="2"/><path d="M2 7l10 7 10-7"/></svg>
}
function PhoneIcon() {
  return <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="1.5"><path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07A19.5 19.5 0 0 1 4.15 12a19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 3.05 1.37h3a2 2 0 0 1 2 1.72c.127.96.361 1.903.7 2.81a2 2 0 0 1-.45 2.11L7.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0 1 22 16.92z"/></svg>
}
function PinIcon() {
  return <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="1.5"><path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"/><circle cx="12" cy="10" r="3"/></svg>
}
function IgIcon() {
  return <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="1.5"><rect x="2" y="2" width="20" height="20" rx="5"/><circle cx="12" cy="12" r="4"/><circle cx="17.5" cy="6.5" r="0.5" fill="currentColor"/></svg>
}
function CheckIcon() {
  return <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="20 6 9 17 4 12"/></svg>
}
function SpinnerIcon() {
  return (
    <svg className="animate-spin" xmlns="http://www.w3.org/2000/svg" width="18" height="18" fill="none" viewBox="0 0 24 24">
      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"/>
      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z"/>
    </svg>
  )
}
