<?php

use Illuminate\Database\Seeder;

class NavigationsTableSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        DB::table('navigations')->truncate();
        
        $navs = array(
            [
                "name" => "Dashboard",
                "link" => "dashboard",
                "icon" => "fa-dashboard",
                "visible" => 1
            ],
            [
                "name" => "Posts",
                "link" => "post",
                "icon" => "",
                "visible" => 1
            ],
            [
                "name" => "Categories",
                "link" => "category",
                "icon" => "",
                "visible" => 1
            ],
            [
                "name" => "Tags",
                "link" => "tag",
                "icon" => "",
                "visible" => 1
            ]
        );
        
        DB::table('navigations')->insert($navs);
    }
}
