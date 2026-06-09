<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::create('bookings', function (Blueprint $table) {
            $table->string('id', 50)->primary();
            $table->string('type', 20); // 'consulting' or 'training'
            $table->string('name', 150);
            $table->string('email', 150);
            $table->string('phone', 30);
            $table->string('category', 100);
            $table->text('details')->nullable();
            $table->string('date', 20);
            $table->string('status', 20)->default('Pending'); // 'Pending', 'Approved', 'Completed'
            $table->string('created_at', 50);
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('bookings');
    }
};
