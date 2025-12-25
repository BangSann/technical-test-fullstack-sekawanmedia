<?php

use App\Http\Controllers\DashboardController;
use App\Http\Controllers\DriversController;
use App\Http\Controllers\UsersController;
use App\Http\Controllers\VehicleOrderApprovalController;
use App\Http\Controllers\VehicleOrderController;
use App\Http\Controllers\VehiclesController;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;
use Laravel\Fortify\Features;

Route::get('/', function () {
    return Inertia::render('welcome', [
        'canRegister' => Features::enabled(Features::registration()),
    ]);
})->name('home');

Route::prefix('dashboard')->middleware(['auth', 'verified'])->group(function () {
    Route::get('/', [DashboardController::class , 'index'])->name('dashboard');
    Route::get('/log-activity', [DashboardController::class , 'getLogActivity']);

    Route::resource('users',UsersController::class);
    Route::resource('drivers',DriversController::class);
    Route::resource('vehicles',VehiclesController::class);
    Route::resource('vehicle-order',VehicleOrderController::class);
    Route::resource('vehicle-order-approval',VehicleOrderApprovalController::class);
    
    // special routes
    Route::post('/vehicle-order/confirmation/{id}/' , [VehicleOrderController::class , 'confirmationVehicleOrder']);

    Route::get('/vehicle-order/complete/view' , [VehicleOrderController::class , 'completeVehicleOrderView']);
    Route::post('/vehicle-order/complete' , [VehicleOrderController::class , 'completeVehicleOrder']);

    Route::post('/vehicle-order-approval/{id}/approve',[VehicleOrderApprovalController::class , 'Approve']);
    Route::post('/vehicle-order-approval/{id}/rejecting',[VehicleOrderApprovalController::class , 'rejected']);
});

require __DIR__.'/settings.php';
