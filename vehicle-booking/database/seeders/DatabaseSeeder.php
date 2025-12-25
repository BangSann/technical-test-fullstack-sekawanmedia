<?php

namespace Database\Seeders;

use App\Models\drivers;
use App\Models\regions;
use App\Models\roles;
use App\Models\User;
// use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use App\Models\vehicles;
use Illuminate\Database\Seeder;

class DatabaseSeeder extends Seeder
{
    /**
     * Seed the application's database.
     */
    public function run(): void
    {
        $roles = [
            'Admin',
            'Approval',
            'Pegawai',
        ];

        foreach ($roles as $role) {
            roles::firstOrCreate([
                'name' => $role
            ]);
        }

        $regions = [
            'Jakarta',
            'Bandung',
            'Surabaya',
            'Yogyakarta',
        ];

        foreach ($regions as $region) {
            regions::firstOrCreate([
                'name' => $region
            ]);
        }

        $users = [
            [
                'name' => 'Admin',
                'email' => 'admin@gmail.com',
                'password' => 'admin12345',
                'role_id' => 1,
                'region_id' => 1,
            ],
            [
                'name' => 'Approval 1',
                'email' => 'approval_1@gmail.com',
                'password' => 'approval12345',
                'role_id' => 2,
                'region_id' => 1,
            ],
            [
                'name' => 'Approval 2',
                'email' => 'approval_2@gmail.com',
                'password' => 'approval12345',
                'role_id' => 2,
                'region_id' => 1,
            ],
            [
                'name' => 'Pegawai 1',
                'email' => 'pegawai_1@gmail.com',
                'password' => 'pegawai12345',
                'role_id' => 3,
                'region_id' => 1,
            ],
            [
                'name' => 'Pegawai 2',
                'email' => 'pegawai_2@gmail.com',
                'password' => 'pegawai12345',
                'role_id' => 3,
                'region_id' => 1,
            ],
            [
                'name' => 'Pegawai 3',
                'email' => 'pegawai_3@gmail.com',
                'password' => 'pegawai12345',
                'role_id' => 3,
                'region_id' => 1,
            ],
            [
                'name' => 'Pegawai 4',
                'email' => 'pegawai_4@gmail.com',
                'password' => 'pegawai12345',
                'role_id' => 3,
                'region_id' => 1,
            ],
        ];

        foreach ($users as $user) {
            User::firstOrCreate(
                ['email' => $user['email']],
                $user
            );
        }

         $vehicles = [
            [
                'plate_number' => 'B 1234 ABC',
                'type' => 'umum',
                'ownership' => 'milik',
                'region_id' => 1,
                'status' => 'Active',
            ],
            [
                'plate_number' => 'B 5678 DEF',
                'type' => 'umum',
                'ownership' => 'milik',
                'region_id' => 1,
                'status' => 'Active',
            ],
            [
                'plate_number' => 'B 9101 GHI',
                'type' => 'barang',
                'ownership' => 'sewa',
                'region_id' => 1,
                'status' => 'Active',
            ],
            [
                'plate_number' => 'B 1121 JKL',
                'type' => 'barang',
                'ownership' => 'milik',
                'region_id' => 1,
                'status' => 'Inactive',
            ],
        ];

        foreach ($vehicles as $vehicle) {
            vehicles::firstOrCreate(
                ['plate_number' => $vehicle['plate_number']],
                $vehicle
            );
        }

        $drivers = [
            [
                'name' => 'Ahmad Fauzi',
                'phone' => '081234567890',
                'status' => 'Active',
            ],
            [
                'name' => 'Budi Santoso',
                'phone' => '081298765432',
                'status' => 'Active',
            ],
            [
                'name' => 'Dedi Pratama',
                'phone' => '082112223333',
                'status' => 'Inactive',
            ],
            [
                'name' => 'Rizky Ramadhan',
                'phone' => '085677889900',
                'status' => 'Active',
            ],
        ];

        foreach ($drivers as $driver) {
            drivers::firstOrCreate(
                ['phone' => $driver['phone']],
                $driver
            );
        }
    }
}
