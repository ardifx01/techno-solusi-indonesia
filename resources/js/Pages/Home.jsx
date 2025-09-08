// resources/js/Pages/Home.jsx
import React from 'react';
import MainLayout from '@/Layouts/MainLayout';
import { Head, Link } from '@inertiajs/react';

/* =========================
   Data Halaman Utama
   ========================= */

// Data untuk 11 kategori sertifikasi
const CERTIFICATION_CATEGORIES = [
  // Menyeragamkan warna tombol agar konsisten dan premium.
  // Semua akan menggunakan btn-primary atau btn-secondary yang kita definisikan.
  { icon: 'fa-award', title: 'Akreditasi', desc: 'Sertifikasi yang diakui oleh lembaga akreditasi nasional maupun internasional.', filterValue: 'akreditasi', btn: 'btn-category-blue', },
  { icon: 'fa-hard-hat', title: 'Pembinaan SMK3 Kemnaker', desc: 'Pelatihan dan pendampingan bagi ahli K3 untuk pemenuhan standar Kemnaker.', filterValue: 'pembinaan smk3 kemnaker', btn: 'btn-category-cyan', },
  { icon: 'fa-tools', title: 'Riksa Uji Alat K3 Disnaker', desc: 'Pengujian rutin peralatan untuk memastikan keselamatan dan kelayakan teknis.', filterValue: 'riksa uji alat k3 disnaker', btn: 'btn-category-blue', },
  { icon: 'fa-building', title: 'SBU BU', desc: 'Sertifikat Badan Usaha untuk kualifikasi dan klasifikasi perusahaan konstruksi.', filterValue: 'sbu bu', btn: 'btn-category-cyan', },
  { icon: 'fa-bolt', title: 'SBU DJK', desc: 'Sertifikasi Badan Usaha di bidang ketenagalistrikan dari Ditjen Ketenagalistrikan.', filterValue: 'sbu djk', btn: 'btn-category-blue', },
  { icon: 'fa-user-tie', title: 'SBU Perorangan', desc: 'Sertifikasi kompetensi untuk tenaga ahli perorangan di bidang jasa konstruksi.', filterValue: 'sbu perorangan', btn: 'btn-category-cyan', },
  { icon: 'fa-clipboard-check', title: 'Sertifikat Audit SMK3 Kemnaker', desc: 'Audit eksternal untuk menilai penerapan Sistem Manajemen K3 di perusahaan.', filterValue: 'sertifikat audit smk3 kemnaker', btn: 'btn-category-blue', },
  { icon: 'fa-id-badge', title: 'Sertifikat Kompetensi K3 BNSP', desc: 'Pengakuan kompetensi di bidang K3 yang dikeluarkan oleh Badan Nasional Sertifikasi Profesi.', filterValue: 'sertifikat kompetensi k3 bnsp', btn: 'btn-category-cyan', },
  { icon: 'fa-file-signature', title: 'SIO Kemnaker', desc: 'Surat Izin Operator untuk para operator alat berat dan angkut sesuai standar Kemnaker.', filterValue: 'sio kemnaker', btn: 'btn-category-blue', },
  { icon: 'fa-graduation-cap', title: 'SKK BNSP', desc: 'Sertifikat Kompetensi Kerja yang diterbitkan oleh BNSP untuk berbagai profesi.', filterValue: 'skk bnsp', btn: 'btn-category-cyan', },
  { icon: 'fa-lightbulb', title: 'SLO DJK ESDM', desc: 'Sertifikat Laik Operasi untuk instalasi tenaga listrik dari Ditjen Ketenagalistrikan.', filterValue: 'slo djk esdm', btn: 'btn-category-blue', },
];

// Data untuk section About Us dan Values
const MISSIONS = [
  'Memberikan pendampingan ahli untuk proses sertifikasi yang efisien.',
  'Menyederhanakan proses sertifikasi yang kompleks menjadi mudah dipahami.',
  'Membantu klien mencapai kepatuhan terhadap standar internasional.',
  'Meningkatkan daya saing dan kredibilitas bisnis klien di pasar global.',
];

const VALUES = [
    { icon: 'fa-user-tie', title: 'Profesionalisme', desc: 'Tim ahli kami memberikan layanan terbaik dengan integritas tinggi.' },
    { icon: 'fa-eye',      title: 'Transparansi',    desc: 'Proses yang jelas dan komunikasi terbuka di setiap tahap.' },
];


/* =========================
   Halaman Utama
   ========================= */
export default function Home() {
  return (
    <>
      <Head title="Techno Solusi Indonesia — Pusat Sertifikasi Terlengkap" />
      <HeroSection />
      <CategoriesSection categories={CERTIFICATION_CATEGORIES} />
      <AboutSection missions={MISSIONS} />
      <ValuesSection values={VALUES} />
      <ContactCTA />
    </>
  );
}

