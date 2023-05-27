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
        Schema::create('cartdetails', function (Blueprint $table) {
            $table->id();
            $table->bigInteger('ProductID')->unsigned();
            $table->bigInteger('CartID')->unsigned();
            $table->bigInteger('Quantity')->unsigned();
            $table->float('Price')->unsigned();
            $table->timestamps();

            $table->foreign('ProductID')->references('ProductID')->on('products')

                ->onDelete('cascade')->onUpdate('cascade');

            $table->foreign('CartID')->references('CartID')->on('carts')

                ->onDelete('cascade')->onUpdate('cascade');
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('cartdetails');
    }
};