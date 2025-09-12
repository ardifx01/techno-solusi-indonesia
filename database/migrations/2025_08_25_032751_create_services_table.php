<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration {
    public function up(): void
    {
        Schema::create('services', function (Blueprint $t) {
            $t->id();
            $t->string('external_id')->nullable()->index();
            $t->longText('title');
            $t->string('slug', 191)->unique();
            $t->string('category')->nullable()->index();
            $t->longText('description')->nullable();
            $t->text('short_description')->nullable();
            $t->string('jangka_waktu')->nullable();
            $t->string('duration_information')->nullable();
            $t->string('cta_text')->nullable();
            $t->string('cta_url')->nullable();
            $t->boolean('featured')->default(false);
            $t->json('metadata')->nullable();
            $t->json('benefits')->nullable();
            $t->json('requirements')->nullable();
            $t->timestamps();
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('services');
    }
};
