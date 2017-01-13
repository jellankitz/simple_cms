<?php

namespace App\Helpers;

use Illuminate\Support\Facades\Log;

class Helper{
    
    public static function getSlug($val, $model = null, $col = "title"){
        $val = strtolower($val);
        $slug = str_replace(" ", "-", $val);
        
        if($model != null){
            $count = $model->where($col,"=",$val)->count();
            
            if($count > 0){
                return $slug."-".($count + 1);
            }
            
            return $slug;
        }
        
        return $slug;
    }
}
