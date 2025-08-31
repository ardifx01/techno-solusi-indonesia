import React, { useState, useMemo } from 'react'
import { Head, Link } from '@inertiajs/react'
import MainLayout from '@/Layouts/MainLayout'

export default function Show({ service, related = [], breadcrumbs = [] }) {
  const [tab, setTab] = useState('overview')
  const iso        = service?.metadata?.['jenis-iso'] ?? 'ISO'
  const akreditasi = service?.metadata?.['nama-akreditasi'] || null
  const kategori   = service?.category || null

  // konten tab (aman: hanya render kalau ada datanya)
  const hasDeskripsi   = !!service?.description
  const hasSyarat      = Array.isArray(service?.requirements) && service.requirements.length > 0
  const hasProses      = Array.isArray(service?.process_steps) && service.process_steps.length > 0
  const hasDokumen     = Array.isArray(service?.documents) && service.documents.length > 0

  const tabs = useMemo(() => ([
    { key: 'overview',   label: 'Ringkasan' },
    ...(hasSyarat  ? [{ key: 'requirements', label: 'Persyaratan' }] : []),
    ...(hasProses  ? [{ key: 'process',      label: 'Proses' }] : []),
    ...(hasDokumen ? [{ key: 'documents',    label: 'Dokumen' }] : []),
    ...(hasDeskripsi ? [{ key: 'description',  label: 'Deskripsi' }] : []),
  ]), [hasSyarat, hasProses, hasDokumen, hasDeskripsi])

  if (!service) {
    return (
      <div className="container mx-auto px-4 py-24 text-center">
        <h1 className="text-2xl font-semibold text-slate-700">Data tidak ditemukan</h1>
        <Link href="/sertifikasi" className="inline-flex mt-6 rounded-xl bg-blue-600 px-5 py-2.5 text-white hover:bg-blue-700">
          Kembali ke daftar
        </Link>
      </div>
    )
  }

  function parseISOChip(item) {
  const raw =
    item?.metadata?.['jenis-iso'] ||
    item?.title ||
    ''

  // Normalisasi spasi
  const t = String(raw).replace(/\s+/g, ' ').trim()

  // Ambil "ISO 9001" dan opsional "2015"
  // Cocok untuk pola: "ISO 9001 : 2015", "ISO 14001-2015", "ISO 45001 2018", dsb.
  const m = t.match(/ISO\s*(\d{4,5})(?:\s*[:\-]?\s*(\d{4}))?/i)

  const code = m ? `ISO ${m[1]}` : 'ISO'
  const year = m && m[2] ? m[2] : ''

  return { code, year }
}

// ===== WhatsApp helpers =====
const DEFAULT_WA = (import.meta?.env?.VITE_WA_DEFAULT) ?? '6285311065944' 

function normWa(num) {
  if (!num) return null
  const d = String(num).replace(/\D/g, '')
  if (d.startsWith('62')) return d
  if (d.startsWith('0'))  return '62' + d.slice(1)
  return d
}

function chooseWa(service) {
  const meta = service?.metadata || {}
  const akr  = String(meta['nama-akreditasi'] || '').toUpperCase()

  // Opsional: mapping khusus (isi via .env Vite)
  // VITE_WA_KAN, VITE_WA_NON_IAF bisa di-set jika perlu pemisahan kanal
  const prefer = []
  if (/KAN|IAF/.test(akr) && import.meta?.env?.VITE_WA_KAN)      prefer.push(import.meta.env.VITE_WA_KAN)
  if (/NON\s*IAF|IDCAB/.test(akr) && import.meta?.env?.VITE_WA_NON_IAF) prefer.push(import.meta.env.VITE_WA_NON_IAF)

  const candidates = [
    ...prefer,
    meta.whatsapp, meta['wa'], meta['no-wa'],
    service?.contact?.whatsapp, service?.whatsapp, service?.phone,
    DEFAULT_WA,
  ]

  const picked = candidates.find(Boolean)
  return normWa(picked)
}

function buildWaUrl(service) {
  const num = chooseWa(service)
  const title = service?.title ?? ''
  const category = service?.category ? `\nKategori: ${service.category}` : ''
  const akr = service?.metadata?.['nama-akreditasi'] ? `\nAkreditasi: ${service.metadata['nama-akreditasi']}` : ''
  const link = (typeof window !== 'undefined' ? `\nLink: ${window.location.href}` : '')
  const msg = `Halo Admin, saya tertarik dengan *${title}*.${category}${akr}${link}`
  return `https://wa.me/${num}?text=${encodeURIComponent(msg)}`
}


  return (
    <>
      <Head title={`${service.title} — Sertifikasi`} />

      {/* HERO */}
      <section className="relative overflow-hidden bg-gradient-to-br from-blue-50 via-white to-blue-100">
        <div aria-hidden className="absolute -top-12 -left-12 w-48 h-48 rounded-full bg-blue-100 opacity-50" />
        <div aria-hidden className="absolute top-20 right-10 w-28 h-28 rounded-full bg-blue-200 opacity-50" />

        <div className="container mx-auto px-4 pt-24 pb-14 relative z-10">
          {/* breadcrumbs */}
          <nav className="text-sm text-slate-500 mb-3">
            <Link href="/sertifikasi" className="hover:text-blue-700">Sertifikasi</Link>
            <span className="mx-2">/</span>
            {breadcrumbs?.length ? (
              breadcrumbs.map((bc, i) => (
                <span key={i}>
                  {bc.url ? <Link href={bc.url} className="hover:text-blue-700">{bc.label}</Link> : bc.label}
                  {i < breadcrumbs.length - 1 && <span className="mx-2">/</span>}
                </span>
              ))
            ) : (
              <span className="text-slate-700">{service.title}</span>
            )}
          </nav>

          {/* judul + badges */}
          <div className="max-w-4xl">
            <div className="mb-3 flex flex-wrap items-center gap-2">
              <span className="inline-flex h-7 items-center rounded-full px-3 text-xs font-semibold text-white bg-gradient-to-r from-blue-600 to-blue-700">
                {iso}
              </span>
              {kategori && (
                <span className="inline-flex h-7 items-center rounded-full px-3 text-xs font-medium bg-blue-100 text-blue-800">
                  #{kategori}
                </span>
              )}
              {akreditasi && (
                <span className="inline-flex h-7 items-center rounded-full px-3 text-xs font-medium bg-slate-100 text-slate-700">
                  {akreditasi}
                </span>
              )}
            </div>

            <h1 className="text-4xl md:text-5xl font-bold leading-tight bg-gradient-to-r from-blue-700 to-indigo-900 bg-clip-text text-transparent">
              {service.title}
            </h1>

            {service?.short_description && (
              <p className="mt-4 text-lg text-slate-600 max-w-3xl">
                {service.short_description}
              </p>
            )}

            <div className="mt-6 flex flex-wrap gap-3">
              <a href="#detail" className="inline-flex items-center gap-2 rounded-xl bg-gradient-to-r from-blue-600 to-purple-600 px-5 py-3 text-white font-medium shadow hover:from-blue-700 hover:to-purple-700">
                Lihat Rincian
                <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor">
                  <path strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
                </svg>
              </a>
              <Link href="/sertifikasi" className="inline-flex items-center gap-2 rounded-xl border border-slate-200 bg-white px-5 py-3 text-slate-700 hover:bg-slate-50">
                Kembali
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* BODY */}
      <div className="container mx-auto px-4 py-10 grid lg:grid-cols-3 gap-10">
        {/* KONTEN KIRI */}
        <article id="detail" className="lg:col-span-2">
          {/* Ringkasan kartu kecil */}
          <div className="grid sm:grid-cols-2 gap-4 mb-6">
            <StatCard label="Jenis ISO" value={iso} />
            {kategori   && <StatCard label="Kategori"  value={kategori} />}
            {akreditasi && <StatCard label="Akreditasi" value={akreditasi} />}
            {service?.code && <StatCard label="Kode" value={service.code} />}
          </div>

          {/* Tabs premium */}
          {tabs.length > 0 && (
            <>
              <div className="flex gap-2 overflow-x-auto pb-2">
                {tabs.map(t => (
                  <button
                    key={t.key}
                    onClick={() => setTab(t.key)}
                    className={`whitespace-nowrap rounded-xl px-4 py-2 text-sm font-medium border transition
                      ${tab === t.key
                        ? 'bg-gradient-to-r from-blue-600 to-purple-600 text-white border-transparent'
                        : 'bg-white border-slate-200 text-slate-700 hover:bg-slate-50'}`}
                  >
                    {t.label}
                  </button>
                ))}
              </div>

              <div className="mt-4 rounded-2xl border border-slate-100 bg-white p-6">
                {tab === 'overview' && (
                  <div className="space-y-4 text-slate-700 leading-relaxed">
                    {service?.overview ? (
                      <div className="whitespace-pre-line">{service.overview}</div>
                    ) : (
                      <>
                        <p>Standar ini memastikan kepatuhan, peningkatan kinerja, dan keandalan proses sesuai praktik terbaik internasional.</p>
                        {service?.description && <p className="whitespace-pre-line">{service.description}</p>}
                      </>
                    )}
                  </div>
                )}

                {tab === 'requirements' && hasSyarat && (
                  <ul className="list-disc pl-5 space-y-2 text-slate-700">
                    {service.requirements.map((item, i) => <li key={i}>{item}</li>)}
                  </ul>
                )}

                {tab === 'process' && hasProses && (
                  <ol className="list-decimal pl-5 space-y-2 text-slate-700">
                    {service.process_steps.map((step, i) => <li key={i}>{step}</li>)}
                  </ol>
                )}

                {tab === 'documents' && hasDokumen && (
                  <ul className="space-y-2 text-slate-700">
                    {service.documents.map((doc, i) => (
                      <li key={i} className="flex items-center gap-2">
                        <span className="inline-block w-2 h-2 rounded-full bg-blue-600" />
                        <span>{doc}</span>
                      </li>
                    ))}
                  </ul>
                )}

                {tab === 'description' && hasDeskripsi && (
                  <div className="text-slate-700 leading-relaxed whitespace-pre-line">
                    {service.description}
                  </div>
                )}
              </div>
            </>
          )}
        </article>

        {/* SIDEBAR KANAN */}
        <aside className="space-y-6">
          <div className="rounded-2xl border border-slate-100 bg-white p-6">
            <h3 className="text-sm font-semibold text-slate-700 mb-3">Info Singkat</h3>
            <ul className="space-y-2 text-sm text-slate-600">
              <li className="flex items-center gap-2"><Dot/> Standar Internasional (ISO)</li>
              {akreditasi && <li className="flex items-center gap-2"><Dot/> {akreditasi}</li>}
              {kategori   && <li className="flex items-center gap-2"><Dot/> Kategori: {kategori}</li>}
            </ul>

            <Link
              href={`/sertifikasi/${service.slug}/daftar`}
              className="mt-5 inline-flex w-full items-center justify-center gap-2 rounded-xl bg-blue-600 px-4 py-2.5 text-white font-medium hover:bg-blue-700"
            >
              Ajukan Sertifikasi
            </Link>
          </div>

            {/* Related */}
            {Array.isArray(related) && related.length > 0 && (
            <div className="rounded-2xl border border-slate-100 bg-white p-6">
                <h3 className="text-sm font-semibold text-slate-700 mb-3">Sertifikasi Terkait</h3>
                <div className="space-y-4">
                {related.map((r, i) => {
                    const { code, year } = parseISOChip(r)  // ← helper di bawah
                    const akr = r?.metadata?.['nama-akreditasi']

                    return (
                    <Link key={r.id ?? i} href={`/sertifikasi/${r.slug}`} className="block group">
                        <div className="flex items-start gap-3">
                        {/* ISO chip compact & selalu 1 baris */}
                        <div className="flex items-center gap-1 shrink-0">
                            <span className="inline-flex h-6 items-center rounded-full px-2.5 text-[11px] font-semibold text-white bg-gradient-to-r from-blue-600 to-blue-700 shadow-sm whitespace-nowrap">
                            {code}
                            </span>
                            {year && (
                            <span className="inline-flex h-6 items-center rounded-full px-2 text-[11px] font-semibold bg-blue-50 text-blue-700 ring-1 ring-blue-100 whitespace-nowrap">
                                {year}
                            </span>
                            )}
                        </div>

                        <div className="min-w-0">
                            <div className="font-medium text-slate-800 group-hover:text-blue-700 transition line-clamp-2">
                            {r.title}
                            </div>
                            {akr && (
                            <div className="text-xs text-slate-500 mt-1">
                                {akr}
                            </div>
                            )}
                        </div>
                        </div>
                    </Link>
                    )
                })}
                </div>
            </div>
            )}
        </aside>
      </div>
    </>
  )
}

function StatCard({ label, value }) {
  return (
    <div className="rounded-2xl border border-slate-100 bg-white p-4">
      <div className="text-[11px] uppercase tracking-wide text-slate-500">{label}</div>
      <div className="mt-1 text-lg font-semibold text-slate-900">{value || '-'}</div>
    </div>
  )
}

function Dot() {
  return <span className="inline-block w-2 h-2 rounded-full bg-blue-600" />
}

// Layout wrapper
Show.layout = page => <MainLayout children={page} />
