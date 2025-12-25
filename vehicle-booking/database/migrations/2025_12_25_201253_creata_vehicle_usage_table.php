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
        Schema::create('vehicle_usage', function (Blueprint $table) {
            $table->id();
            $table->integer('order_id');
            $table->integer('vehicle_id');
            $table->integer('driver_id');
            $table->integer('start_km');
            $table->integer('end_km');
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('vehicle_usage');
    }
};
