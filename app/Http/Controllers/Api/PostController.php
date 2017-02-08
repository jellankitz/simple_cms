<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Http\Requests\StorePost;
use App\Post;
use App\Tag;
use Cartalyst\Sentinel\Native\Facades\Sentinel;
use App\Helpers\Helper;
use Illuminate\Support\Facades\Log;
use App\Repositories\Post\PostRepoInterface;

class PostController extends Controller {

    private $post = null;

    public function __construct(PostRepoInterface $post) {
        $this->post = $post;
    }

    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index() {
        $posts = $this->post->getAll();
        return response()->json($posts);
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function store(StorePost $request) {
        $data = $request->all();
        
        try {
            $new_post = $this->post->create($data);
            
            if($new_post){
                return response()->json(['success' => 1, 'message' => 'Added new post successfully!'], 200);
            }
            return response()->json(['success' => 0, 'message' => 'Failed to add post!'], 400);
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
        $post = $this->post->find($id);
        return $post;
    }

    public function update(StorePost $request) {
        $data = $request->all();

        try {
            $update = $this->post->update($data);

            if ($update) {
                return response()->json(['success' => 1, 'message' => 'Updated post successfully!'], 200);
            }

            return response()->json(['success' => 0, 'message' => 'Update failed!'], 400);
        } catch (Exception $ex) {
            return response()->json(['success' => 0, 'message' => 'Something went wrong'], 500);
        }
    }

    public function destroy($id) {
        try {
            $this->post->delete($id);

            return response()->json(['success' => 1, 'message' => 'Deleted post successfully!'], 200);
        } catch (Exception $ex) {
            return response()->json(['success' => 0, 'message' => 'Something went wrong'], 500);
        }
    }

}
