<x-layouts.app :title="'Techno Solusi Indonesia - Solusi Teknologi Terdepan'">
    {{-- Hero --}}
    <section id="home" class="hero min-h-screen gradient-hero relative overflow-hidden">
        <div class="absolute inset-0 bg-black/20"></div>
        <div class="hero-content text-center text-white relative z-10">
            <div class="max-w-4xl animate-fade-in-up">
                <div class="mb-8 animate-float">
                    <i class="fas fa-rocket text-6xl mb-4 text-cyan-300"></i>
                </div>
                <h1 class="mb-6 text-5xl lg:text-7xl font-bold leading-tight">
                    Solusi Teknologi <span class="text-cyan-300">Terdepan</span> Indonesia
                </h1>
                <p class="mb-8 text-xl lg:text-2xl max-w-3xl mx-auto opacity-90">
                    Menghadirkan inovasi teknologi terdepan untuk mengoptimalkan bisnis Anda dengan solusi terintegrasi yang handal dan efisien.
                </p>
                <div class="flex flex-col sm:flex-row gap-4 justify-center items-center">
                    <a href="#services" class="btn btn-primary btn-lg glass-effect hover:scale-105 transition-transform">
                        <i class="fas fa-arrow-right mr-2"></i> Jelajahi Layanan
                    </a>
                    <a href="#about" class="btn btn-outline btn-lg text-white border-white hover:bg-white hover:text-primary">
                        <i class="fas fa-play mr-2"></i> Pelajari Lebih Lanjut
                    </a>
                </div>
            </div>
        </div>

        {{-- Floating Elements --}}
        <div class="absolute top-20 left-10 animate-float" style="animation-delay:.5s">
            <i class="fas fa-cog text-white/20 text-4xl"></i>
        </div>
        <div class="absolute bottom-20 right-10 animate-float" style="animation-delay:1s">
            <i class="fas fa-chart-line text-white/20 text-5xl"></i>
        </div>
        <div class="absolute top-1/2 right-20 animate-float" style="animation-delay:1.5s">
            <i class="fas fa-lightbulb text-white/20 text-3xl"></i>
        </div>
    </section>

    {{-- Services --}}
    <section id="services" class="py-20 bg-base-100">
        <div class="container mx-auto px-4">
            <div class="text-center mb-16">
                <h2 class="text-4xl lg:text-5xl font-bold text-gradient mb-4">Layanan Kami</h2>
                <p class="text-xl text-gray-600 max-w-2xl mx-auto">Solusi komprehensif untuk kebutuhan teknologi bisnis modern</p>
            </div>

            <div class="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                @php
                    $services = [
                        ['bg'=>'bg-primary','icon'=>'fa-cloud','title'=>'Cloud Solutions','desc'=>'Infrastruktur cloud yang scalable dan aman untuk mendukung pertumbuhan bisnis Anda.','btn'=>'btn-primary'],
                        ['bg'=>'bg-secondary','icon'=>'fa-shield-alt','title'=>'Cybersecurity','desc'=>'Perlindungan menyeluruh untuk data dan sistem dengan teknologi keamanan terdepan.','btn'=>'btn-secondary'],
                        ['bg'=>'bg-accent','icon'=>'fa-mobile-alt','title'=>'Mobile Development','desc'=>'Aplikasi mobile native & cross-platform yang user-friendly.','btn'=>'btn-accent'],
                        ['bg'=>'bg-warning','icon'=>'fa-database','title'=>'Data Analytics','desc'=>'Ubah data jadi insight actionable dengan AI & ML.','btn'=>'btn-warning'],
                        ['bg'=>'bg-error','icon'=>'fa-certificate','title'=>'Sertifikasi ISO','desc'=>'Konsultasi & pendampingan meraih sertifikasi ISO standar internasional.','btn'=>'btn-error','link'=>route('certifications.index')],
                        ['bg'=>'bg-success','icon'=>'fa-users','title'=>'IT Consulting','desc'=>'Konsultasi strategis untuk optimalisasi infrastruktur & transformasi digital.','btn'=>'btn-success'],
                    ];
                @endphp

                @foreach ($services as $s)
                    <div class="card bg-base-100 shadow-xl hover-lift border border-gray-200">
                        <div class="card-body text-center">
                            <div class="w-16 h-16 {{ $s['bg'] }} rounded-full flex items-center justify-center mx-auto mb-4">
                                <i class="fas {{ $s['icon'] }} text-white text-2xl"></i>
                            </div>
                            <h3 class="card-title justify-center text-2xl mb-3">{{ $s['title'] }}</h3>
                            <p class="text-gray-600 mb-4">{{ $s['desc'] }}</p>
                            <div class="card-actions justify-center">
                                @if (isset($s['link']))
                                    <a href="{{ $s['link'] }}" class="btn {{ $s['btn'] }} btn-sm">Pelajari</a>
                                @else
                                    <button class="btn {{ $s['btn'] }} btn-sm">Pelajari</button>
                                @endif
                            </div>
                        </div>
                    </div>
                @endforeach
            </div>
        </div>
    </section>

    {{-- About --}}
    <section id="about" class="py-20 bg-gradient-to-br from-blue-50 to-purple-50">
        <div class="container mx-auto px-4">
            <div class="grid lg:grid-cols-2 gap-12 items-center">
                <div class="animate-fade-in-up">
                    <h2 class="text-4xl lg:text-5xl font-bold text-gradient mb-6">Tentang Techno Solusi Indonesia</h2>
                    <p class="text-lg text-gray-700 mb-6">
                        Kami adalah perusahaan teknologi terdepan yang berfokus pada penyediaan solusi inovatif untuk transformasi digital bisnis. Dengan pengalaman lebih dari 10 tahun, kami telah membantu ratusan perusahaan mengoptimalkan operasional mereka.
                    </p>
                    <div class="grid sm:grid-cols-2 gap-6 mb-8">
                        <div class="stat bg-white rounded-xl shadow-lg p-6">
                            <div class="stat-figure text-primary"><i class="fas fa-building text-3xl"></i></div>
                            <div class="stat-title text-gray-600">Klien</div>
                            <div class="stat-value text-primary">500+</div>
                        </div>
                        <div class="stat bg-white rounded-xl shadow-lg p-6">
                            <div class="stat-figure text-secondary"><i class="fas fa-project-diagram text-3xl"></i></div>
                            <div class="stat-title text-gray-600">Proyek</div>
                            <div class="stat-value text-secondary">1000+</div>
                        </div>
                    </div>
                    <a href="#contact" class="btn btn-primary btn-lg">
                        <i class="fas fa-handshake mr-2"></i> Mari Berkolaborasi
                    </a>
                </div>

                <div class="relative">
                    <div class="bg-gradient-to-br from-primary to-secondary rounded-2xl p-8 text-white">
                        <h3 class="text-2xl font-bold mb-6">Mengapa Memilih Kami?</h3>
                        <div class="space-y-4">
                            @foreach (['Tim ahli bersertifikat internasional','Teknologi terdepan dan terbukti','Support 24/7 dan maintenance','Harga kompetitif dan transparan'] as $why)
                                <div class="flex items-center gap-3">
                                    <i class="fas fa-check-circle text-cyan-300"></i>
                                    <span>{{ $why }}</span>
                                </div>
                            @endforeach
                        </div>
                    </div>
                </div>

            </div>
        </div>
    </section>

    {{-- CTA --}}
    <section class="py-20 bg-primary text-white">
        <div class="container mx-auto px-4 text-center">
            <h2 class="text-4xl lg:text-5xl font-bold mb-6">Siap Mengembangkan Bisnis Anda?</h2>
            <p class="text-xl mb-8 max-w-2xl mx-auto opacity-90">
                Konsultasikan kebutuhan teknologi Anda dengan tim expert kami. Dapatkan solusi terbaik untuk bisnis Anda hari ini juga.
            </p>
            <div class="flex flex-col sm:flex-row gap-4 justify-center">
                <a href="#contact" class="btn btn-accent btn-lg hover:scale-105 transition-transform">
                    <i class="fas fa-rocket mr-2"></i> Mulai Sekarang
                </a>
                <a href="{{ route('certifications.index') }}" class="btn btn-outline btn-lg text-white border-white hover:bg-white hover:text-primary">
                    <i class="fas fa-certificate mr-2"></i> Lihat Sertifikasi
                </a>
            </div>
        </div>
    </section>

    {{-- Contact --}}
    <section id="contact" class="py-20 bg-base-100">
        <div class="container mx-auto px-4">
            <div class="text-center mb-16">
                <h2 class="text-4xl lg:text-5xl font-bold text-gradient mb-4">Hubungi Kami</h2>
                <p class="text-xl text-gray-600 max-w-2xl mx-auto">Kami siap membantu Anda menemukan solusi teknologi terbaik</p>
            </div>

            <div class="grid lg:grid-cols-2 gap-12">
                {{-- Info --}}
                <div class="space-y-8">
                    <div class="card bg-gradient-to-br from-primary to-secondary text-white shadow-xl">
                        <div class="card-body">
                            <h3 class="card-title text-2xl mb-4">
                                <i class="fas fa-map-marker-alt mr-2"></i> Kantor Pusat
                            </h3>
                            <p class="text-lg opacity-90">
                                Jl. Teknologi No. 123<br>Jakarta Selatan 12345<br>Indonesia
                            </p>
                        </div>
                    </div>

                    <div class="grid sm:grid-cols-2 gap-4">
                        <div class="card bg-accent text-white shadow-xl">
                            <div class="card-body p-6">
                                <i class="fas fa-phone text-3xl mb-2"></i>
                                <h4 class="font-bold">Telepon</h4>
                                <p>+62 21 1234 5678</p>
                            </div>
                        </div>
                        <div class="card bg-secondary text-white shadow-xl">
                            <div class="card-body p-6">
                                <i class="fas fa-envelope text-3xl mb-2"></i>
                                <h4 class="font-bold">Email</h4>
                                <p>info@technosolusi.id</p>
                            </div>
                        </div>
                    </div>
                </div>

                {{-- Form --}}
                <form class="card bg-base-100 shadow-xl" onsubmit="event.preventDefault(); alert('Terima kasih! Pesan Anda telah terkirim. Kami akan segera menghubungi Anda.');">
                    <div class="card-body">
                        <h3 class="card-title text-2xl mb-6 text-center">Kirim Pesan</h3>
                        <div class="form-control">
                            <label class="label"><span class="label-text font-semibold">Nama Lengkap</span></label>
                            <input type="text" placeholder="Masukkan nama Anda" class="input input-bordered w-full" required>
                        </div>
                        <div class="form-control">
                            <label class="label"><span class="label-text font-semibold">Email</span></label>
                            <input type="email" placeholder="nama@email.com" class="input input-bordered w-full" required>
                        </div>
                        <div class="form-control">
                            <label class="label"><span class="label-text font-semibold">Perusahaan</span></label>
                            <input type="text" placeholder="Nama perusahaan Anda" class="input input-bordered w-full">
                        </div>
                        <div class="form-control">
                            <label class="label"><span class="label-text font-semibold">Layanan</span></label>
                            <select class="select select-bordered w-full">
                                <option disabled selected>Pilih layanan yang diminati</option>
                                <option>Cloud Solutions</option>
                                <option>Cybersecurity</option>
                                <option>Mobile Development</option>
                                <option>Data Analytics</option>
                                <option>Sertifikasi ISO</option>
                                <option>IT Consulting</option>
                            </select>
                        </div>
                        <div class="form-control">
                            <label class="label"><span class="label-text font-semibold">Pesan</span></label>
                            <textarea class="textarea textarea-bordered h-24" placeholder="Ceritakan kebutuhan Anda..."></textarea>
                        </div>
                        <div class="form-control mt-6">
                            <button type="submit" class="btn btn-primary btn-lg">
                                <i class="fas fa-paper-plane mr-2"></i> Kirim Pesan
                            </button>
                        </div>
                    </div>
                </form>
            </div>
        </div>
    </section>
</x-layouts.app>
