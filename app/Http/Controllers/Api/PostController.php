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
    public function store(StorePost $request) {
        $data = $request->all();
        $user = Sentinel::getUser();

        $data['user_id'] = $user->id;
        $slug = Helper::getSlug($data['title'], $this->post);
        $data['slug'] = $slug;
        $data['category'] = isset($data['category']) ? $data['category'] : 1;

        try {
            $insert = $this->post->create($data);

            if ($insert) {
                return response()->json([
                            'success' => 1,
                            'message' => 'Added post successfully!',
                            'new_post' => $this->show($insert->id),
                            'data' => $this->index()
                                ], 200);
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
        $post = $this->post->with('category')
                ->with('tags')
                ->where('id', '=', $id)
                ->first();
        return $post;
    }

    public function update(StorePost $request) {
        $data = $request->all();
        $id = $data['id'];

        try {
            $exist = $this->post->find($id);

            if (!$exist) {
                return response()->json(['success' => 0, 'message' => 'Post id not exisiting.'], 400);
            }

            $update = $this->post->find($id)->update($data);

            if ($update) {
                return response()->json(['success' => 1, 'message' => 'Updated post successfully!', 'data' => $this->index()], 200);
            }

            return response()->json(['success' => 0, 'message' => 'Update failed!'], 400);
        } catch (Exception $ex) {
            return response()->json(['success' => 0, 'message' => 'Something went wrong'], 500);
        }
    }

    public function destroy($id) {
        try {
            $exist = $this->post->find($id);

            if (!$exist) {
                return response()->json(['success' => 0, 'message' => 'Post id not exisiting.'], 400);
            }

            $exist->delete();

            return response()->json(['success' => 1, 'message' => 'Deleted post successfully!'], 200);
        } catch (Exception $ex) {
            return response()->json(['success' => 0, 'message' => 'Something went wrong'], 500);
        }
    }

}
