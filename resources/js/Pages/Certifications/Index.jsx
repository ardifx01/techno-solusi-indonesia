import React, { useState, useEffect, useCallback, useRef } from 'react'
import { Head, Link, router } from '@inertiajs/react'
import MainLayout from '@/Layouts/MainLayout'

// ---- debounce lokal (tanpa dependency)
function debounce(fn, wait = 300) {
  let t
  return (...args) => {
    clearTimeout(t)
    t = setTimeout(() => fn(...args), wait)
  }
}

/* =========================
   Sub Components (UI/UX)
   ========================= */

// Kartu sertifikasi (desain modern) + equal height
const CertificationCard = ({ service, index }) => {
  const [hovered, setHovered] = useState(false)
  const isoLabel = service?.metadata?.['jenis-iso'] ?? 'ISO'

  return (
    <div
      className="group relative bg-white rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-500 hover:-translate-y-3 border border-gray-100 overflow-hidden h-full"
      style={{ animationDelay: `${index * 100}ms`, animation: 'fadeInUp 0.6s ease-out forwards' }}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      <div className="relative p-6 h-full flex flex-col">
        {/* === BADGE SIMPLE === */}
        <div className="mb-3 flex flex-wrap items-center gap-2">
          <span className="inline-flex items-center rounded-full bg-gradient-to-r from-blue-600 to-blue-700 text-white text-[11px] font-semibold h-6 px-2.5 shadow-sm">
            {isoLabel}
          </span>

          {!!service.category && (
            <span className="inline-flex items-center rounded-full bg-blue-100 text-blue-700 text-[11px] font-medium h-6 px-2.5">
              #{service.category}
            </span>
          )}
        </div>

        {/* === JUDUL === */}
        <h3 className="text-[20px] leading-snug min-h-[56px] font-bold text-gray-800 mb-3 group-hover:text-blue-600 transition-colors duration-300 line-clamp-2">
          <Link href={`/sertifikasi/${service.slug}`} className="hover:no-underline">
            {service.title}
          </Link>
        </h3>

        {/* === DESKRIPSI === */}
        <p className="text-gray-600 text-sm leading-relaxed mb-4 line-clamp-3 flex-grow">
          {service.short_description}
        </p>

        {/* === DETAIL AKREDITASI (footer info kecil) === */}
        {!!service?.metadata?.['nama-akreditasi'] && (
          <div className="mb-4 text-xs text-gray-500 font-medium">
            {service.metadata['nama-akreditasi']}
          </div>
        )}

        {/* === CTA (TOMBOL) === */}
        <div className="mt-auto">
          <Link
            href={`/sertifikasi/${service.slug}`}
            className="group/btn relative w-full bg-gradient-to-r from-blue-600 to-cyan-500 hover:from-blue-700 hover:to-cyan-600 text-white font-medium py-2.5 px-4 rounded-xl transition-all duration-300 transform hover:scale-105 active:scale-95 flex items-center justify-center gap-2 shadow-lg hover:shadow-xl"
          >
            <span>Lihat Detail</span>
            <svg className={`w-4 h-4 transition-transform duration-300 ${hovered ? 'translate-x-1' : ''}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
          </Link>
        </div>
      </div>
    </div>
  )
}

// Pagination aman (tahan url null)
const Pagination = ({ links = [] }) => (
  <div className="flex justify-center items-center flex-wrap gap-1">
    {links.map((link, i) => {
      const disabled = !link.url
      const isActive = !!link.active

      if (disabled) {
        return (
          <span
            key={i}
            className="px-3 py-2 text-sm font-medium text-gray-400 bg-gray-100 rounded-lg cursor-not-allowed"
            dangerouslySetInnerHTML={{ __html: link.label }}
          />
        )
      }

      return (
        <Link
          key={i}
          href={link.url}
          className={`px-3 py-2 text-sm font-medium rounded-lg transition-all duration-200 hover:scale-105 ${
            isActive
              ? 'bg-gradient-to-r from-blue-600 to-purple-600 text-white shadow-lg'
              : 'text-gray-700 bg-white hover:bg-gray-50 border border-gray-200 hover:border-blue-300'
          }`}
          dangerouslySetInnerHTML={{ __html: link.label }}
          preserveScroll
          replace
        />
      )
    })}
  </div>
)

// Select serbaguna
const FilterSelect = ({ value, onChange, options, placeholder, label }) => {
  const flatValues = (options ?? []).map(opt => (Array.isArray(opt) ? opt[0] : opt))
  const safeValue = flatValues.includes(value) ? value : 'all'

  return (
    <div className="relative">
      <label className="block text-sm font-medium text-gray-700 mb-2">{label}</label>
      <select
        value={safeValue}
        onChange={onChange}
        className="w-full bg-white border border-gray-200 rounded-xl px-4 py-3 text-sm focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 hover:border-gray-300 appearance-none cursor-pointer"
      >
        <option value="all">{placeholder}</option>
        {(options ?? []).map((opt, idx) => {
          if (Array.isArray(opt)) {
            const [v, c] = opt
            return (
              <option key={`${v}-${idx}`} value={v}>
                {v} {typeof c === 'number' ? `(${c})` : ''}
              </option>
            )
          }
          return (
            <option key={`${opt}-${idx}`} value={opt}>
              {opt}
            </option>
          )
        })}
      </select>
      <div className="absolute inset-y-0 right-0 flex items-center px-2 pointer-events-none mt-8">
        <svg className="w-4 h-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
        </svg>
      </div>
    </div>
  )
}


// Search input
const SearchInput = ({ defaultValue, onChange }) => (
  <div className="relative">
    <label className="block text-sm font-medium text-gray-700 mb-2">Pencarian</label>
    <div className="relative">
      <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
        <svg className="h-5 w-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
        </svg>
      </div>
      <input
        type="text"
        placeholder="Cari sertifikasi..."
        defaultValue={defaultValue}
        onChange={onChange}
        className="w-full bg-white border border-gray-200 rounded-xl pl-12 pr-4 py-3 text-sm focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 hover:border-gray-300"
      />
    </div>
  </div>
)

const LoadingSpinner = () => (
  <div className="flex justify-center items-center py-20">
    <div className="relative">
      <div className="w-12 h-12 border-4 border-gray-200 border-t-blue-600 rounded-full animate-spin" />
      <div className="absolute inset-0 w-12 h-12 border-4 border-transparent border-r-purple-600 rounded-full animate-spin animation-delay-150" />
    </div>
  </div>
)

/* =========================
   Main Page
   ========================= */

export default function Index({ initialServices, initialFacets, initialFilters }) {
  const [services, setServices] = useState(initialServices)
  const [facets, setFacets] = useState(initialFacets)
  const [filters, setFilters] = useState({
    q: initialFilters.q || '',
    category: initialFilters.category || 'all',
    meta: initialFilters.meta || {},
    per_page: initialFilters.per_page || 12,
  })
  const [loading, setLoading] = useState(false)
  const [isPageLoaded, setIsPageLoaded] = useState(false)
  const isInitialMount = useRef(true)

  // animasi awal
  useEffect(() => setIsPageLoaded(true), [])

  // reload data (Inertia) — dari “kode 1”
  const reload = useCallback(
    debounce(currentFilters => {
      setLoading(true)
      router.get('/sertifikasi', currentFilters, {
        preserveState: true,
        preserveScroll: true,
        replace: true,
        onSuccess: page => {
          setServices(page.props.initialServices)
          setFacets(page.props.initialFacets)
        },
        onFinish: () => setLoading(false),
      })
    }, 300),
    []
  )

  // cegah request pertama
  useEffect(() => {
    if (isInitialMount.current) {
      isInitialMount.current = false
      return
    }
    reload(filters)
  }, [filters, reload])

  // perubahan filter — dari “kode 1”
  const handleFilterChange = (key, value) => {
    setFilters(prev => {
      const next = { ...prev, page: 1 }
      if (key.startsWith('meta.')) {
        const metaKey = key.slice(5)
        const m = { ...next.meta }
        if (value === 'all' || !value) delete m[metaKey]
        else m[metaKey] = value
        next.meta = m
      } else {
        next[key] = value
      }
      if (key === 'category') next.meta = {}
      return next
    })
  }

  return (
    <>
      <Head title="Sertifikasi ISO Terpercaya" />

      {/* CSS kecil untuk animasi & clamp */}
      <style>{`
        @keyframes fadeInUp { from {opacity:0; transform: translateY(30px);} to {opacity:1; transform: translateY(0);} }
        .animation-delay-150 { animation-delay: 150ms; }
        .line-clamp-2 { display:-webkit-box; -webkit-line-clamp:2; -webkit-box-orient:vertical; overflow:hidden; }
        .line-clamp-3 { display:-webkit-box; -webkit-line-clamp:3; -webkit-box-orient:vertical; overflow:hidden; }
      `}</style>

      {/* HERO */}
      <div className="relative bg-gradient-to-br from-blue-50 via-white to-blue-100 pt-20 pb-16 overflow-hidden">
        <div className="absolute top-20 left-10 w-20 h-20 bg-blue-100 rounded-full opacity-50 animate-pulse" />
        <div className="absolute top-40 right-20 w-16 h-16 bg-blue-200 rounded-full opacity-50 animate-pulse animation-delay-150" />
        <div className="absolute bottom-20 left-1/3 w-12 h-12 bg-blue-100 rounded-full opacity-50 animate-pulse" />

        <div className="container mx-auto px-4 py-12 relative z-10">
          <div className={`text-center transition-all duration-1000 ${isPageLoaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
            <h1 className="text-5xl lg:text-6xl font-bold bg-gradient-to-r from-blue-600 to-blue-800 bg-clip-text text-transparent mb-6 leading-tight">
              Pusat Sertifikasi
            </h1>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Temukan sertifikasi ISO yang Anda butuhkan dengan standar internasional terpercaya
            </p>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-12 max-w-4xl mx-auto">
              <div className="bg-white/80 backdrop-blur-sm rounded-2xl p-6 shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-2">
                <div className="text-3xl font-bold text-blue-600 mb-2">50+</div>
                <div className="text-gray-600">Jenis Sertifikasi</div>
              </div>
              <div className="bg-white/80 backdrop-blur-sm rounded-2xl p-6 shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-2">
                <div className="text-3xl font-bold text-blue-700 mb-2">1000+</div>
                <div className="text-gray-600">Klien Terpercaya</div>
              </div>
              <div className="bg-white/80 backdrop-blur-sm rounded-2xl p-6 shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-2">
                <div className="text-3xl font-bold text-blue-800 mb-2">99%</div>
                <div className="text-gray-600">Tingkat Kepuasan</div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* BODY */}
      <div className="container mx-auto px-4 py-12">
        <div className="grid lg:grid-cols-4 gap-12">
          {/* Sidebar (filter dari kode 1, UI dari kode 2) */}
            <aside className={`lg:col-span-1 space-y-6 transition-all duration-700 ${isPageLoaded ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-10'}`}>
                <div className="bg-white rounded-2xl shadow-lg p-6 border border-gray-100">
                    <h3 className="text-lg font-semibold text-gray-800 mb-4 flex items-center gap-2">
                    <svg className="w-5 h-5 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 4a1 1 0 011-1h16a1 1 0 011 1v2.586a1 1 0 01-.293.707l-6.414 6.414a1 1 0 00-.293.707V17l-4 4v-6.586a1 1 0 00-.293-.707L3.293 7.207A1 1 0 013 6.5V4z" />
                    </svg>
                    Filter Sertifikasi
                    </h3>

                    {/* Selalu tampil: Search + Kategori */}
                    <div className="space-y-4">
                    <SearchInput defaultValue={filters.q} onChange={e => handleFilterChange('q', e.target.value)} />

                    <FilterSelect
                        value={filters.category}
                        onChange={e => handleFilterChange('category', e.target.value)}
                        options={facets?.categories}
                        placeholder="Semua Kategori"
                        label="Kategori"
                    />
                    </div>

                    {filters.category !== 'all' ? (
                    <div className="space-y-4 mt-6">
                        {Object.entries(facets?.metadata_facets || {})
                        .filter(([, opts]) => Array.isArray(opts) && opts.length > 0)
                        .map(([key, options]) => (
                            <FilterSelect
                            key={key}
                            value={filters.meta?.[key] || 'all'}
                            onChange={e => handleFilterChange(`meta.${key}`, e.target.value)}
                            options={options}
                            placeholder={`Semua ${key.replace(/[-_]/g, ' ')}`}
                            label={key.replace(/[-_]/g, ' ').replace(/\b\w/g, c => c.toUpperCase())}
                            />
                        ))}
                    </div>
                    ) : (
                    <div className="mt-4 text-[13px] text-gray-500">
                        Pilih <span className="font-medium text-gray-700">Kategori</span> untuk menampilkan filter lanjutan (jenis ISO, akreditasi, dsb.).
                    </div>
                    )}
                </div>
            </aside>

          {/* Konten utama */}
          <main className={`lg:col-span-3 transition-all duration-700 ${isPageLoaded ? 'opacity-100 translate-x-0' : 'opacity-0 translate-x-10'}`}>
            {loading && <LoadingSpinner />}

            <div className={`transition-all duration-300 ${loading ? 'opacity-30 pointer-events-none' : 'opacity-100'}`}>
              {services && services.data ? (
                <>
                  {/* header hasil + per_page */}
                  {(() => {
                    const total = services?.total ?? 0
                    const lastPage = services?.last_page ?? 1
                    const hasPagination = lastPage > 1
                    const showPerPage = total > 12

                    return (
                        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-8 bg-white rounded-2xl p-4 shadow-sm border border-gray-100">
                        <div>
                            <h2 className="text-lg font-semibold text-gray-800">
                            {total} Sertifikasi {filters.category} ditemukan
                            </h2>
                            {hasPagination && (
                            <p className="text-sm text-gray-600">
                                Halaman {services.current_page} dari {services.last_page}
                            </p>
                            )}
                        </div>

                        {showPerPage && (
                            <select
                            value={filters.per_page}
                            onChange={e => handleFilterChange('per_page', parseInt(e.target.value, 10))}
                            className="bg-white border border-gray-200 rounded-lg px-3 py-2 text-sm focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                            >
                            <option value={6}>6 per halaman</option>
                            <option value={12}>12 per halaman</option>
                            <option value={24}>24 per halaman</option>
                            </select>
                        )}
                        </div>
                    )
                    })()}

                    {services?.data?.length > 0 && (
                    <div className="grid md:grid-cols-2 xl:grid-cols-3 gap-8 items-stretch">
                        {services.data.map((svc, idx) => (
                        <CertificationCard key={svc.id ?? idx} service={svc} index={idx} />
                        ))}
                    </div>
                    )}

                    {services?.data?.length === 0 && (
                    <div className="text-center py-20">
                        <div className="w-24 h-24 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-6">
                        <svg className="w-12 h-12 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.172 16.172a4 4 0 015.656 0M9 12h6m-6-4h6m2 5.291A7.962 7.962 0 0112 15c-2.34 0-4.291-1.1-5.5-2.709" />
                        </svg>
                        </div>
                        <h3 className="text-xl font-semibold text-gray-700 mb-2">Tidak ada hasil ditemukan</h3>
                        <p className="text-gray-500">Coba ubah filter pencarian Anda</p>
                    </div>
                    )}

                    {services.data.length > 0 && (services.last_page ?? 1) > 1 && (
                        <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100 mt-8">
                            <Pagination links={services.links} />
                        </div>
                        )}
                </>
              ) : (
                <LoadingSpinner />
              )}
            </div>
          </main>
        </div>
      </div>
    </>
  )
}

// Layout
Index.layout = page => <MainLayout children={page} />
