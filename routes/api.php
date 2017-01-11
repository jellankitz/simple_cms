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
    Route::post('/', 'AuthenticateController@authenticate');
    Route::get('/user', 'AuthenticateController@getAuthenticatedUser');
});

Route::group(['prefix' => 'nav'], function () {
    Route::get('/', 'NavigationController@index');
});

Route::group(['prefix' => 'user'], function () {
    Route::get('/', 'UserController@index');
});

Route::group(['prefix' => 'post'], function () {
    Route::get('/', 'PostController@index');
});

Route::group(['prefix' => 'category'], function () {
    Route::get('/', 'CategoryController@index');
});

Route::group(['prefix' => 'tag'], function () {
    Route::get('/', 'TagController@index');
});
