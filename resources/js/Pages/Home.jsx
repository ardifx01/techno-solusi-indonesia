// resources/js/Pages/Home.jsx
import React from 'react'
import MainLayout from '@/Layouts/MainLayout'
import { Head, Link } from '@inertiajs/react'

/* =========================
   Data ringkas (bisa tarik dari backend nantinya)
   ========================= */
const SERVICES = [
  { bg: 'bg-info',    icon: 'fa-parking',     title: 'Sistem Parkir Digital', desc: 'e-Parking, e-Payment, RFID, QR Code.', btn: 'btn-info' },
  { bg: 'bg-success', icon: 'fa-certificate', title: 'Sertifikasi ISO',       desc: 'Pendampingan meraih sertifikasi ISO.', btn: 'btn-success', link: '/sertifikasi' },
]

const MISSIONS = [
  'Layanan parkir aman, nyaman, efisien sesuai standar terbaik.',
  'Integrasi teknologi digital modern di tiap layanan parkir.',
  'Kelancaran lalu lintas & lingkungan tertib via tata kelola profesional.',
  'Kerja sama strategis dengan pemilik properti, pemerintah, mitra bisnis.',
  'Kontribusi bagi pertumbuhan ekonomi daerah & peningkatan PAD.',
]

const VALUES = [
  { icon: 'fa-balance-scale', title: 'Integrity',      desc: 'Kejujuran & transparansi dalam bisnis.' },
  { icon: 'fa-lightbulb',     title: 'Innovation',     desc: 'Solusi parkir modern mengikuti perkembangan teknologi.' },
  { icon: 'fa-award',         title: 'Excellent',      desc: 'Layanan prima & berkualitas tinggi.' },
  { icon: 'fa-users',         title: 'Customer Focus', desc: 'Mengutamakan kenyamanan pengguna parkir.' },
]

const SCOPES = [
  { icon: 'fa-road',     title: 'On/Off Street',   desc: 'Pengelolaan parkir on-street & off-street (komersial, RS, kantor, residensial).' },
  { icon: 'fa-qrcode',   title: 'Sistem Digital',  desc: 'e-Parking, e-Payment, RFID, QR Code.' },
  { icon: 'fa-tools',    title: 'Maintenance',     desc: 'Peralatan: barrier gate, ticketing machine, tapping box, CCTV.' },
  { icon: 'fa-user-tie', title: 'SDM Perparkiran', desc: 'Pengelolaan SDM profesional (operator, supervisor, manajer).' },
]

/* =========================
   Page
   ========================= */
export default function Home() {
  return (
    <>
      <Head title="Techno Solusi Indonesia — Solusi Teknologi & Perparkiran Modern" />
      <HeroSection />

      <ServicesSection services={SERVICES} />

      <AboutSection missions={MISSIONS} />

      <ValuesSection values={VALUES} />

      <ScopeSection scopes={SCOPES} />

      <ContactCTA />
    </>
  )
}

Home.layout = page => <MainLayout children={page} />

/* =========================
   Components
   ========================= */

