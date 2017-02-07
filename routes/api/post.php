<?php

/*
  |--------------------------------------------------------------------------
  | API Routes
  |--------------------------------------------------------------------------
  |
 */

Route::group(['middleware' => ['jwt.auth'], 'prefix' => 'post'], function () {
    Route::get('/', 'Api\PostController@index');
    Route::post('/add', 'Api\PostController@store');
    Route::post('/edit', 'Api\PostController@update');
    Route::post('/delete/{id}', 'Api\PostController@destroy');
});