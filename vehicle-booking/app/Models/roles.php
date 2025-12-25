<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class roles extends Model
{
    protected $table = 'roles';

    protected $fillable = [
        'name',
    ];

    public $timestamps = false;

    public function User()
    {
       return $this->hasMany(User::class, 'role_id');
    }
}
