<?php

namespace App\Repositories\Post;

interface PostRepoInterface{
    
    public function getAll();
    
    public function find($id);
    
    public function create($data);
    
    public function update($data);
    
    public function delete($id);
    
    public function setIsHomePage($post, $is_homepage);
    
    public function insertTags($post, $tags, $isEdit);
}

