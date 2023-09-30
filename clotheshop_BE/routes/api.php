<?php

use App\Http\Controllers\CategoryController;
use App\Http\Controllers\GetPagingController;
use App\Http\Controllers\MemberController;
use App\Http\Controllers\ProductController;
use App\Http\Controllers\UsersController;
use Illuminate\Foundation\Console\RouteListCommand;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider and all of them will
| be assigned to the "api" middleware group. Make something great!
|
*/
//Category Route
Route::get('categories/{id?}', [CategoryController::class, 'index']);
Route::get('products/get-paging', [GetPagingController::class, 'getPaging']);
Route::get('products/{id?}', [ProductController::class, 'index']);
Route::get('products/get-by-category/{id}', [ProductController::class, 'getByCategory']);





//User Route
Route::get('users/{id?}', [UsersController::class, 'index']);
Route::post('users/register', [UsersController::class, 'register']);
Route::put('users/{id}', [UsersController::class, 'update']);
Route::delete('users/{id}', [UsersController::class, 'delete']);



//Login Route
Route::get('login', function () {
    $response = ['errorCode' => 401, 'message' => 'Unauthenticated'];
    return response()->json($response, 401);
})->name('login');
Route::post('/login', [UsersController::class, 'login']);
Route::group(['middleware' => 'auth:api'], function () {

    //Auth Category Route
    Route::post('categories', [CategoryController::class, 'create']);
    Route::put('categories/{id}', [CategoryController::class, 'update']);
    Route::delete('categories/{id}', [CategoryController::class, 'delete']);

    //Auth Product Route
    //Product Route
    
    Route::post('products', [ProductController::class, 'create']);
    Route::post('products/update/{id}', [ProductController::class, 'update']);
    Route::delete('products/{id}', [ProductController::class, 'delete']);

});


Route::middleware('auth:sanctum')->get('/user', function (Request $request) {
    return $request->user();
});

Route::post('members/register', [MemberController::class, 'register']);
Route::post('members/login', [MemberController::class, 'login']);
Route::group(['prefix' => 'members', 'middleware' => 'auth:sanctum'], function () {
    Route::get('/profile', [MemberController::class, 'profile']);
});