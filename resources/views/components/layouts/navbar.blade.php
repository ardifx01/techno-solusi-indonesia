@php
    $isHome = request()->routeIs('home');
    $home   = $isHome ? '' : url('/');
@endphp

<nav class="navbar navbar-enhanced fixed top-0 z-50 bg-white/80 backdrop-blur-lg glass-effect">
    <div class="navbar-start">
        <div class="dropdown">
        <button tabindex="0" class="btn btn-ghost lg:hidden" aria-label="Buka menu">
            <i class="fas fa-bars text-xl"></i>
        </button>
        <ul tabindex="0" class="menu menu-sm dropdown-content mt-3 z-[1] p-2 shadow bg-base-100 rounded-box w-52">
            <li><a href="{{ $home }}#home">Beranda</a></li>
            <li><a href="{{ $home }}#services">Layanan</a></li>
            <li><a href="{{ $home }}#about">Tentang Kami</a></li>
            <li><a href="{{ route('certifications.index') }}">Sertifikasi</a></li>
            <li><a href="{{ $home }}#contact">Kontak</a></li>
        </ul>
        </div>
        <a href="{{ route('home') }}" class="btn btn-ghost text-xl font-bold text-gradient">
        <i class="fas fa-microchip mr-2"></i> Techno Solusi
        </a>
    </div>

    <div class="navbar-center hidden lg:flex">
        <ul class="menu menu-horizontal px-1 space-x-2">
        <li><a href="{{ $home }}#home" class="hover:text-primary transition-colors">Beranda</a></li>
        <li><a href="{{ $home }}#services" class="hover:text-primary transition-colors">Layanan</a></li>
        <li><a href="{{ $home }}#about" class="hover:text-primary transition-colors">Tentang Kami</a></li>
        <li><a href="{{ route('certifications.index') }}" class="hover:text-primary transition-colors">Sertifikasi</a></li>
        <li><a href="{{ $home }}#contact" class="hover:text-primary transition-colors">Kontak</a></li>
        </ul>
    </div>

    <div class="navbar-end">
        <a href="{{ $home }}#contact" class="btn btn-primary btn-sm">
        <i class="fas fa-phone mr-2"></i> Hubungi Kami
        </a>
    </div>
</nav>
