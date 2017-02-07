<?php

/*
  |--------------------------------------------------------------------------
  | API Routes
  |--------------------------------------------------------------------------
  |
 */

Route::group(['middleware' => ['jwt.auth'], 'prefix' => 'category'], function () {
    Route::get('/', 'Api\CategoryController@index');
});
