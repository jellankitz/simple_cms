<?php

namespace App\Http\Controllers\web;

use Illuminate\Http\Request;
use App\Http\Controllers\Controller;
use App\Repositories\Post\PostRepoInterface;

class HomeController extends Controller
{
    private $post;
    
    function __construct(PostRepoInterface $post) {
        $this->post = $post;
    }
    
    
    public function index(){
        //$content = view('pages.page');
        //return view($this->layout, compact($content));
        $home_post = $this->post->getHomePost();
        $content = $home_post->content;
        
        return view('pages.home',compact('content'));
    }
}
