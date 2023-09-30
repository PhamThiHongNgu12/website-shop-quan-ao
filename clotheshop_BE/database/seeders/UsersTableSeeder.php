<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;

class UsersTableSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        DB::table('users')->insert([
            'name' => 'Dat',
            'email' => 'raylouis251@gmail.com',
            'username' => 'raylouis251',
            'password' => bcrypt('123456'),
            'phone' => '00124124',
            'Role' => 1,
            'created_at' => now()
        ]);
    }
}