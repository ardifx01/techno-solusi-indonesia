// resources/js/Layouts/MainLayout.jsx
import React, { useEffect, useState } from 'react'
import { Link, Head } from '@inertiajs/react'

export default function MainLayout({ children }) {
  const [scrolled, setScrolled] = useState(false)
  const pathname = typeof window !== 'undefined' ? window.location.pathname : '/'

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 80)
    onScroll()
    window.addEventListener('scroll', onScroll)
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  const navItem = (to, label, isAnchor = false) => {
    const active = !isAnchor && pathname === to
    const base =
      'px-3 py-2 rounded-lg transition-colors hover:text-blue-700 hover:bg-blue-50'
    const activeCls =
      'text-blue-700 bg-blue-50 font-semibold shadow-[inset_0_0_0_1px_rgba(59,130,246,.15)]'
    if (isAnchor) {
      return (
        <a href={to} className={`${base}`}>
          {label}
        </a>
      )
    }
    return (
      <Link href={to} className={`${base} ${active ? activeCls : 'text-slate-700'}`}>
        {label}
      </Link>
    )
  }

  return (
    <>
        {/* Head */}
        <Head title="Techno Solusi Indonesia">
        <link rel="icon" href="/brand/favicon.ico?v=3" />
        <link rel="icon" type="image/png" sizes="32x32" href="/brand/favicon-32x32.png?v=3" />
        <link rel="icon" type="image/png" sizes="16x16" href="/brand/favicon-16x16.png?v=3" />
        <link rel="apple-touch-icon" sizes="180x180" href="/brand/apple-touch-icon.png?v=3" />
        <link rel="manifest" href="/brand/site.webmanifest?v=3" />
        <meta name="theme-color" content="#2563eb" />
        </Head>

      {/* NAVBAR */}
      <nav
        className={[
            'navbar fixed top-0 inset-x-0 z-50 transition-all',
            'backdrop-blur-xl bg-white/70',
            scrolled
            ? 'shadow-[0_10px_30px_rgba(2,6,23,.08)] border-b border-slate-200/60'
            : 'border-b border-transparent',
        ].join(' ')}
        >
        {/* ⬇️ container HARUS flex + w-full */}
        <div className="container mx-auto px-4 flex items-center gap-2">
            {/* kiri */}
            <div className="navbar-start flex-1">
            <div className="dropdown">
                <button tabIndex={0} className="btn btn-ghost lg:hidden" aria-label="Buka menu">
                <i className="fas fa-bars text-xl" />
                </button>
                <ul
                tabIndex={0}
                className="menu menu-sm dropdown-content mt-3 p-2 shadow-xl bg-white/95 backdrop-blur-lg rounded-2xl w-60 border border-slate-200"
                >
                <li><Link href="/">Beranda</Link></li>
                <li><a href="#services">Layanan</a></li>
                <li><a href="#about">Tentang Kami</a></li>
                <li><Link href="/certifications">Sertifikasi</Link></li>
                <li><a href="#contact">Kontak</a></li>
                </ul>
            </div>

            <Link href="/" className="flex items-center gap-3">
                <img
                    src="/brand/techno-solusi-indonesia.png"  // atau /brand/logo-mark.png
                    alt="Techno Solusi Indonesia"
                    className="h-7 w-7 rounded-lg"
                    loading="eager"
                    decoding="async"
                    fetchpriority="high"
                />
                <span className="hidden sm:inline text-lg font-semibold text-slate-900">
                    Techno Solusi Indonesia
                </span>
            </Link>

            </div>

            {/* tengah */}
            <div className="navbar-center hidden lg:flex justify-center">
            <nav className="flex items-center gap-1">
                <Link href="/" className="px-3 py-2 rounded-lg hover:text-blue-700 hover:bg-blue-50">Beranda</Link>
                <a href="#services" className="px-3 py-2 rounded-lg hover:text-blue-700 hover:bg-blue-50">Layanan</a>
                <a href="#about" className="px-3 py-2 rounded-lg hover:text-blue-700 hover:bg-blue-50">Tentang Kami</a>
                <Link href="/certifications" className="px-3 py-2 rounded-lg hover:text-blue-700 hover:bg-blue-50">Sertifikasi</Link>
                <a href="#contact" className="px-3 py-2 rounded-lg hover:text-blue-700 hover:bg-blue-50">Kontak</a>
            </nav>
            </div>

            {/* kanan */}
            <div className="navbar-end flex-1 justify-end">
            <a
                href="#contact"
                className="btn btn-sm text-white bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 shadow-[0_10px_30px_rgba(30,64,175,.18)] hover:shadow-[0_16px_40px_rgba(30,64,175,.24)]"
            >
                <i className="fas fa-phone mr-2" /> Hubungi Kami
            </a>
            </div>
        </div>
        </nav>

      {/* PAGE CONTENT */}
      <main className="pt-16">{children}</main>

      {/* FOOTER */}
      <footer className="relative mt-16">
        {/* background gradient + bubbles */}
        <div className="absolute inset-0 -z-10 bg-gradient-to-b from-white via-blue-50 to-[#dfe9ff]" />
        <div aria-hidden className="pointer-events-none absolute inset-0 -z-10">
          <div className="absolute -top-8 left-10 w-24 h-24 rounded-full bg-[#DCE8FF] opacity-60" />
          <div className="absolute top-24 right-28 w-20 h-20 rounded-full bg-[#DCE8FF] opacity-60" />
          <div className="absolute bottom-10 left-1/4 w-14 h-14 rounded-full bg-[#DCE8FF] opacity-60" />
        </div>

        <div className="container mx-auto px-4 py-14">
          <div className="grid gap-10 md:grid-cols-2 lg:grid-cols-4">
            {/* Brand & Social */}
            <div>
              <Link href="/" className="flex items-center gap-3">
                <img
                    src="/brand/techno-solusi-indonesia.png"  // atau /brand/logo-mark.png
                    alt="Techno Solusi Indonesia"
                    className="h-7 w-7 rounded-lg"
                    loading="eager"
                    decoding="async"
                    fetchpriority="high"
                />
                <span className="hidden sm:inline text-lg font-semibold text-slate-900">
                    Techno Solusi Indonesia
                </span>
            </Link>
              <p className="mt-4 text-slate-600">
                Solusi teknologi & pengelolaan perparkiran modern, aman, transparan, dan efisien.
              </p>

              <div className="mt-5 flex items-center gap-3">
                <a
                  className="w-10 h-10 rounded-full grid place-items-center bg-white border border-slate-200 hover:bg-blue-50 hover:text-blue-700 transition"
                  href="#"
                  aria-label="Facebook"
                >
                  <i className="fab fa-facebook" />
                </a>
                <a
                  className="w-10 h-10 rounded-full grid place-items-center bg-white border border-slate-200 hover:bg-blue-50 hover:text-blue-700 transition"
                  href="#"
                  aria-label="Twitter"
                >
                  <i className="fab fa-twitter" />
                </a>
                <a
                  className="w-10 h-10 rounded-full grid place-items-center bg-white border border-slate-200 hover:bg-blue-50 hover:text-blue-700 transition"
                  href="#"
                  aria-label="LinkedIn"
                >
                  <i className="fab fa-linkedin" />
                </a>
                <a
                  className="w-10 h-10 rounded-full grid place-items-center bg-white border border-slate-200 hover:bg-blue-50 hover:text-blue-700 transition"
                  href="#"
                  aria-label="Instagram"
                >
                  <i className="fab fa-instagram" />
                </a>
              </div>
            </div>

            {/* Quick Links */}
            <div>
              <h4 className="font-semibold text-slate-900 mb-3">Tautan</h4>
              <ul className="space-y-2 text-slate-700">
                <li>
                  <Link href="/" className="hover:text-blue-700 transition">Beranda</Link>
                </li>
                <li>
                  <a href="#services" className="hover:text-blue-700 transition">Layanan</a>
                </li>
                <li>
                  <a href="#about" className="hover:text-blue-700 transition">Tentang Kami</a>
                </li>
                <li>
                  <Link href="/certifications" className="hover:text-blue-700 transition">Sertifikasi</Link>
                </li>
                <li>
                  <a href="#contact" className="hover:text-blue-700 transition">Kontak</a>
                </li>
              </ul>
            </div>

            {/* Services */}
            <div>
              <h4 className="font-semibold text-slate-900 mb-3">Layanan</h4>
              <ul className="space-y-2 text-slate-700">
                <li>Pengelolaan Parkir On/Off Street</li>
                <li>Sistem Digital (e-Parking, e-Payment, RFID)</li>
                <li>Maintenance Perangkat Parkir</li>
                <li>Pengelolaan SDM Perparkiran</li>
                <li>Pendampingan Sertifikasi ISO</li>
              </ul>
            </div>

            {/* Contact */}
            <div>
              <h4 className="font-semibold text-slate-900 mb-3">Kontak</h4>
              <ul className="space-y-3 text-slate-700">
                <li className="flex gap-3">
                  <i className="fas fa-envelope text-blue-600 mt-1" />
                  info@technosolusi.co.id
                </li>
                <li className="flex gap-3">
                  <i className="fas fa-phone text-blue-600 mt-1" />
                  021 5900629
                </li>
                <li className="flex gap-3">
                  <i className="fas fa-map-marker-alt text-blue-600 mt-1" />
                  Kawasan Pergudangan 88 No.D1, Pasarkemis, Tangerang
                </li>
              </ul>
              <a
                href="mailto:info@technosolusi.co.id"
                className="mt-4 inline-flex items-center gap-2 btn btn-sm text-white bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700"
              >
                <i className="fas fa-paper-plane" /> Kirim Email
              </a>
            </div>
          </div>

          {/* Divider */}
          <div className="mt-12 border-t border-slate-200/70 pt-6 flex flex-col md:flex-row items-center justify-between gap-3">
            <p className="text-sm text-slate-600">
              © {new Date().getFullYear()} Techno Solusi Indonesia. All rights reserved.
            </p>
            <div className="text-sm text-slate-600 flex items-center gap-4">
              <a href="#" className="hover:text-blue-700">Privacy</a>
              <span className="opacity-40">•</span>
              <a href="#" className="hover:text-blue-700">Terms</a>
            </div>
          </div>
        </div>
      </footer>
    </>
  )
}
