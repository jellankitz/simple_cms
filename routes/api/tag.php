<?php

Route::group(['middleware' => ['jwt.auth'], 'prefix' => 'tag'], function () {
    Route::get('/', 'Api\TagController@index');
});