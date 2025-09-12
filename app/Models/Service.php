<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Builder;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Support\Str;

class Service extends Model
{
    protected $fillable = [
        'external_id', 'title', 'slug', 'category', 'description', 'short_description',
        'jangka_waktu', 'duration_information', 'cta_text', 'cta_url', 'featured', 'metadata', 'benefits', 'requirements',
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
        if ($term === '') {
            return $q;
        }
        $like = '%' . $term . '%';
        return $q->where(fn ($w) => $w->where('title', 'like', $like)->orWhere('short_description', 'like', $like));
    }

    public function scopeCategory(Builder $q, ?string $category): Builder
    {
        $c = trim((string) $category);
        return $c === '' || strtolower($c) === 'all' ? $q : $q->where('category', $c);
    }

    public function scopeMetaFilters(Builder $q, array $meta): Builder
    {
        foreach ($meta as $k => $v) {
            if (empty($v) || strtolower($v) === 'all') {
                continue;
            }
            $q->whereJsonContains("metadata->{$k}", $v);
        }
        return $q;
    }

    public static function getFacets(string $q = '', string $category = 'all', array $meta = []): array
    {
        $baseQuery = self::query()
            ->search($q)
            ->category($category)
            ->metaFilters($meta);

        $categories = (clone $baseQuery)
            ->select('category')
            ->whereNotNull('category')
            ->where('category', '!=', '')
            ->distinct()
            ->pluck('category')
            ->sort()
            ->values()
            ->all();

        $metadataResults = (clone $baseQuery)
            ->select('metadata')
            ->limit(1000)
            ->get();

        $metaFacets = [];
        $metadataResults->pluck('metadata')->filter()->each(function ($meta) use (&$metaFacets) {
            if (is_array($meta)) {
                foreach ($meta as $key => $value) {
                    if (is_string($value) && !empty($value)) {
                        if (!isset($metaFacets[$key])) {
                            $metaFacets[$key] = [];
                        }
                        if (!in_array($value, $metaFacets[$key])) {
                            $metaFacets[$key][] = $value;
                        }
                    }
                }
            }
        });

        foreach ($metaFacets as $key => $values) {
            sort($metaFacets[$key]);
        }

        return compact('categories', 'metaFacets');
    }
}
