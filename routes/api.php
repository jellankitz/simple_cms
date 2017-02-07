<?php

use Illuminate\Http\Request;

/*
  |--------------------------------------------------------------------------
  | API Routes
  |--------------------------------------------------------------------------
  |
  | Here is where you can register API routes for your application. These
  | routes are loaded by the RouteServiceProvider within a group which
  | is assigned the "api" middleware group. Enjoy building your API!
  |
 */

Route::group(['prefix' => 'authenticate'], function () {
    Route::post('/', 'Auth\AuthenticateController@authenticate');
    Route::get('/user', 'Auth\AuthenticateController@getAuthenticatedUser');
});

Route::group(['prefix' => 'nav'], function () {
    Route::get('/', 'Api\NavigationController@index');
});



