<?php

use App\Http\Controllers\LeadController;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\ServiceController;
use App\Models\Service;
use Inertia\Inertia;

// Route::view('/', 'home')->name('home');

Route::get('/', function () {
    return Inertia::render('Home');
})->name('home');

Route::name('certifications.')->group(function () {
    Route::get('/sertifikasi', [ServiceController::class, 'page'])->name('index');
    Route::get('/sertifikasi/{slug}', function ($slug) {
    $service = Service::where('slug', $slug)->firstOrFail();

    $related = Service::query()
        ->where('category', $service->category)
        ->where('id', '<>', $service->id)
        ->limit(6)
        ->get(['id','title','slug','metadata']);

    return Inertia::render('Certifications/Show', [
        'service'  => $service,
        'related'  => $related,
        'breadcrumbs' => [
            ['label' => 'Kategori ' . ($service->category ?? 'Lainnya'), 'url' => '/sertifikasi?category='.$service->category],
            ['label' => $service->title],
        ],
    ]);
    })->name('sertifikasi.show');

    Route::get('/sertifikasi/{service:slug}/daftar', [LeadController::class, 'create'])
        ->name('certifications.apply');

    Route::post('/sertifikasi/{service:slug}/daftar', [LeadController::class, 'store'])
        ->name('certifications.apply.store');
});

/**
 * API untuk front-end (JSON)
 * (biarkan nama rutenya services.* untuk API)
 */

