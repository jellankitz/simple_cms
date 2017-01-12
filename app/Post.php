<?php

namespace App;

use Illuminate\Database\Eloquent\Model;
use App\Comment;
use App\Tag;
use App\Category;
use App\User;

class Post extends Model {

    protected $fillable = [
        'user_id',
        'title',
        'slug',
        'content',
        'category_id',
        'created_at',
        'updated_at'
    ];

    public function user() {
        return $this->belongsTo(User::class);
    }

    public function comments() {
        return $this->hasMany(Comment::class);
    }

    public function tags() {
        return $this->hasMany(Tag::class, 'post_id');
    }

    public function category() {
        return $this->belongsTo(Category::class, 'category_id');
    }

}