Home.layout = page => <MainLayout children={page} />;

/* =========================
   Komponen-komponen Halaman
   ========================= */

function HeroSection() {
    return (
      <section id="home" className="relative isolate overflow-hidden pt-20 pb-16 bg-[radial-gradient(1000px_520px_at_50%_0%,#ffffff_0%,#e6f7ff_58%,#d9efff_100%)]">
        {/* bubbles - disesuaikan agar lebih halus dan biru muda */}
        <div aria-hidden className="pointer-events-none absolute inset-0">
          <div className="absolute top-10 left-10 w-20 h-20 rounded-full bg-[#CCE8FF] opacity-60" />
          <div className="absolute top-16 right-20 w-16 h-16 rounded-full bg-[#CCE8FF] opacity-60" />
          <div className="absolute bottom-20 left-1/3 w-12 h-12 rounded-full bg-[#CCE8FF] opacity-60" />
        </div>
        <div aria-hidden className="absolute inset-x-0 bottom-0 h-1/2 bg-gradient-to-b from-transparent to-[#e0f2ff]" />

        <div className="relative z-10 container mx-auto px-4 py-20 text-center">
          <div className="max-w-4xl mx-auto animate-fade-in-up">
            {/* Judul dengan gradasi biru premium */}
            <h1 className="text-5xl lg:text-7xl font-bold leading-tight bg-gradient-to-r from-blue-700 to-cyan-600 bg-clip-text text-transparent">
              Pusat Sertifikasi Profesional & Terpercaya
            </h1>
            <p className="mt-5 text-lg lg:text-2xl/9 text-gray-700"> {/* Teks lebih gelap sedikit */}
              Temukan dan dapatkan berbagai jenis sertifikasi untuk meningkatkan standar, kompetensi, dan kredibilitas bisnis Anda.
            </p>
            <div className="mt-8">
              {/* Tombol utama dengan gradasi biru premium */}
              <Link href="#sertifikasi" className="btn btn-lg text-white bg-gradient-to-r from-blue-600 to-cyan-500 hover:from-blue-700 hover:to-cyan-600 shadow-[0_10px_30px_rgba(40,120,200,.18)] hover:shadow-[0_16px_40px_rgba(40,120,200,.24)] transition-all">
                Jelajahi Kategori
              </Link>
            </div>
          </div>
        </div>
      </section>
    );
}

function SectionTitle({ title, subtitle }) {
  return (
    <div className="text-center mb-14">
      {/* Judul section dengan gradasi biru premium */}
      <h2 className="text-4xl lg:text-5xl font-bold bg-gradient-to-r from-blue-700 to-cyan-600 bg-clip-text text-transparent">{title}</h2>
      <p className="mt-3 text-gray-600 max-w-2xl mx-auto">{subtitle}</p>
    </div>
  );
}

function CategoryCard({ icon, title, desc, btn, filterValue }) {
    const linkUrl = `/sertifikasi?category=${encodeURIComponent(filterValue)}`;
    // Menyesuaikan warna background ikon dan tombol untuk kategori
    let iconBgClass = 'bg-blue-600'; // Default blue
    let btnClass = 'btn-primary'; // Default primary button

    if (btn === 'btn-category-cyan') {
        iconBgClass = 'bg-cyan-500';
        btnClass = 'bg-cyan-500 hover:bg-cyan-600'; // Custom cyan button
    } else { // btn-category-blue
        iconBgClass = 'bg-blue-600';
        btnClass = 'bg-blue-600 hover:bg-blue-700'; // Custom blue button
    }


    return (
        <div className="group card bg-white border border-gray-100 shadow-xl hover:shadow-2xl hover:-translate-y-1 transition-all duration-300 h-full flex flex-col">
            <div className="card-body text-center flex flex-col">
                <div className={`w-16 h-16 ${iconBgClass} rounded-2xl grid place-items-center mx-auto mb-4 shadow-glow group-hover:scale-105 transition-transform`}>
                    <i className={`fas ${icon} text-white text-2xl`} />
                </div>
                <h3 className="card-title justify-center text-xl text-gray-800">{title}</h3> {/* Teks judul kategori */}
                <p className="text-gray-600 mt-2 text-sm flex-grow">{desc}</p>
                <div className="card-actions justify-center mt-5">
                    <Link href={linkUrl} className={`btn btn-sm text-white ${btnClass} btn-enhanced group-hover:brightness-110`}>
                        Lihat Detail
                    </Link>
                </div>
            </div>
        </div>
    );
}

