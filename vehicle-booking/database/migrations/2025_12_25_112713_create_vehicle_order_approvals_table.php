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
        Schema::create('vehicle_order_approvals', function (Blueprint $table) {
            $table->id();
            $table->integer('order_id');
            $table->integer('approver_id');
            $table->integer('level');
            $table->string('status');
            $table->string('note')->nullable();
            $table->date('approved_at')->nullable();
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('vehicle_order_approvals');
    }
};
