<?php

namespace App\Repositories\User;

interface UserRepoInterface{
    
    public function getAll();
    
    public function find($id);
    
    public function create($data);
    
    public function update($data);
    
    public function delete($id);
    
}
