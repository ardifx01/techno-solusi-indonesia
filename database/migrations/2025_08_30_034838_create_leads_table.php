<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration {
    public function up(): void {
        Schema::create('leads', function (Blueprint $t) {
            $t->id();
            $t->foreignId('service_id')->nullable()->constrained()->nullOnDelete();
            $t->string('service_slug')->nullable();
            $t->string('service_title')->nullable();

            $t->string('name');
            $t->string('email')->nullable();
            $t->string('phone')->nullable();
            $t->string('company')->nullable();
            $t->text('message')->nullable();

            $t->string('channel')->default('web'); // web/form
            $t->string('ip')->nullable();
            $t->string('user_agent')->nullable();
            $t->timestamps();
        });
    }
    public function down(): void { Schema::dropIfExists('leads'); }
};
