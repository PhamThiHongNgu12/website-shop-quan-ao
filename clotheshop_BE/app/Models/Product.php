<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Product extends Model
{
    use HasFactory;
    protected $table = 'products';
    protected $primaryKey = 'ProductID';
    public $timestamps = false;

    public function category()
    {
        return $this->belongsTo(Category::class,'CategoryID','CategoryID');
    }
    public function carts()
    {
        return $this->belongsToMany(Cart::class);
    }
    public function sizes()
    {
        return $this->belongsTo(Size::class);
    }
}