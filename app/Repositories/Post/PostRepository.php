<?php

namespace App\Repositories\Post;

use App\Repositories\Post\PostRepoInterface;
use App\Post;
use App\Category;
use App\Tag;
use Cartalyst\Sentinel\Native\Facades\Sentinel;
use App\Helpers\Helper;
use Illuminate\Support\Facades\Log;

class PostRepository implements PostRepoInterface {

    private $post;

    function __construct(Post $post) {
        $this->post = $post;
    }

    public function find($id) {
        $post = $this->post->with('category')
                ->with('tags')
                ->where('id', '=', $id)
                ->first();

        return $post;
    }

    public function getAll() {
        $posts = $this->post->with('category')
                ->with('tags')
                ->orderBy('is_homepage','desc')
                ->get();

        return $posts;
    }

    public function create($data) {
        $user = Sentinel::getUser();

        $data['user_id'] = $user->id;
        $slug = Helper::getSlug($data['title'], $this->post);
        $data['slug'] = $slug;
        $data['category'] = isset($data['category']) ? $data['category'] : 1;

        $insert = $this->post->create($data);

        if ($insert) {
            $this->insertTags($insert, $data['tags']);
            $this->setIsHomePage($insert, $data['is_homepage']);
            return $insert->id;
        } else {
            throw new Exception('Something went wrong while inserting new post.');
        }
    }

    public function update($data) {
        $id = $data['id'];
        $post = $this->post->find($id);

        if (!$post) {
            throw new Exception('Post id not exisiting.');
        }

        $update = $post->update($data);

        if ($update) {
            $this->insertTags($post, $data['tags'], true);
            $this->setIsHomePage($post, $data['is_homepage']);
            return $id;
        } else {
            throw new Exception('Something went wrong while updating post.');
        }
    }

    public function setIsHomePage($post, $is_homepage = false) {
        if ($is_homepage || $is_homepage == 1) {
            $this->post
                    ->where('is_homepage', '=', 1)
                    ->where('id','!=',$post->id)
                    ->update(['is_homepage' => 0]);
        }
    }

    public function insertTags($post, $tags, $isEdit = false) {
        if (is_array($tags) && count($tags) > 0) {

            if ($isEdit) {
                $post->tags()->delete();
            }

            $tag_model = new Tag();
            $tag_array = [];
            foreach ($tags as $tag) {
                $tag_slug = Helper::getSlug($tag, $tag_model, "name");
                $tag_array[] = new Tag([
                    'name' => $tag,
                    'slug' => $tag_slug
                ]);
            }

            $post->tags()->saveMany($tag_array);
        }
    }

    public function delete($id) {
        $exist = $this->post->find($id);

        if (!$exist) {
            throw new Exception('Post id not exisiting.');
        }

        return $exist->delete();
    }

}
