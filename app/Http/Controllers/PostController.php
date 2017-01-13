<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Post;
use App\Tag;
use Cartalyst\Sentinel\Native\Facades\Sentinel;
use App\Helpers\Helper;
use Illuminate\Support\Facades\Log;

class PostController extends Controller {

    private $post = null;

    public function __construct(Post $post) {
        $this->post = $post;
    }

    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index() {
        $posts = $this->post->with('category')
                ->with('tags')
                ->get();
        return $posts;
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function store(Request $request) {
        $data = $request->all();
        $user = Sentinel::getUser();

        $data['user_id'] = $user->id;
        $slug = Helper::getSlug($data['title'],$this->post);
        $data['slug'] = $slug;
        $data['category'] = isset($data['category']) ? $data['category'] : 1;
                
        try {
            $insert = $this->post->create($data);
            $newPost = $this->post
                    ->with('category')
                    ->with('tags')
                    ->where('id','=',$insert->id)
                    ->first();
            
            return response()->json(['success' => 1, 'new_post' => $newPost], 200);
        } catch (Exception $ex) {
            return response()->json(['success' => 0, 'message' => 'Something went wrong'], 500);
        }
    }

    /**
     * Display the specified resource.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function show($id) {
        //
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function update(Request $request, $id) {
        //
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function destroy($id) {
        try{
            $exist = $this->post->find($id);
            
            if(!$exist){
                return response()->json(['msg' => 'Post id not exisiting.'],400);
            }
            
            $exist->delete();
            
            return response()->json(['success' => 1, 'message' => 'Deleted post successfully!'], 200);
            
        } catch (Exception $ex) {
            return response()->json(['success' => 0, 'message' => 'Something went wrong'], 500);
        }
    }

}
