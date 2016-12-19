<?php

use Illuminate\Database\Seeder;
use Cartalyst\Sentinel\Laravel\Facades\Sentinel;

class UsersAndRolesTableSeeder extends Seeder {

    public function run() {
        DB::table('users')->truncate();
        DB::table('roles')->truncate();
        DB::table('role_users')->truncate();
        
        $role = [
            'name' => 'Administrator',
            'slug' => 'administrator',
            'permissions' => [
                'admin' => true,
            ]
        ];
        
        $adminRole = Sentinel::getRoleRepository()->createModel()->fill($role)->save();
        
        $clientsRole = [
            'name' => 'Clients',
            'slug' => 'clients',
        ];
        Sentinel::getRoleRepository()->createModel()->fill($clientsRole)->save();
        
        $subClientsRole = [
            'name' => 'SubClients',
            'slug' => 'subclients',
        ];
        Sentinel::getRoleRepository()->createModel()->fill($subClientsRole)->save();
        
        $admin = [
            'first_name' => 'Admin',
            'last_name' => 'Admin',
            'email' => 'admin@example.com',
            'password' => 'password',
        ];
        
        $users = array(
                ['first_name' => 'Ryan', 'last_name' => 'Chenkie', 'email' => 'ryanchenkie@gmail.com', 'password' => 'secret'],
                ['first_name' => 'Chris','last_name' => 'Sevilleja', 'email' => 'chris@scotch.io', 'password' => 'secret'],
                ['first_name' => 'Holly','last_name' => 'Lloyd', 'email' => 'holly@scotch.io', 'password' => 'secret'],
                ['first_name' => 'Adnan','last_name' => 'Kukic', 'email' => 'adnan@scotch.io', 'password' => 'secret'],
        );
        
        $adminUser = Sentinel::registerAndActivate($admin);
        $adminUser->roles()->attach($adminRole);
        
        foreach ($users as $user) {
            Sentinel::registerAndActivate($user);
        }
    }

}
