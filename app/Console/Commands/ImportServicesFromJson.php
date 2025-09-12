<?php

namespace App\Console\Commands;

use App\Models\Service;
use Illuminate\Console\Command;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Str;

class ImportServicesFromJson extends Command
{
    protected $signature   = 'services:import {path=df_services.json} {--fresh}';
    protected $description = 'Import services from a JSON file into database (upsert by external_id)';

    private array $slugPool = [];

    public function handle(): int
    {
        $rel = $this->argument('path');
        $candidates = [
            storage_path("app/{$rel}"),
            base_path($rel),
            public_path($rel),
        ];
        $file = collect($candidates)->first(fn ($p) => is_file($p));
        if (!$file) {
            $this->error("File not found: {$rel}");
            return self::FAILURE;
        }

        $raw  = file_get_contents($file);
        $data = json_decode($raw, true);
        if (!is_array($data)) {
            $this->error('JSON root must be an array');
            return self::FAILURE;
        }

        if ($this->option('fresh')) {
            DB::statement('SET FOREIGN_KEY_CHECKS=0;');
            Service::truncate();
            DB::statement('SET FOREIGN_KEY_CHECKS=1;');
            $this->info('Truncated table services.');
        }

        Service::query()->pluck('slug')->filter()->each(function ($s) {
            $this->slugPool[$s] = true;
        });

        $total = count($data);
        $done = 0;
        $errors = 0;
        $buffer = [];
        $chunkSz = 500;

        foreach ($data as $i => $row) {
            try {
                $svc = $this->mapRowToModel($row, $i);
                $buffer[] = $svc;
                if (count($buffer) >= $chunkSz) {
                    $this->saveChunk($buffer);
                    $done += count($buffer);
                    $this->line(".. committed {$done}/{$total}");
                    $buffer = [];
                }
            } catch (\Throwable $e) {
                $errors++;
                $this->warn("Row #" . ($i + 1) . " skipped: " . $e->getMessage());
            }
        }

        if ($buffer) {
            $this->saveChunk($buffer);
            $done += count($buffer);
        }

        $this->info("Imported OK: {$done} rows; Skipped: {$errors}; Total read: {$total}");
        return self::SUCCESS;
    }

    protected function mapRowToModel(array $row, int $index): Service
    {
        $title = trim((string)($row['title'] ?? ''));
        if ($title === '') {
            throw new \RuntimeException('title empty');
        }

        $ext = (string)($row['id'] ?? '');
        if ($ext === '') {
            $ext = 'hash:' . md5(json_encode($row));
        }
        $svc = Service::firstOrNew(['external_id' => $ext]);
        $svc->title = $this->titleCaseKbbi($title);
        $svc->category = filled($row['category'] ?? null) ? (string)$row['category'] : null;
        $svc->description = $row['description'] ?? null;
        $svc->short_description = $row['short_description'] ?? null;
        $svc->jangka_waktu = $row['duration'] ?? null;
        $svc->duration_information = $row['duration_information'] ?? null;
        $svc->cta_text = $row['cta_text'] ?? null;
        $svc->cta_url = $row['cta_url'] ?? null;
        $svc->featured = (bool)($row['featured'] ?? false);
        $svc->metadata = is_array($row['metadata'] ?? null) ? $row['metadata'] : [];
        $svc->benefits = is_array($row['benefits'] ?? null) ? $row['benefits'] : [];
        $svc->requirements = is_array($row['requirements'] ?? null) ? $row['requirements'] : [];

        if ($svc->exists && filled($svc->slug)) {
        } else {
            $slug = Str::limit(Str::slug($title), 191, ''); // slug tetap dari title asli
            if (isset($this->slugPool[$slug])) {
                $slug = Str::limit($slug . '-' . Str::random(4), 191, '');
            }
            $svc->slug = $slug;
        }
        $this->slugPool[$svc->slug] = true;

        return $svc;
    }

    protected function saveChunk(array $buffer): void
    {
        if (empty($buffer)) {
            return;
        }

        DB::transaction(function () use ($buffer) {
            /** @var Service $svc */
            foreach ($buffer as $svc) {
                $svc->save();
            }
        });
    }

    /**
     * Mengubah string menjadi Title Case sesuai kaidah KBBI.
     * Kata-kata tugas (konjungsi, preposisi) tetap huruf kecil.
     *
     * @param string $string
     * @return string
     */
    protected function titleCaseKbbi(string $string): string
    {
        $lowercaseWords = [
            'dan', 'atau', 'tetapi', 'saat', 'ketika', 'jika', 'maka',
            'dengan', 'untuk', 'pada', 'kepada', 'dari', 'dalam', 'di', 'ke',
            'sebagai', 'tentang', 'yang', '&'
        ];

        $words = explode(' ', strtolower(trim($string)));

        $titleCasedWords = array_map(function ($word, $index) use ($lowercaseWords) {
            // Selalu kapitalisasi kata pertama
            if ($index === 0) {
                return ucfirst($word);
            }
            // Biarkan kata tugas tetap huruf kecil
            if (in_array($word, $lowercaseWords, true)) {
                return $word;
            }
            // Kapitalisasi kata lainnya
            return ucfirst($word);
        }, $words, array_keys($words));

        return implode(' ', $titleCasedWords);
    }
}
