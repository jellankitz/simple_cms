<?php

namespace App\Helpers;

class Helper{
    
    public static function getSlug($val){
        $val = strtolower($val);
        
        return str_replace(" ", "-", $val);
    }
}
