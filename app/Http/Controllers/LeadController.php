<?php

namespace App\Http\Controllers;

use App\Models\Lead;
use App\Models\Service;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Mail;
use Inertia\Inertia;

class LeadController extends Controller
{
    public function create(Service $service)
    {
        return Inertia::render('Certifications/Apply', [
            'service' => $service->only(['id','slug','title','category','metadata']),
        ]);
    }

    public function store(Request $req, Service $service)
    {
        $data = $req->validate([
            'name'    => ['required','string','max:120'],
            'email'   => ['nullable','email','max:120'],
            'phone'   => ['nullable','string','max:30'],
            'company' => ['nullable','string','max:120'],
            'message' => ['nullable','string','max:2000'],
        ]);

        $lead = Lead::create([
            ...$data,
            'service_id'    => $service->id,
            'service_slug'  => $service->slug,
            'service_title' => $service->title,
            'channel'       => 'web',
            'ip'            => $req->ip(),
            'user_agent'    => (string) $req->userAgent(),
        ]);

        // Kirim email notifikasi sederhana (opsional)
        if (config('mail.default')) {
            Mail::raw(
                "Lead baru:\n".
                "Sertifikasi: {$lead->service_title}\n".
                "Nama: {$lead->name}\nEmail: {$lead->email}\nTelp: {$lead->phone}\n".
                "Perusahaan: {$lead->company}\nPesan:\n{$lead->message}",
                function ($m) use ($lead) {
                    $m->to(config('mail.from.address'))
                      ->subject('Lead Baru — '.$lead->service_title);
                }
            );
        }

        return back()->with('success', 'Pengajuan terkirim. Kami akan menghubungi Anda segera.');
    }
}
