<?php

use Illuminate\Database\Seeder;

class CategoriesTableSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        DB::table('categories')->truncate();
        
        $categories = [
            "name" => "article",
            "slug" => "article"
        ];
        
        DB::table('categories')->insert($categories);
    }
}
