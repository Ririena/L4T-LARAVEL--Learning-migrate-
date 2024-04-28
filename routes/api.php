<?php

use App\Http\Controllers\MessageController;
use App\Http\Controllers\UserController;
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

Route::middleware('auth:sanctum')->get('/user', function (Request $request) {
    return $request->user();
});
Route::post("register", [UserController::class, "register"]);
Route::post("login", [UserController::class, "login"]);
Route::group([
    "middleware" => ["auth:api"]
], function(){


    Route::get("profile", [UserController::class, "profile"]);
    Route::get("logout", [UserController::class, "logout"]);
    Route::put("title", [UserController::class, "title"]);

    Route::get("getTitle", [UserController::class, "getTitle"]);
});

/*
* POST MESSAGE
*/
Route::post('/message/sendmessage', [MessageController::class, 'sendMessage']);
Route::post('/messages/send', [MessageController::class, 'sendMessage']);
Route::get('/messages/{message_id}', [MessageController::class, 'getOne']);


/*
*Get Message
*/
Route::get('/users/{userId}/received-messages', [MessageController::class, 'receivedMessages']);
Route::get('/getTitle', [MessageController::class, 'getTitle']);
Route::get('/getAllMessage', [MessageController::class, 'getAllMessage']);
