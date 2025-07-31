<?php

use App\Http\Controllers\AuthController;
use App\Http\Controllers\CategoryController;
use App\Http\Controllers\TodoController;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\NotificationController;

Route::group([
    'middleware' => 'api',
    'prefix' => 'auth'
], function ($router) {
    Route::post('register', [AuthController::class, 'register']);
    Route::post('login', [AuthController::class, 'login']);
    Route::post('/refresh', [AuthController::class, 'refresh']);
});


Route::middleware('jwt')->prefix('auth')->group(function () {
    Route::get('/user', [AuthController::class, 'me']);
    Route::post('/logout', [AuthController::class, 'logout']);
});


Route::middleware('jwt')->group(function () {
    // categories routes
    Route::apiResource('categories', CategoryController::class)->except([
        'show'
    ]);

    // Todo routes
    Route::apiResource('todos', TodoController::class)->except(['index', 'show']);
    Route::get('/categories/{category}/todos', [TodoController::class, 'index']);


    Route::get('notifications/unread-count', [NotificationController::class, 'unreadCount']);
    Route::get('notifications', [NotificationController::class, 'index']);
});
