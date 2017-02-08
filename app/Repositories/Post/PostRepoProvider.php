<?php

namespace App\Repositories\Post;

use Illuminate\Support\ServiceProvider;
use App\Repositories\Post\PostRepoInterface;
use App\Repositories\Post\PostRepository;

class PostRepoProvider extends ServiceProvider{
    
    public function boot(){}
    
    public function register(){
        $this->app->bind(PostRepoInterface::class, PostRepository::class);
    }
    
}