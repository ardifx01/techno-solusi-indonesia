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

    const CERTIFICATION_CATEGORIES_FOR_FOOTER = [
        { title: 'Akreditasi', filterValue: 'akreditasi' },
        { title: 'Pembinaan SMK3 Kemnaker', filterValue: 'pembinaan smk3 kemnaker' },
        { title: 'Riksa Uji Alat K3 Disnaker', filterValue: 'riksa uji alat k3 disnaker' },
        { title: 'SBU Badan Usaha', filterValue: 'sbu bu' },
        { title: 'Audit SMK3 Kemnaker', filterValue: 'sertifikat audit smk3 kemnaker' },
        { title: 'Sertifikat Kompetensi K3 BNSP', filterValue: 'sertifikat kompetensi k3 bnsp' },
    ];

  return (
    <>
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
                <li><Link href="/tentang-kami">Tentang Kami</Link></li>
                <li><Link href="/sertifikasi">Sertifikasi</Link></li>
                <li><Link href="/#contact">Kontak</Link></li>
                </ul>
            </div>

            <Link href="/" className="flex items-center gap-3">
                <img
                    src="/brand/techno-solusi-indonesia.png"
                    alt="Techno Solusi Indonesia"
                    className="h-7 w-7 rounded-lg"
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
                <Link href="/tentang-kami" className="px-3 py-2 rounded-lg hover:text-blue-700 hover:bg-blue-50">Tentang Kami</Link>
                <Link href="/sertifikasi" className="px-3 py-2 rounded-lg hover:text-blue-700 hover:bg-blue-50">Sertifikasi</Link>
                <Link href="/#contact" className="px-3 py-2 rounded-lg hover:text-blue-700 hover:bg-blue-50">Kontak</Link>
            </nav>
            </div>

            {/* kanan */}
            <div className="navbar-end flex-1 justify-end">
            <a
                href="mailto:info@technosolusi.co.id"
                className="btn btn-sm rounded-full text-white bg-gradient-to-r from-blue-600 to-cyan-500 hover:from-blue-700 hover:to-cyan-600 shadow-md transition-all"
            >
                <i className="fas fa-paper-plane mr-2" /> Hubungi Kami
            </a>
            </div>
        </div>
        </nav>

        {/* PAGE CONTENT */}
        <main className="pt-16">{children}</main>

        {/* FOOTER */}
        <footer className="relative mt-16 bg-gradient-to-br from-blue-800 to-cyan-700 text-white">
            <div className="container mx-auto px-4 py-14">
            <div className="grid gap-10 md:grid-cols-2 lg:grid-cols-4">
                {/* Brand & Social */}
                <div>
                <Link href="/" className="flex items-center gap-3">
                    <img
                        src="/brand/techno-solusi-indonesia.png"
                        alt="Techno Solusi Indonesia"
                        className="h-7 w-7 rounded-lg"
                    />
                    <span className="text-lg font-semibold text-white">
                        Techno Solusi Indonesia
                    </span>
                </Link>
                {/* DIUBAH DI SINI: Deskripsi difokuskan ke sertifikasi */}
                <p className="mt-4 text-blue-100 text-sm leading-relaxed">
                    Mitra terpercaya Anda untuk meraih sertifikasi standar nasional dan internasional.
                </p>

                <div className="mt-5 flex items-center gap-3">
                    <a className="w-10 h-10 rounded-full grid place-items-center bg-white/10 hover:bg-white/20 transition" href="#" aria-label="LinkedIn"><i className="fab fa-linkedin" /></a>
                    <a className="w-10 h-10 rounded-full grid place-items-center bg-white/10 hover:bg-white/20 transition" href="#" aria-label="Instagram"><i className="fab fa-instagram" /></a>
                    <a className="w-10 h-10 rounded-full grid place-items-center bg-white/10 hover:bg-white/20 transition" href="#" aria-label="Facebook"><i className="fab fa-facebook" /></a>
                </div>
                </div>

                {/* Quick Links */}
                <div>
                <h4 className="font-semibold text-white mb-3">Tautan Cepat</h4>
                <ul className="space-y-2 text-blue-100 text-sm">
                    <li><Link href="/" className="hover:text-white transition">Beranda</Link></li>
                    <li><Link href="/#about" className="hover:text-white transition">Tentang Kami</Link></li>
                    <li><Link href="/sertifikasi" className="hover:text-white transition">Sertifikasi</Link></li>
                    <li><Link href="/#contact" className="hover:text-white transition">Kontak</Link></li>
                </ul>
                </div>

                <div>
                <h4 className="font-semibold text-white mb-3">Kategori Sertifikasi</h4>
                <ul className="space-y-2 text-blue-100 text-sm">
                    {CERTIFICATION_CATEGORIES_FOR_FOOTER.map((category, index) => (
                        <li key={index}>
                            <Link href={`/sertifikasi?category=${encodeURIComponent(category.filterValue)}`} className="hover:text-white transition">
                                {category.title}
                            </Link>
                        </li>
                    ))}
                    <li><Link href="/sertifikasi" className="hover:text-white transition font-semibold">Lihat Semua...</Link></li>
                </ul>
                </div>

                {/* Contact */}
                <div>
                <h4 className="font-semibold text-white mb-3">Kontak</h4>
                <ul className="space-y-3 text-blue-100 text-sm">
                    <li className="flex items-start gap-3">
                    <i className="fas fa-envelope text-cyan-300 mt-1" />
                    info@technosolusi.co.id
                    </li>
                    <li className="flex items-start gap-3">
                    <i className="fas fa-phone text-cyan-300 mt-1" />
                    021 5900629
                    </li>
                    <li className="flex items-start gap-3">
                    <i className="fas fa-map-marker-alt text-cyan-300 mt-1" />
                    Kawasan Pergudangan 88 No.D1, Pasarkemis, Tangerang
                    </li>
                </ul>
                </div>
            </div>

            <div className="mt-12 border-t border-white/20 pt-6 text-center">
                <p className="text-sm text-blue-200">
                © {new Date().getFullYear()} Techno Solusi Indonesia. All rights reserved.
                </p>
            </div>
            </div>
        </footer>
        </>
    )
}