function CategoriesSection({ categories }) {
  return (
    <section id="sertifikasi" className="py-20 bg-base-100">
      <div className="container mx-auto px-4">
        <SectionTitle title="Kategori Sertifikasi" subtitle="Jelajahi berbagai jenis sertifikasi yang kami tawarkan" />
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {categories.map((cat, i) => <CategoryCard key={i} {...cat} />)}
        </div>
      </div>
    </section>
  );
}

function StatItem({ value, label }) {
    return (
        <div className="rounded-xl border border-blue-100 bg-blue-50 p-4 text-center hover:-translate-y-0.5 hover:shadow-sm transition">
        <div className="text-2xl font-bold text-blue-700">{value}</div>
        <div className="text-xs text-slate-600">{label}</div>
        </div>
    );
}

function AboutSection({ missions }) {
  return (
    <section id="about" className="py-20 bg-white">
      <div className="container mx-auto px-4 grid lg:grid-cols-2 gap-10 items-start">
        <div className="animate-fade-in-up">
          {/* Badge dengan warna biru */}
          <span className="badge badge-info badge-outline border-blue-400 text-blue-700 bg-blue-50 mb-3">Tentang Kami</span>
          <h2 className="text-3xl md:text-4xl font-bold text-slate-900">PT Techno Solusi Indonesia</h2>
          <p className="mt-4 text-slate-700 leading-relaxed">
            PT Techno Solusi Indonesia adalah mitra terpercaya Anda dalam proses sertifikasi. Sejak 2020, kami telah mendampingi berbagai organisasi untuk meraih standar internasional, meningkatkan efisiensi operasional, dan memperkuat posisi kompetitif di pasar.
          </p>
          <div className="mt-6 grid sm:grid-cols-3 gap-4">
            <StatItem value="11+" label="Kategori Sertifikasi" />
            <StatItem value="1000+"  label="Klien Puas" />
            <StatItem value="Sejak 2020" label="Berpengalaman" />
          </div>
        </div>
        <div className="bg-gradient-to-br from-blue-50 to-cyan-50 rounded-2xl p-6 border border-blue-100 animate-fade-in-up">
          <h3 className="text-xl font-semibold text-slate-900 mb-2">Visi</h3>
          <p className="text-slate-700">
            Menjadi konsultan sertifikasi terdepan yang profesional, terpercaya, dan memberikan nilai tambah nyata bagi klien di seluruh Indonesia.
          </p>
          <h3 className="mt-6 text-xl font-semibold text-slate-900 mb-2">Misi</h3>
          <ul className="space-y-2 text-slate-700">
            {missions.map((m, i) => (
              <li key={i} className="flex gap-3">
                <i className="fas fa-check text-blue-600 mt-1" /> {/* Ikon ceklist biru */}
                <span>{m}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}

function ValueCard({ icon, title, desc }) {
    return (
        <div className="group bg-white border border-gray-100 rounded-2xl p-6 text-center shadow-soft hover:shadow-lg hover:-translate-y-1 transition h-full">
            <div className="w-12 h-12 mx-auto rounded-xl bg-blue-600 grid place-items-center text-white group-hover:scale-105 transition">
                <i className={`fas ${icon}`} />
            </div>
            <div className="mt-3 font-semibold text-gray-800">{title}</div>
            <div className="mt-1 text-sm text-gray-600">{desc}</div>
        </div>
    );
}

function ValuesSection({ values }) {
  return (
    <section className="py-16 bg-base-100">
      <div className="container mx-auto px-4">
        <div className="text-center mb-10">
          <h3 className="text-2xl md:text-3xl font-bold text-slate-900">Nilai Kami</h3>
        </div>
        <div className="max-w-3xl mx-auto grid sm:grid-cols-2 gap-6">
          {values.map((v, i) => <ValueCard key={i} {...v} />)}
        </div>
      </div>
    </section>
  );
}

function ContactCTA() {
    return (
      <section id="contact" className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="rounded-2xl border border-blue-100 bg-gradient-to-br from-blue-50 to-cyan-50 p-6 md:p-10">
            <div className="grid md:grid-cols-2 gap-6 items-center">
              <div>
                <h3 className="text-2xl md:text-3xl font-bold text-slate-900">Ingin Diskusi atau Butuh Bantuan?</h3>
                <p className="text-slate-700 mt-2">Tim ahli kami siap membantu Anda memilih sertifikasi yang tepat.</p>
              </div>
              <div className="text-center md:text-right mt-4 md:mt-0">
                {/* Tombol hubungi kami dengan gradasi biru premium */}
                <a href="mailto:info@technosolusi.co.id" className="btn btn-lg text-white bg-gradient-to-r from-blue-600 to-cyan-500 hover:from-blue-700 hover:to-cyan-600 shadow-[0_10px_30px_rgba(40,120,200,.18)] hover:shadow-[0_16px_40px_rgba(40,120,200,.24)] transition-all">
                  Hubungi Kami
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>
    );
}
