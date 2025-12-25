<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class regions extends Model
{
    protected $table = 'regions';

    protected $fillable = [
        'name',
    ];

    public $timestamps = false;

    public function User()
    {
        return $this->hasMany(User::class, 'region_id');
    }
    public function Vehicle()
    {
        return $this->hasMany(User::class, 'region_id');
    }
}
