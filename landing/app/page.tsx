'use client'

import Image from 'next/image'
import { useState, useEffect } from 'react'

const WHATSAPP_URL = 'https://chat.whatsapp.com/GeRHFNc15sY7ePWPxD03gk?mode=gi_t'

type FormData = {
  name: string
  contact: string
  email: string
  role: string
  ai_knowledge: string
  pain_points: string
  heard_from: string
}

const initialForm: FormData = {
  name: '',
  contact: '',
  email: '',
  role: '',
  ai_knowledge: '',
  pain_points: '',
  heard_from: '',
}

export default function Home() {
  const [modalOpen, setModalOpen] = useState(false)
  const [form, setForm] = useState<FormData>(initialForm)
  const [errors, setErrors] = useState<Partial<FormData>>({})
  const [loading, setLoading] = useState(false)
  const [submitted, setSubmitted] = useState(false)
  const [countdown, setCountdown] = useState(10)

  useEffect(() => {
    if (!submitted) return
    if (countdown === 0) {
      window.location.href = WHATSAPP_URL
      return
    }
    const t = setTimeout(() => setCountdown(c => c - 1), 1000)
    return () => clearTimeout(t)
  }, [submitted, countdown])

  // Lock body scroll when modal is open
  useEffect(() => {
    document.body.style.overflow = modalOpen ? 'hidden' : ''
    return () => { document.body.style.overflow = '' }
  }, [modalOpen])

  function openModal() {
    setForm(initialForm)
    setErrors({})
    setSubmitted(false)
    setCountdown(10)
    setModalOpen(true)
  }

  function closeModal() {
    setModalOpen(false)
  }

  function validate(): boolean {
    const e: Partial<FormData> = {}
    if (!form.name.trim()) e.name = 'Name is required'
    if (!form.contact.trim()) e.contact = 'Contact number is required'
    else if (!/^[0-9+\s\-()]{7,15}$/.test(form.contact.trim()))
      e.contact = 'Enter a valid contact number'
    if (!form.email.trim()) e.email = 'Email is required'
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email.trim()))
      e.email = 'Enter a valid email address'
    if (!form.role) e.role = 'Please select an option'
    if (!form.ai_knowledge) e.ai_knowledge = 'Please rate your knowledge'
    if (!form.pain_points.trim()) e.pain_points = 'This field is required'
    if (!form.heard_from.trim()) e.heard_from = 'This field is required'
    setErrors(e)
    return Object.keys(e).length === 0
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    if (!validate()) return
    setLoading(true)
    try {
      const res = await fetch('/api/register', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name: form.name.trim(),
          contact: form.contact.trim(),
          email: form.email.trim(),
          role: form.role,
          ai_knowledge: form.ai_knowledge,
          pain_points: form.pain_points.trim(),
          heard_from: form.heard_from.trim(),
        }),
      })
      if (!res.ok) {
        const data = await res.json().catch(() => ({}))
        throw new Error(data.error || 'Registration failed')
      }
      setSubmitted(true)
    } catch (err) {
      console.error(err)
      alert('Something went wrong. Please try again.')
    } finally {
      setLoading(false)
    }
  }

  function handleChange(
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>
  ) {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }))
    setErrors((prev) => ({ ...prev, [e.target.name]: undefined }))
  }

  return (
    <>
      {/* ── Landing Page ── */}
      <main className="min-h-screen bg-gradient-to-br from-[#06061a] via-[#0a0f3a] to-[#080820] text-white">

        {/* Header */}
        <header className="flex justify-center items-center gap-4 py-4 px-6 border-b border-white/10 bg-black/40 backdrop-blur-md">
          <Image
            src="/aimer-businessschool.png"
            alt="AIMER Business School"
            width={120}
            height={36}
            className="object-contain brightness-0 invert"
          />
          <span className="text-white/40 font-light text-2xl">×</span>
          <Image
            src="/haca-techschool.png"
            alt="HACA Tech School"
            width={120}
            height={36}
            className="object-contain"
          />
        </header>

        {/* Hero — centered */}
        <section className="max-w-5xl mx-auto px-5 pt-10 pb-8 text-center">
          <span className="text-blue-400 text-xs font-bold tracking-widest uppercase mb-3 block">
            Still Confused About
          </span>
          <h1 className="text-4xl sm:text-5xl lg:text-7xl font-black uppercase leading-none mb-1">
            AI for Business
          </h1>
          <h2 className="text-4xl sm:text-5xl lg:text-7xl font-black uppercase text-[#00d084] leading-none mb-5">
            Growth?
          </h2>

          <p className="text-blue-200 italic text-sm sm:text-base mb-4">Exclusive Interactive Session</p>

          {/* Topic pill */}
          <div className="inline-flex items-center gap-2 bg-white/5 border border-[#00d084]/40 rounded-xl px-4 py-2.5 mb-4">
            <span className="bg-[#00d084] text-white text-[10px] font-black px-2 py-0.5 rounded-full uppercase tracking-wider shrink-0">
              Topic
            </span>
            <span className="text-[#00d084] font-semibold text-sm sm:text-base">
              Applied AI in Sales & Marketing
            </span>
          </div>

          <p className="text-blue-300/80 italic text-sm mb-6">Let&apos;s Talk It Out</p>

          {/* Date + Platform + CTA */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-3 mb-8">
            <div className="bg-white/8 border border-white/15 rounded-2xl px-6 py-3 text-center sm:text-left w-full sm:w-auto">
              <p className="text-base font-black leading-tight">29 April 2026</p>
              <p className="text-blue-300 text-sm">7:00 PM – 9:00 PM</p>
            </div>
            <div className="bg-white rounded-2xl px-5 py-3 flex items-center gap-2 shadow-lg w-full sm:w-auto justify-center">
              <Image src="/google-meet.png" alt="Google Meet" width={26} height={26} />
              <span className="font-bold text-gray-800 text-sm">Google Meet</span>
            </div>
            <button
              onClick={openModal}
              className="w-full sm:w-auto bg-[#00d084] hover:bg-[#00bb74] text-white font-black text-base py-3 px-8 rounded-full uppercase tracking-wider transition-all duration-200 shadow-2xl shadow-[#00d084]/40 hover:scale-105 active:scale-95"
            >
              Register Now — Free
            </button>
          </div>
        </section>

        {/* Speakers — single row, locked equal height */}
        <section className="max-w-6xl mx-auto px-4 pb-12">
          <div className="flex items-center gap-3 justify-center mb-8">
            <div className="h-px flex-1 max-w-[80px] bg-gradient-to-r from-transparent to-[#00d084]/40" />
            <p className="text-xs font-bold tracking-[0.25em] uppercase text-blue-400/70">
              Meet the Speakers
            </p>
            <div className="h-px flex-1 max-w-[80px] bg-gradient-to-l from-transparent to-[#00d084]/40" />
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-4">
            {[
              { img: '/ashar.png',  name: 'Ashar Ameen',    role: 'Business Head',    org: 'HACA Tech School',      scale: 1.25 },
              { img: '/rizwan.png', name: 'Rizwan',          role: 'Co-Founder & CEO', org: 'HACA',                  scale: 1.0  },
              { img: '/aseem.png',  name: 'Aseem Panoli',    role: 'CEO',              org: 'Aimer Business School', scale: 1.1  },
              { img: '/nazil.png',  name: 'Muhammed Nazil',  role: 'Tech Researcher',  org: '& Mentor',              scale: 2.2  },
            ].map((s) => (
              <div key={s.name} className="group flex flex-col items-center">

                {/* Photo box */}
                <div className="relative w-full overflow-hidden h-52 sm:h-80">
                  <div className="absolute inset-x-0 bottom-0 h-1/2" style={{background: 'radial-gradient(ellipse 60% 40% at 50% 100%, rgba(0,208,132,0.08), transparent)'}} />

                  <Image
                    src={s.img}
                    alt={s.name}
                    fill
                    sizes="(max-width: 640px) 50vw, 25vw"
                    className="object-contain object-bottom transition-transform duration-500"
                    style={{
                      transform: `scale(${s.scale})`,
                      transformOrigin: s.img === '/nazil.png' ? '50% 40%' : s.img === '/ashar.png' ? '50% 20%' : 'bottom center'
                    }}
                  />

                  <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-2/3 h-4 bg-[#00d084]/20 blur-xl rounded-full" />
                </div>

                {/* Info card */}
                <div className="w-full text-center px-2 pt-3 pb-3 border-t border-white/8">
                  <p className="font-black text-white text-xs sm:text-sm tracking-wide leading-tight">{s.name}</p>
                  <p className="text-[#00d084] text-xs font-bold mt-1">{s.role}</p>
                  <p className="text-blue-300/45 text-[10px] sm:text-[11px] mt-0.5">{s.org}</p>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Footer */}
        <footer className="border-t border-white/10 text-center py-4 text-white/30 text-xs">
          © 2026 AIMER Business School × HACA Tech School. All rights reserved.
        </footer>
      </main>

      {/* ── Modal ── */}
      {modalOpen && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center p-4"
          onClick={(e) => { if (e.target === e.currentTarget) closeModal() }}
        >
          {/* Backdrop */}
          <div className="absolute inset-0 bg-black/80 backdrop-blur-sm" />

          {/* Modal card */}
          <div
            className="relative w-full max-w-md rounded-2xl overflow-hidden shadow-2xl max-h-[94vh] flex flex-col"
            style={{ background: 'linear-gradient(160deg, #0e1535 0%, #0a0f2e 100%)', border: '1px solid rgba(255,255,255,0.08)' }}
          >
            {submitted ? (
              /* ── Success ── */
              <div className="p-10 text-center text-white">
                <div className="relative w-20 h-20 mx-auto mb-6">
                  <div className="absolute inset-0 bg-[#00d084]/20 rounded-full animate-ping" />
                  <div className="relative w-20 h-20 bg-gradient-to-br from-[#00d084] to-[#00a86b] rounded-full flex items-center justify-center shadow-xl shadow-[#00d084]/40">
                    <svg className="w-10 h-10 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M5 13l4 4L19 7" />
                    </svg>
                  </div>
                </div>
                <h2 className="text-2xl font-black mb-2">You&apos;re In!</h2>
                <p className="text-[#00d084] font-semibold mb-1">Registration Successful</p>
                <p className="text-blue-200/60 text-sm mb-2">
                  Join our WhatsApp community to receive the Google Meet link and updates.
                </p>
                <p className="text-white/30 text-xs mb-6">
                  Redirecting automatically in <span className="text-[#00d084] font-bold">{countdown}s</span>…
                </p>
                <a
                  href={WHATSAPP_URL}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-3 bg-[#25D366] hover:bg-[#1ebe5d] text-white font-bold py-3.5 px-7 rounded-xl text-sm transition-all duration-200 shadow-lg shadow-[#25D366]/30 hover:scale-105"
                >
                  <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
                  </svg>
                  Join WhatsApp Community
                </a>
              </div>
            ) : (
              <>
                {/* ── Header ── */}
                <div className="relative px-7 pt-6 pb-5 shrink-0" style={{ borderBottom: '1px solid rgba(255,255,255,0.07)' }}>
                  <button
                    onClick={closeModal}
                    className="absolute top-4 right-4 w-8 h-8 flex items-center justify-center rounded-full text-white/40 hover:text-white hover:bg-white/10 transition-colors"
                  >
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                    </svg>
                  </button>

                  <div className="flex items-center gap-2 mb-3">
                    <span className="w-1.5 h-1.5 rounded-full bg-[#00d084]" />
                    <span className="text-[#00d084] text-xs font-bold tracking-widest uppercase">Free Session</span>
                    <span className="text-white/20 mx-1">·</span>
                    <span className="text-white/40 text-xs">29 April 2026 · Google Meet</span>
                  </div>
                  <h3 className="text-2xl font-black text-white">Reserve Your Seat</h3>
                  <p className="text-white/40 text-sm mt-1">Applied AI in Sales &amp; Marketing</p>
                </div>

                {/* ── Form body ── */}
                <div className="overflow-y-auto flex-1">
                  <form onSubmit={handleSubmit} className="px-7 py-6 space-y-5">

                    {/* Name + Contact row */}
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <label className="block text-xs font-semibold text-white/50 mb-1.5">
                          Name <span className="text-[#00d084]">*</span>
                        </label>
                        <input
                          type="text"
                          name="name"
                          value={form.name}
                          onChange={handleChange}
                          placeholder="Enter your name"
                          className={`w-full rounded-xl px-3.5 py-2.5 text-white text-sm placeholder-white/20 focus:outline-none transition-all ${errors.name ? 'border border-red-400/60' : 'border border-white/10 focus:border-[#00d084]/60'}`}
                          style={{ background: 'rgba(255,255,255,0.04)' }}
                        />
                        {errors.name && <p className="text-red-400 text-xs mt-1">{errors.name}</p>}
                      </div>
                      <div>
                        <label className="block text-xs font-semibold text-white/50 mb-1.5">
                          Contact Number <span className="text-[#00d084]">*</span>
                        </label>
                        <input
                          type="tel"
                          name="contact"
                          value={form.contact}
                          onChange={handleChange}
                          placeholder="Enter your contact number"
                          className={`w-full rounded-xl px-3.5 py-2.5 text-white text-sm placeholder-white/20 focus:outline-none transition-all ${errors.contact ? 'border border-red-400/60' : 'border border-white/10 focus:border-[#00d084]/60'}`}
                          style={{ background: 'rgba(255,255,255,0.04)' }}
                        />
                        {errors.contact && <p className="text-red-400 text-xs mt-1">{errors.contact}</p>}
                      </div>
                    </div>

                    {/* Email */}
                    <div>
                      <label className="block text-xs font-semibold text-white/50 mb-1.5">
                        Email Id <span className="text-[#00d084]">*</span>
                      </label>
                      <input
                        type="email"
                        name="email"
                        value={form.email}
                        onChange={handleChange}
                        placeholder="Enter your email id"
                        className={`w-full rounded-xl px-3.5 py-2.5 text-white text-sm placeholder-white/20 focus:outline-none transition-all ${errors.email ? 'border border-red-400/60' : 'border border-white/10 focus:border-[#00d084]/60'}`}
                        style={{ background: 'rgba(255,255,255,0.04)' }}
                      />
                      {errors.email && <p className="text-red-400 text-xs mt-1">{errors.email}</p>}
                    </div>

                    {/* Role */}
                    <div>
                      <label className="block text-xs font-semibold text-white/50 mb-2">
                        Which among this suits you better <span className="text-[#00d084]">*</span>
                      </label>
                      <div className="flex gap-2">
                        {[
                          { value: 'marketing person', label: 'Marketing Person' },
                          { value: 'sales person',     label: 'Sales Person'     },
                          { value: 'founder',           label: 'Founder'          },
                        ].map(({ value, label }) => (
                          <button
                            key={value}
                            type="button"
                            onClick={() => { setForm(p => ({ ...p, role: value })); setErrors(p => ({ ...p, role: undefined })) }}
                            className={`flex-1 py-2.5 text-xs font-bold rounded-xl border transition-all duration-150 ${
                              form.role === value
                                ? 'border-[#00d084] text-[#00d084]'
                                : 'border-white/10 text-white/45 hover:border-white/25 hover:text-white/70'
                            }`}
                            style={{ background: form.role === value ? 'rgba(0,208,132,0.10)' : 'rgba(255,255,255,0.03)' }}
                          >
                            {label}
                          </button>
                        ))}
                      </div>
                      {errors.role && <p className="text-red-400 text-xs mt-1">{errors.role}</p>}
                    </div>

                    {/* AI Knowledge Rating */}
                    <div>
                      <label className="block text-xs font-semibold text-white/50 mb-2">
                        Rate your knowledge about AI <span className="text-[#00d084]">*</span>
                      </label>
                      <div className="flex gap-2">
                        {['1', '2', '3', '4', '5'].map((n) => (
                          <button
                            key={n}
                            type="button"
                            onClick={() => { setForm(p => ({ ...p, ai_knowledge: n })); setErrors(p => ({ ...p, ai_knowledge: undefined })) }}
                            className={`flex-1 py-2.5 text-sm font-bold rounded-xl border transition-all duration-150 ${
                              form.ai_knowledge === n
                                ? 'border-[#00d084] text-[#00d084]'
                                : 'border-white/10 text-white/45 hover:border-white/25 hover:text-white/70'
                            }`}
                            style={{ background: form.ai_knowledge === n ? 'rgba(0,208,132,0.10)' : 'rgba(255,255,255,0.03)' }}
                          >
                            {n}
                          </button>
                        ))}
                      </div>
                      <div className="flex justify-between mt-1 px-1">
                        <span className="text-white/25 text-[10px]">Beginner</span>
                        <span className="text-white/25 text-[10px]">Expert</span>
                      </div>
                      {errors.ai_knowledge && <p className="text-red-400 text-xs mt-1">{errors.ai_knowledge}</p>}
                    </div>

                    {/* Pain points */}
                    <div>
                      <label className="block text-xs font-semibold text-white/50 mb-1.5">
                        Your major pain points &amp; Expectations <span className="text-[#00d084]">*</span>
                      </label>
                      <textarea
                        name="pain_points"
                        value={form.pain_points}
                        onChange={handleChange}
                        rows={3}
                        placeholder="Enter your major pain points & expectations"
                        className={`w-full rounded-xl px-3.5 py-2.5 text-white text-sm placeholder-white/20 focus:outline-none transition-all resize-none ${errors.pain_points ? 'border border-red-400/60' : 'border border-white/10 focus:border-[#00d084]/60'}`}
                        style={{ background: 'rgba(255,255,255,0.04)' }}
                      />
                      {errors.pain_points && <p className="text-red-400 text-xs mt-1">{errors.pain_points}</p>}
                    </div>

                    {/* Heard from */}
                    <div>
                      <label className="block text-xs font-semibold text-white/50 mb-1.5">
                        From where did you hear about this event? <span className="text-[#00d084]">*</span>
                      </label>
                      <input
                        type="text"
                        name="heard_from"
                        value={form.heard_from}
                        onChange={handleChange}
                        placeholder="e.g. WhatsApp, Instagram, Friend…"
                        className={`w-full rounded-xl px-3.5 py-2.5 text-white text-sm placeholder-white/20 focus:outline-none transition-all ${errors.heard_from ? 'border border-red-400/60' : 'border border-white/10 focus:border-[#00d084]/60'}`}
                        style={{ background: 'rgba(255,255,255,0.04)' }}
                      />
                      {errors.heard_from && <p className="text-red-400 text-xs mt-1">{errors.heard_from}</p>}
                    </div>

                    {/* Submit */}
                    <button
                      type="submit"
                      disabled={loading}
                      className="w-full bg-[#00d084] hover:bg-[#00bb74] disabled:opacity-50 text-white font-bold text-sm py-3.5 rounded-xl transition-all duration-200 shadow-lg hover:scale-[1.02] active:scale-[0.98]"
                      style={{ boxShadow: '0 4px 24px rgba(0,208,132,0.25)' }}
                    >
                      {loading ? (
                        <span className="flex items-center justify-center gap-2">
                          <svg className="animate-spin w-4 h-4" fill="none" viewBox="0 0 24 24">
                            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8H4z" />
                          </svg>
                          Submitting…
                        </span>
                      ) : 'Confirm Registration'}
                    </button>

                  </form>
                </div>
              </>
            )}
          </div>
        </div>
      )}
    </>
  )
}
