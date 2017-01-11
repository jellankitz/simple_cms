<?php

use Illuminate\Database\Seeder;

class PostsTableSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        DB::table('posts')->truncate();
        
        $posts = [
            "user_id" => 1,
            "title" => "Hello World",
            "slug" => "hello-world",
            "content" => "<h2>Hello World!</h2>",
            "category_id" => 1
        ];
        
        DB::table('posts')->insert($posts);
    }
}
