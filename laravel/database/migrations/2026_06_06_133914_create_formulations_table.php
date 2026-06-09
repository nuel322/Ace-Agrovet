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
        Schema::create('formulations', function (Blueprint $table) {
            $table->string('id', 50)->primary();
            $table->string('name', 200);
            $table->decimal('target_cp', 5, 2);
            $table->string('ingredient1_name', 150);
            $table->decimal('ingredient1_cp', 5, 2);
            $table->decimal('ingredient1_parts', 10, 4);
            $table->decimal('ingredient1_percent', 5, 2);
            $table->string('ingredient2_name', 150);
            $table->decimal('ingredient2_cp', 5, 2);
            $table->decimal('ingredient2_parts', 10, 4);
            $table->decimal('ingredient2_percent', 5, 2);
            $table->string('created_at', 50);
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('formulations');
    }
};