function HeroSection() {
  return (
    <section
      id="home"
      className="
        relative isolate overflow-hidden
        pt-20 pb-16
        bg-[radial-gradient(1000px_520px_at_50%_0%,#ffffff_0%,#f4f7ff_58%,#e6efff_100%)]
      "
    >
      {/* bubbles */}
      <div aria-hidden className="pointer-events-none absolute inset-0">
        <div className="absolute top-10 left-10 w-20 h-20 rounded-full bg-[#DCE8FF] opacity-60" />
        <div className="absolute top-16 right-20 w-16 h-16 rounded-full bg-[#DCE8FF] opacity-60" />
        <div className="absolute bottom-20 left-1/3 w-12 h-12 rounded-full bg-[#DCE8FF] opacity-60" />
      </div>

      {/* fade biru di bawah */}
      <div aria-hidden className="absolute inset-x-0 bottom-0 h-1/2 bg-gradient-to-b from-transparent to-[#dfe9ff]" />

      <div className="relative z-10 container mx-auto px-4 py-20 text-center">
        <div className="max-w-4xl mx-auto animate-fade-in-up">
          <h1 className="text-5xl lg:text-7xl font-bold leading-tight
                         bg-gradient-to-r from-blue-600 to-blue-800 bg-clip-text text-transparent">
            Solusi Perparkiran Modern Berbasis Teknologi
          </h1>
          <p className="mt-5 text-lg lg:text-2xl/9 text-gray-600">
            Kami menghadirkan layanan parkir aman, nyaman, transparan, dan efisien terintegrasi sistem digital.
          </p>

          <div className="mt-8 flex flex-col sm:flex-row gap-4 justify-center">
            <a
              href="#about"
              className="btn btn-outline btn-lg border-blue-600 text-blue-700
                         hover:bg-blue-600 hover:text-white transition-all"
            >
              Tentang Kami
            </a>
            <a
              href="#services"
              className="btn btn-lg text-white
                         bg-gradient-to-r from-blue-600 to-indigo-600
                         hover:from-blue-700 hover:to-indigo-700
                         shadow-[0_10px_30px_rgba(30,64,175,.18)]
                         hover:shadow-[0_16px_40px_rgba(30,64,175,.24)]
                         transition-all"
            >
              Jelajahi Layanan
            </a>
          </div>

          {/* stats optional */}
          {/* ... */}
        </div>
      </div>
    </section>
  )
}


function SectionTitle({ title, subtitle }) {
  return (
    <div className="text-center mb-14">
      <h2 className="text-4xl lg:text-5xl font-bold text-gradient">{title}</h2>
      {subtitle && <p className="mt-3 text-gray-600 max-w-2xl mx-auto">{subtitle}</p>}
    </div>
  )
}

function ServiceCard({ icon, title, desc, bg, btn, link }) {
  return (
    <div className="group card bg-white border border-gray-200 shadow-xl hover:shadow-2xl hover:-translate-y-1 transition-all duration-300">
      <div className="card-body text-center">
        <div className={`w-16 h-16 ${bg} rounded-2xl grid place-items-center mx-auto mb-4 shadow-glow group-hover:scale-105 transition-transform`}>
          <i className={`fas ${icon} text-white text-2xl`} />
        </div>
        <h3 className="card-title justify-center text-2xl">{title}</h3>
        <p className="text-gray-600 mt-2">{desc}</p>
        <div className="card-actions justify-center mt-5">
          {link
            ? <Link href={link} className={`btn ${btn} btn-sm btn-enhanced group-hover:brightness-110`}>Pelajari</Link>
            : <button className={`btn ${btn} btn-sm btn-enhanced group-hover:brightness-110`}>Pelajari</button>}
        </div>
      </div>
    </div>
  )
}

function ServicesSection({ services }) {
  return (
    <section id="services" className="py-20 bg-base-100">
      <div className="container mx-auto px-4">
        <SectionTitle title="Layanan Kami" subtitle="Solusi komprehensif untuk kebutuhan bisnis modern" />
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {services.map((s, i) => <ServiceCard key={i} {...s} />)}
        </div>
      </div>
    </section>
  )
}

function StatItem({ value, label }) {
  return (
    <div className="rounded-xl border border-blue-100 bg-blue-50 p-4 text-center hover:-translate-y-0.5 hover:shadow-sm transition">
      <div className="text-2xl font-bold text-blue-700">{value}</div>
      <div className="text-xs text-slate-600">{label}</div>
    </div>
  )
}

function AboutSection({ missions }) {
  return (
    <section id="about" className="py-20 bg-white">
      <div className="container mx-auto px-4 grid lg:grid-cols-2 gap-10 items-start">
        <div className="animate-fade-in-up">
          <span className="badge badge-info badge-outline mb-3">Tentang Kami</span>
          <h2 className="text-3xl md:text-4xl font-bold text-slate-900">PT Techno Solusi Indonesia</h2>
          <p className="mt-4 text-slate-700 leading-relaxed">
            Perusahaan pengelolaan perparkiran modern berbasis teknologi sejak 2020—fokus menghadirkan
            layanan parkir aman, nyaman, transparan, dan efisien dengan dukungan e-parking, e-payment, dan barrier gate.
          </p>

          <div className="mt-6 grid sm:grid-cols-3 gap-4">
            <StatItem value="100%" label="Legalitas Lengkap" />
            <StatItem value="20+"  label="Lokasi Dikelola" />
            <StatItem value="Sejak 2020" label="Berpengalaman" />
          </div>
        </div>

        <div className="bg-gradient-to-br from-blue-50 to-cyan-50 rounded-2xl p-6 border border-blue-100 animate-fade-in-up">
          <h3 className="text-xl font-semibold text-slate-900 mb-2">Visi</h3>
          <p className="text-slate-700">
            Menjadi pengelola parkir modern berbasis teknologi yang unggul, profesional, dan terpercaya di Indonesia,
            serta berdampak positif bagi masyarakat & mitra.
          </p>

          <h3 className="mt-6 text-xl font-semibold text-slate-900 mb-2">Misi</h3>
          <ul className="space-y-2 text-slate-700">
            {missions.map((m, i) => (
              <li key={i} className="flex gap-3">
                <i className="fas fa-check text-blue-600 mt-1" />
                <span>{m}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  )
}

function ValueCard({ icon, title, desc }) {
  return (
    <div className="group bg-white border border-slate-100 rounded-2xl p-6 text-center shadow-soft hover:shadow-lg hover:-translate-y-1 transition">
      <div className="w-12 h-12 mx-auto rounded-xl bg-blue-600 grid place-items-center text-white group-hover:scale-105 transition">
        <i className={`fas ${icon}`} />
      </div>
      <div className="mt-3 font-semibold">{title}</div>
      <div className="mt-1 text-sm text-slate-600">{desc}</div>
    </div>
  )
}

function ValuesSection({ values }) {
  return (
    <section className="py-16 bg-base-100">
      <div className="container mx-auto px-4">
        <div className="text-center mb-10">
          <h3 className="text-2xl md:text-3xl font-bold text-slate-900">Nilai Perusahaan</h3>
        </div>
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {values.map((v, i) => <ValueCard key={i} {...v} />)}
        </div>
      </div>
    </section>
  )
}

function ScopeCard({ icon, title, desc }) {
  return (
    <div className="group bg-white border border-slate-100 rounded-2xl p-6 shadow-soft hover:shadow-lg hover:-translate-y-1 hover:border-blue-200 transition">
      <div className="flex items-center gap-3">
        <div className="w-10 h-10 rounded-xl bg-blue-600 text-white grid place-items-center group-hover:scale-105 transition">
          <i className={`fas ${icon}`} />
        </div>
        <div className="font-semibold">{title}</div>
      </div>
      <p className="mt-3 text-sm text-slate-600">{desc}</p>
    </div>
  )
}

function ScopeSection({ scopes }) {
  return (
    <section className="py-16 bg-white">
      <div className="container mx-auto px-4">
        <div className="text-center mb-10">
          <h3 className="text-2xl md:text-3xl font-bold text-slate-900">Lingkup Bisnis</h3>
          <p className="text-slate-600 mt-2">Solusi end-to-end perparkiran terintegrasi</p>
        </div>
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          {scopes.map((s, i) => <ScopeCard key={i} {...s} />)}
        </div>
      </div>
    </section>
  )
}

function ContactCTA() {
  return (
    <section id="contact" className="py-16 bg-base-100">
      <div className="container mx-auto px-4">
        <div className="rounded-2xl border border-blue-100 bg-gradient-to-br from-blue-50 to-cyan-50 p-6 md:p-10">
          <div className="grid md:grid-cols-2 gap-6 items-center">
            <div>
              <h3 className="text-2xl md:text-3xl font-bold text-slate-900">Ingin Diskusi Proyek atau Kerja Sama?</h3>
              <p className="text-slate-700 mt-2">Tim kami siap membantu kebutuhan perparkiran dan transformasi digital Anda.</p>
              <div className="mt-5 flex flex-wrap gap-3 text-sm text-slate-700">
                <Chip icon="fa-envelope">info@technosolusi.co.id</Chip>
                <Chip icon="fa-phone">021 5900629</Chip>
                <Chip icon="fa-map-marker-alt">Kawasan Pergudangan 88 No.D1, Pasarkemis, Tangerang</Chip>
              </div>
            </div>
            <div className="text-right">
              <a
                href="mailto:info@technosolusi.co.id"
                className="btn btn-primary btn-lg btn-enhanced hover:scale-[1.03] active:scale-[0.98] transition-transform"
              >
                Hubungi Kami
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

function Chip({ icon, children }) {
  return (
    <div className="inline-flex items-center gap-2 bg-white rounded-xl px-4 py-2 border border-slate-200 shadow-sm hover:shadow transition">
      <i className={`fas ${icon} text-blue-600`} />
      {children}
    </div>
  )
}
