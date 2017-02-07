<?php

namespace App;

use Illuminate\Database\Eloquent\Model;
use App\Post;

class Tag extends Model {
    
    protected $fillable = [
        'post_id','name', 'slug',
    ];
    
    public function post() {
        return $this->belongsTo(Post::class,'post_id');
    }

}
