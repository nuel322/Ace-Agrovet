<?php

use App\Http\Controllers\BookingController;
use App\Http\Controllers\FormulationController;
use App\Http\Controllers\ChatController;
use App\Http\Controllers\AdminController;
use App\Http\Middleware\AdminAuthMiddleware;
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

// =================== PUBLIC ENDPOINTS ===================
Route::post('/bookings', [BookingController::class, 'store']);
Route::post('/formulations', [FormulationController::class, 'store']);
Route::post('/gemini/chat', [ChatController::class, 'chat']);

// =================== PROTECTED ADMINISTRATIVE ENDPOINTS ===================
Route::middleware([AdminAuthMiddleware::class])->group(function () {
    // Bookings Audit and Operational Controls
    Route::get('/bookings', [BookingController::class, 'index']);
    Route::patch('/bookings/{id}', [BookingController::class, 'update']);
    Route::delete('/bookings/{id}', [BookingController::class, 'destroy']);

    // Formulations Archive
    Route::get('/formulations', [FormulationController::class, 'index']);
    Route::delete('/formulations/{id}', [FormulationController::class, 'destroy']);

    // Database MySQL Dumping Tool
    Route::get('/admin/export-db', [AdminController::class, 'exportDB']);
});
