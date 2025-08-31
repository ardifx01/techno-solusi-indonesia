<x-layouts.app :title="'ISO Certification Hub - Platform Sertifikasi ISO Terpercaya'">
    {{-- HERO SECTION --}}
    <section id="home" class="hero min-h-screen bg-gradient-to-br from-primary to-secondary relative overflow-hidden">
        <div class="hero-overlay bg-opacity-20"></div>
        <div class="hero-content text-center text-neutral-content relative z-10">
            <div class="max-w-4xl">
                <div class="mb-8">
                    <div class="badge badge-accent badge-lg mb-4 animate-pulse">
                        <i class="fas fa-star mr-2"></i>
                        Platform Terpercaya #1 Indonesia
                    </div>
                </div>

                <h1 class="mb-6 text-5xl lg:text-7xl font-bold leading-tight animate-fade-in-up">
                    Platform Sertifikasi ISO
                    <span class="text-accent block">Terpercaya Indonesia</span>
                </h1>

                <p class="mb-8 text-xl lg:text-2xl opacity-90 max-w-3xl mx-auto animate-fade-in-up animation-delay-200">
                    Temukan dan dapatkan sertifikasi ISO yang sesuai dengan kebutuhan bisnis Anda.
                    Ribuan pilihan sertifikasi dengan standar internasional terbaik.
                </p>

                <div class="flex flex-col sm:flex-row gap-4 justify-center animate-fade-in-up animation-delay-400">
                    <button data-scroll="#certifications" class="btn btn-accent btn-lg">
                        <i class="fas fa-search mr-2"></i>
                        Cari Sertifikasi
                    </button>
                    <button class="btn btn-outline btn-lg text-white border-white hover:bg-white hover:text-primary">
                        <i class="fas fa-play mr-2"></i>
                        Pelajari Lebih Lanjut
                    </button>
                </div>

                {{-- Stats Cards --}}
                <div class="grid grid-cols-2 lg:grid-cols-4 gap-4 mt-16 animate-fade-in-up animation-delay-600">
                    <div class="card bg-base-100/10 backdrop-blur-md border border-white/20">
                        <div class="card-body items-center text-center p-4">
                            <div class="stat-value text-2xl text-accent">1000+</div>
                            <div class="stat-desc text-white/80">Sertifikasi</div>
                        </div>
                    </div>
                    <div class="card bg-base-100/10 backdrop-blur-md border border-white/20">
                        <div class="card-body items-center text-center p-4">
                            <div class="stat-value text-2xl text-accent">50K+</div>
                            <div class="stat-desc text-white/80">Perusahaan</div>
                        </div>
                    </div>
                    <div class="card bg-base-100/10 backdrop-blur-md border border-white/20">
                        <div class="card-body items-center text-center p-4">
                            <div class="stat-value text-2xl text-accent">25+</div>
                            <div class="stat-desc text-white/80">Kategori</div>
                        </div>
                    </div>
                    <div class="card bg-base-100/10 backdrop-blur-md border border-white/20">
                        <div class="card-body items-center text-center p-4">
                            <div class="stat-value text-2xl text-accent">99%</div>
                            <div class="stat-desc text-white/80">Kepuasan</div>
                        </div>
                    </div>
                </div>
            </div>
        </div>

        {{-- Floating elements --}}
        <div class="absolute top-20 left-10 opacity-20 animate-bounce animation-delay-1000">
            <i class="fas fa-certificate text-6xl text-accent"></i>
        </div>
        <div class="absolute bottom-20 right-10 opacity-20 animate-bounce animation-delay-2000">
            <i class="fas fa-award text-4xl text-secondary"></i>
        </div>
    </section>

    {{-- SEARCH & FILTER SECTION --}}
    <section id="certifications" class="py-20 bg-base-200 scroll-mt-20">
        <div class="container mx-auto px-4">
            <div class="text-center mb-12">
                <h2 class="text-4xl font-bold mb-4">Cari Sertifikasi ISO</h2>
                <p class="text-lg opacity-70 max-w-2xl mx-auto">
                    Temukan sertifikasi yang tepat untuk bisnis Anda dengan filter canggih
                </p>
            </div>

            <div class="grid grid-cols-1 lg:grid-cols-4 gap-8">
                {{-- SIDEBAR FILTER --}}
                <div class="lg:col-span-1">
                    <div class="sticky top-24 space-y-6">
                        {{-- Active Filters --}}
                        <div class="card bg-base-100 shadow-xl">
                            <div class="card-body p-4">
                                <div class="flex justify-between items-center mb-3">
                                    <h3 class="card-title text-sm">Filter Aktif</h3>
                                    <button id="clearAllFilters" class="btn btn-ghost btn-xs">
                                        Bersihkan
                                    </button>
                                </div>
                                <div id="activeFilters" class="flex flex-wrap gap-2">
                                    <div class="badge badge-ghost">Tidak ada filter</div>
                                </div>
                            </div>
                        </div>

                        {{-- Main Filters --}}
                        <div class="card bg-base-100 shadow-xl">
                            <div class="card-body p-4">
                                {{-- Category Filter --}}
                                <div class="form-control mb-4">
                                    <label class="label">
                                        <span class="label-text font-semibold">Kategori</span>
                                    </label>
                                    <div id="catWrap">
                                        <select class="select select-bordered w-full">
                                            <option disabled selected>Pilih Kategori</option>
                                            <option>Semua Kategori</option>
                                        </select>
                                    </div>
                                </div>

                                {{-- Accordion Filters --}}
                                <div id="subWrap" class="space-y-2">
                                    <div class="collapse collapse-arrow bg-base-200">
                                        <input type="checkbox" />
                                        <div class="collapse-title text-sm font-medium">
                                            Jenis ISO
                                        </div>
                                        <div class="collapse-content">
                                            <div class="space-y-2">
                                                <label class="label cursor-pointer justify-start gap-3">
                                                    <input type="checkbox" class="checkbox checkbox-sm" />
                                                    <span class="label-text">ISO 9001</span>
                                                </label>
                                                <label class="label cursor-pointer justify-start gap-3">
                                                    <input type="checkbox" class="checkbox checkbox-sm" />
                                                    <span class="label-text">ISO 14001</span>
                                                </label>
                                            </div>
                                        </div>
                                    </div>

                                    <div class="collapse collapse-arrow bg-base-200">
                                        <input type="checkbox" />
                                        <div class="collapse-title text-sm font-medium">
                                            Akreditasi
                                        </div>
                                        <div class="collapse-content">
                                            <div class="space-y-2">
                                                <label class="label cursor-pointer justify-start gap-3">
                                                    <input type="checkbox" class="checkbox checkbox-sm" />
                                                    <span class="label-text">KAN</span>
                                                </label>
                                                <label class="label cursor-pointer justify-start gap-3">
                                                    <input type="checkbox" class="checkbox checkbox-sm" />
                                                    <span class="label-text">IAF</span>
                                                </label>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                {{-- MAIN CONTENT --}}
                <div class="lg:col-span-3">
                    {{-- Search Bar --}}
                    <div class="form-control mb-6">
                        <div class="input-group">
                            <input id="searchInput" type="text" placeholder="Cari ISO 9001, KAN, IAF..."
                                   class="input input-bordered input-lg flex-1" />
                            <button class="btn btn-primary btn-lg">
                                <i class="fas fa-search"></i>
                            </button>
                        </div>
                    </div>

                    {{-- Results Info & Controls --}}
                    <div class="flex flex-col sm:flex-row justify-between items-center mb-6 gap-4">
                        <div id="resultCount" class="text-sm opacity-70">
                            Menampilkan hasil pencarian...
                        </div>
                        <div id="perPageWrap" class="flex items-center gap-2">
                            <span class="text-sm">Per halaman:</span>
                            <select class="select select-bordered select-sm">
                                <option>12</option>
                                <option>24</option>
                                <option>48</option>
                            </select>
                        </div>
                    </div>

                    {{-- Certification Grid --}}
                    <div id="certificationGrid" class="grid grid-cols-1 md:grid-cols-2 gap-6">
                        @foreach($initial as $c)
                        <div class="card bg-base-100 shadow-xl hover:shadow-2xl transition-all duration-300 hover:-translate-y-2 group">
                            <div class="card-body">
                                <div class="badge badge-primary badge-sm mb-2">
                                    {{ $c->metadata['jenis-iso'] ?? 'ISO' }}
                                </div>

                                <h3 class="card-title text-lg group-hover:text-primary transition-colors">
                                    <a href="{{ route('certifications.show', $c) }}">{{ $c->title }}</a>
                                </h3>

                                <p class="text-sm opacity-70 line-clamp-3 mb-4">
                                    {{ $c->short_description ?? \Illuminate\Support\Str::limit($c->description, 140) }}
                                </p>

                                <div class="flex flex-wrap gap-2 mb-4">
                                    @if($c->category)
                                    <div class="badge badge-outline badge-sm">#{{ $c->category }}</div>
                                    @endif
                                    @if(($c->metadata['nama-akreditasi'] ?? '') !== '')
                                    <div class="badge badge-secondary badge-sm">{{ $c->metadata['nama-akreditasi'] }}</div>
                                    @endif
                                </div>

                                <div class="card-actions justify-end">
                                    <a href="{{ route('certifications.show', $c) }}"
                                       class="btn btn-primary btn-sm">
                                        <i class="fas fa-arrow-right mr-1"></i>
                                        Detail
                                    </a>
                                </div>
                            </div>
                        </div>
                        @endforeach
                    </div>

                    {{-- Pagination --}}
                    <div class="mt-8 flex justify-center">
                        <div id="pagination" class="join"></div>
                    </div>
                    <div id="clientSummary" class="text-center text-sm opacity-70 mt-4"></div>
                </div>
            </div>
        </div>

        <script>
        window.__CATS__ = @json($categories ?? []);
        </script>
    </section>

    {{-- CATEGORIES SECTION --}}
    <section id="categories" class="py-20 bg-base-100">
        <div class="container mx-auto px-4">
            <div class="text-center mb-16">
                <h2 class="text-4xl font-bold mb-4">Kategori Sertifikasi Populer</h2>
                <p class="text-lg opacity-70 max-w-2xl mx-auto">
                    Jelajahi kategori berdasarkan akreditasi dan jenis sertifikasi
                </p>
            </div>

            <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
                @foreach($catCards as $c)
                @php
                $cls = match($c['color']){
                    'blue'   => ['badge'=>'badge-info','btn'=>'btn-info'],
                    'green'  => ['badge'=>'badge-success','btn'=>'btn-success'],
                    'orange' => ['badge'=>'badge-warning','btn'=>'btn-warning'],
                    'red'    => ['badge'=>'badge-error','btn'=>'btn-error'],
                    default  => ['badge'=>'badge-neutral','btn'=>'btn-neutral'],
                };
                @endphp

                <div class="card bg-base-100 shadow-xl hover:shadow-2xl transition-all duration-300 hover:-translate-y-2 group">
                    <div class="card-body text-center">
                        <div class="avatar placeholder mb-4">
                            <div class="bg-primary text-primary-content w-16 rounded-xl">
                                <i class="fas {{ $c['icon'] }} text-2xl"></i>
                            </div>
                        </div>

                        <h3 class="card-title justify-center text-xl mb-3">{{ $c['title'] }}</h3>
                        <p class="opacity-70 mb-4">{{ $c['desc'] }}</p>

                        <div class="stat-value text-primary mb-4">
                            {{ number_format($c['count']) }}
                        </div>
                        <div class="stat-desc mb-6">Sertifikasi Tersedia</div>

                        <div class="card-actions justify-center">
                            <a href="{{ $c['link'] }}" class="btn {{ $cls['btn'] }} btn-sm group-hover:btn-primary">
                                Lihat Semua
                                <i class="fas fa-arrow-right ml-2"></i>
                            </a>
                        </div>
                    </div>
                </div>
                @endforeach
            </div>
        </div>
    </section>

    {{-- FEATURES SECTION --}}
    <section class="py-20 bg-gradient-to-br from-primary to-secondary text-primary-content">
        <div class="container mx-auto px-4">
            <div class="text-center mb-16">
                <h2 class="text-4xl font-bold mb-4 text-white">Kenapa Pilih ISO Certification Hub?</h2>
                <p class="text-xl opacity-90 max-w-2xl mx-auto">
                    Platform terdepan dengan fitur lengkap untuk kebutuhan sertifikasi ISO Anda
                </p>
            </div>

            <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                <div class="card bg-base-100/10 backdrop-blur-md border border-white/20 text-white">
                    <div class="card-body text-center">
                        <div class="avatar placeholder mb-4">
                            <div class="bg-accent text-accent-content w-16 rounded-xl">
                                <i class="fas fa-shield-alt text-2xl"></i>
                            </div>
                        </div>
                        <h3 class="card-title justify-center mb-3">Terpercaya & Aman</h3>
                        <p class="opacity-90">Platform berlisensi dengan keamanan tingkat enterprise</p>
                    </div>
                </div>

                <div class="card bg-base-100/10 backdrop-blur-md border border-white/20 text-white">
                    <div class="card-body text-center">
                        <div class="avatar placeholder mb-4">
                            <div class="bg-secondary text-secondary-content w-16 rounded-xl">
                                <i class="fas fa-clock text-2xl"></i>
                            </div>
                        </div>
                        <h3 class="card-title justify-center mb-3">Proses Cepat</h3>
                        <p class="opacity-90">Sertifikasi dalam hitungan hari, bukan bulan</p>
                    </div>
                </div>

                <div class="card bg-base-100/10 backdrop-blur-md border border-white/20 text-white">
                    <div class="card-body text-center">
                        <div class="avatar placeholder mb-4">
                            <div class="bg-accent text-accent-content w-16 rounded-xl">
                                <i class="fas fa-users text-2xl"></i>
                            </div>
                        </div>
                        <h3 class="card-title justify-center mb-3">Expert Support</h3>
                        <p class="opacity-90">Dukungan 24/7 dari ahli sertifikasi berpengalaman</p>
                    </div>
                </div>
            </div>
        </div>
    </section>

    {{-- MODAL --}}
    <div id="certificationModal" class="modal">
        <div class="modal-box max-w-4xl">
            <form method="dialog">
                <button class="btn btn-sm btn-circle btn-ghost absolute right-2 top-2">✕</button>
            </form>
            <div id="modalContent">
                {{-- Modal content will be loaded here --}}
            </div>
        </div>
        <form method="dialog" class="modal-backdrop">
            <button>close</button>
        </form>
    </div>
</x-layouts.app>
