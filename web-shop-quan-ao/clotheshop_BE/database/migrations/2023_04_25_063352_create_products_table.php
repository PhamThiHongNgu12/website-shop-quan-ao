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
        Schema::create('products', function (Blueprint $table) {
            $table->bigIncrements('ProductID');
            $table->bigInteger('CategoryID')->unsigned();
            $table->string('Size', 10);
            $table->string('ProductName', 100);
            $table->bigInteger('Quantity')->unsigned();
            $table->float('Price');
            $table->string('Color', 10);
            $table->string('Image')->default("default.jpg");

            $table->timestamps();

            $table->foreign('CategoryID')->references('CategoryID')->on('categories')

                ->onDelete('cascade')->onUpdate('cascade');

        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('products');
    }
};