<?php

Route::group(['middleware' => ['jwt.auth'], 'prefix' => 'user'], function () {
    Route::get('/', 'Api\UserController@index');
});
