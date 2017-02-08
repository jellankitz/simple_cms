<?php

namespace App\Repositories\Post;

use App\Repositories\Post\PostRepoInterface;
use App\Post;
use App\Category;
use App\Tag;
use Cartalyst\Sentinel\Native\Facades\Sentinel;
use App\Helpers\Helper;

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
            return $insert->id;
        } else {
            throw new Exception('Something went wrong while inserting new post.');
        }
    }
    
    public function update($data) {
        $id = $data['id'];
        $exist = $this->post->find($id);

        if (!$exist) {
            throw new Exception('Post id not exisiting.');
        }

        $update = $exist->update($data);

        if ($update) {
            $this->insertTags($exist, $data['tags'], true);
            return $id;
        }else{
            throw new Exception('Something went wrong while updating post.');
        }
    }

    public function insertTags($post, $tags, $isEdit = false) {
        if (is_array($tags) && count($tags) > 0) {
            
            if($isEdit){
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
