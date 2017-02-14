<?php

/*
|--------------------------------------------------------------------------
| Web Routes
|--------------------------------------------------------------------------
|
| This file is where you may define all of the routes that are handled
| by your application. Just tell Laravel the URIs it should respond
| to using a Closure or controller method. Build something great!
|
*/
/*
Route::get('/', function () {
    return view('welcome');
});
*/

use Illuminate\Support\Facades\Storage;
use Faker\Provider\Image;

Route::get('/','web\HomeController@index');

Route::get('images/{filename}', function ($filename)
{   
    //Image
    //$img = Image::make(storage_path('app/public/'.$filename));
    //$storage = Storage::disk('public');
    if(!Storage::disk('public')->exists($filename)) return '404 not found';
    /*
    $file = Storage::disk('public')->get($filename);
    
    */
    $type = Storage::disk('public')->mimeType($filename);
    
    $response = response()->file(storage_path('app/public/'.$filename));
    
    return $response;
});

Route::get('/admin', function(){
    return File::get(public_path().'/admin/index.html');
});