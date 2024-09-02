<?php

use App\Http\Controllers\TransactionController;
use App\Http\Controllers\TransactionTypeController;

Route::middleware('api')->group(function () {
    Route::apiResource('transactions', TransactionController::class);
});
Route::apiResource('transactions', TransactionController::class);
Route::apiResource('transaction-types', TransactionTypeController::class);