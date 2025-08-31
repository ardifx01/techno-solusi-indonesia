<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Builder;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Support\Str;

class Service extends Model
{
    protected $fillable = [
        'external_id','title','slug','category','description','short_description',
        'image_url','cta_text','cta_url','featured','metadata','benefits','requirements',
    ];

    protected $casts = [
        'featured'     => 'boolean',
        'metadata'     => 'array',
        'benefits'     => 'array',
        'requirements' => 'array',
    ];

    public static function booted(): void
    {
        static::saving(function (self $m) {
            if (empty($m->slug) && !empty($m->title)) {
                $m->slug = Str::limit(Str::slug($m->title), 191, '');
            }
        });
    }

    public function scopeSearch(Builder $q, ?string $term): Builder
    {
        $term = trim((string)$term);
        if ($term === '') return $q;
        $like = '%'.$term.'%';
        return $q->where(fn($w) => $w->where('title', 'like', $like)->orWhere('short_description', 'like', $like));
    }

    public function scopeCategory(Builder $q, ?string $category): Builder
    {
        $c = trim((string) $category);
        return $c === '' || strtolower($c) === 'all' ? $q : $q->where('category', $c);
    }

    public function scopeMetaFilters(Builder $q, array $meta): Builder
    {
        foreach ($meta as $k => $v) {
            if (empty($v) || strtolower($v) === 'all') continue;
            $q->whereJsonContains("metadata->{$k}", $v);
        }
        return $q;
    }

    /**
     * Versi getFacets yang aman dan teroptimasi.
     */
    public static function getFacets(string $q = '', string $category = 'all', array $meta = []): array
    {
        // Buat query dasar yang sama dengan query filter utama
        $baseQuery = self::query()
            ->search($q)
            ->category($category)
            ->metaFilters($meta);

        // Ambil daftar kategori yang relevan
        $categories = (clone $baseQuery)
            ->select('category')
            ->whereNotNull('category')
            ->where('category', '!=', '')
            ->distinct()
            ->pluck('category')
            ->sort()
            ->values()
            ->all();

        // Ambil metadata facets dari hasil yang sudah terfilter
        $metadataResults = (clone $baseQuery)
            ->select('metadata')
            ->limit(1000) // Batasi analisis pada 1000 hasil pertama untuk performa
            ->get()
            ->pluck('metadata');

        $metadataFacets = [];
        foreach ($metadataResults as $metaItem) {
            if (is_array($metaItem)) {
                foreach ($metaItem as $key => $value) {
                    if (is_string($value) && $value !== '') {
                        if (!isset($metadataFacets[$key])) $metadataFacets[$key] = [];
                        if (!isset($metadataFacets[$key][$value])) $metadataFacets[$key][$value] = 0;
                        $metadataFacets[$key][$value]++;
                    }
                }
            }
        }

        // Format ulang metadata facets
        $formattedMetaFacets = [];
        foreach ($metadataFacets as $key => $values) {
            $formattedMetaFacets[$key] = [];
            foreach ($values as $value => $count) {
                $formattedMetaFacets[$key][] = [$value, $count];
            }
            usort($formattedMetaFacets[$key], fn($a, $b) => $b[1] <=> $a[1]);
        }

        return [
            'categories' => $categories,
            'metadata_facets' => $formattedMetaFacets,
        ];
    }
}
