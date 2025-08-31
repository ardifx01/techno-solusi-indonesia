<?php

namespace App\Http\Controllers;

use App\Models\Service;
use Inertia\Inertia;
use Inertia\Response;
use Illuminate\Http\Request; // <-- Menggunakan Request standar untuk simplifikasi

class ServiceController extends Controller
{
    /**
     * Method ini adalah satu-satunya sumber untuk menampilkan halaman list sertifikasi.
     */
    public function page(Request $req): Response
    {
        // Validasi input langsung di sini agar lebih terkontrol dan mudah dilacak
        $validated = $req->validate([
            'q' => ['nullable', 'string', 'max:200'],
            'category' => ['nullable', 'string', 'max:100'],
            'page' => ['nullable', 'integer', 'min:1'],
            'per_page' => ['nullable', 'integer', 'in:6,9,12,18,24'],
            'meta' => ['sometimes', 'array'],
            'meta.*' => ['nullable', 'string', 'max:200'],
        ]);

        $perPage = (int)($validated['per_page'] ?? 12);
        $q       = $validated['q'] ?? '';
        $cat     = $validated['category'] ?? 'all';
        $meta    = $validated['meta'] ?? [];

        // Query data services
        $services = Service::query()
            ->search($q)
            ->category($cat)
            ->metaFilters($meta)
            ->orderBy('featured', 'desc')
            ->orderBy('title', 'asc')
            ->paginate($perPage)
            ->withQueryString();

        // Query data filter (facets)
        $facets = Service::getFacets($q, $cat, $meta);

        // Render komponen React dengan data yang dibutuhkan sebagai props
        return Inertia::render('Certifications/Index', [
            'initialServices' => $services,
            'initialFacets' => $facets,
            'initialFilters' => $validated,
        ]);
    }

    /**
     * Method untuk menampilkan halaman detail.
     * Biarkan ini menggunakan Blade untuk sementara.
     */
    public function show(Service $service): Response
    {
        return Inertia::render('Certifications/Show', [
            'service' => $service,
            'meta' => [
                'title' => $service->title . ' - Techno Solusi Indonesia',
                'description' => $service->short_description,
            ],
        ]);
    }
}
