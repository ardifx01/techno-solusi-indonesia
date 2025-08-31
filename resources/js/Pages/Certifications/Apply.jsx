import React from 'react'
import { Head, Link, useForm } from '@inertiajs/react'
import MainLayout from '@/Layouts/MainLayout'

export default function Apply({ service, flash }) {
  const { data, setData, post, processing, errors, reset } = useForm({
    name: '', email: '', phone: '', company: '', message: '',
  })

  const submit = (e) => {
    e.preventDefault()
    post(`/sertifikasi/${service.slug}/daftar`, {
      onSuccess: () => reset(),
    })
  }

  return (
    <>
      <Head title={`Ajukan — ${service.title}`} />
      <div className="bg-gradient-to-br from-blue-50 via-white to-blue-100 pt-20 pb-8">
        <div className="container mx-auto px-4">
          <h1 className="text-3xl md:text-4xl font-bold bg-gradient-to-r from-blue-700 to-indigo-900 bg-clip-text text-transparent">
            Ajukan Sertifikasi
          </h1>
          <p className="text-slate-600 mt-2">
            {service.title}
          </p>
        </div>
      </div>

      <div className="container mx-auto px-4 py-10 grid lg:grid-cols-3 gap-8">
        <form onSubmit={submit} className="lg:col-span-2 bg-white border border-slate-100 rounded-2xl p-6 shadow-sm">
          {flash?.success && (
            <div className="mb-4 rounded-xl bg-green-50 text-green-800 px-4 py-3">
              {flash.success}
            </div>
          )}

          <div className="grid md:grid-cols-2 gap-4">
            <Field label="Nama *" error={errors.name}>
              <input
                value={data.name}
                onChange={e=>setData('name', e.target.value)}
                className="input"
                required
              />
            </Field>

            <Field label="Email" error={errors.email}>
              <input
                type="email"
                value={data.email}
                onChange={e=>setData('email', e.target.value)}
                className="input"
              />
            </Field>

            <Field label="Telepon/WhatsApp" error={errors.phone}>
              <input
                value={data.phone}
                onChange={e=>setData('phone', e.target.value)}
                className="input"
              />
            </Field>

            <Field label="Perusahaan" error={errors.company}>
              <input
                value={data.company}
                onChange={e=>setData('company', e.target.value)}
                className="input"
              />
            </Field>

            <Field label="Pesan" error={errors.message} full>
              <textarea
                rows={5}
                value={data.message}
                onChange={e=>setData('message', e.target.value)}
                className="input resize-y"
                placeholder="Ceritakan kebutuhan Anda..."
              />
            </Field>
          </div>

          <div className="mt-6 flex gap-3">
            <button
              type="submit"
              disabled={processing}
              className="inline-flex items-center justify-center gap-2 rounded-xl
                         bg-gradient-to-r from-blue-600 to-purple-600 px-5 py-2.5 text-white
                         font-medium hover:from-blue-700 hover:to-purple-700 disabled:opacity-60"
            >
              {processing ? 'Mengirim...' : 'Kirim Pengajuan'}
            </button>
            <Link href={`/sertifikasi/${service.slug}`}
              className="inline-flex items-center rounded-xl border border-slate-200 bg-white px-5 py-2.5 text-slate-700 hover:bg-slate-50">
              Kembali ke Detail
            </Link>
          </div>
        </form>

        <aside className="space-y-4">
          <div className="bg-white border border-slate-100 rounded-2xl p-6">
            <h3 className="text-sm font-semibold text-slate-700 mb-2">Info Sertifikasi</h3>
            <ul className="text-sm text-slate-600 space-y-1">
              <li><strong>Judul:</strong> {service.title}</li>
              {service.category && <li><strong>Kategori:</strong> {service.category}</li>}
              {service.metadata?.['nama-akreditasi'] && (
                <li><strong>Akreditasi:</strong> {service.metadata['nama-akreditasi']}</li>
              )}
            </ul>
          </div>
        </aside>
      </div>
    </>
  )
}

function Field({ label, error, full=false, children }) {
  return (
    <label className={`block ${full ? 'md:col-span-2' : ''}`}>
      <span className="block text-sm font-medium text-slate-700 mb-2">{label}</span>
      {children}
      {error && <span className="mt-1 block text-xs text-red-600">{error}</span>}
    </label>
  )
}

// small utility class (Tailwind)
const inputBase =
  "w-full rounded-xl border border-slate-200 bg-white px-3.5 py-2.5 text-sm " +
  "focus:outline-none focus:ring-2 focus:ring-blue-500/70 focus:border-transparent " +
  "placeholder:text-slate-400"
if (typeof document !== 'undefined') {
  // inject once for demo (opsional, boleh dipindah ke CSS kamu)
  const style = document.createElement('style')
  style.innerHTML = `.input{ ${inputBase} }`
  document.head.appendChild(style)
}

// Layout
Apply.layout = (page) => <MainLayout children={page} />
