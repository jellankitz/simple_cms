<?php

/*
  |--------------------------------------------------------------------------
  | API Routes
  |--------------------------------------------------------------------------
  |
 */

Route::group(['prefix' => 'post'], function () {
    Route::get('/', 'PostController@index');
    Route::post('/add', 'PostController@store');
    Route::post('/delete/{id}', 'PostController@destroy');
});