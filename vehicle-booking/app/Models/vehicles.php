<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class vehicles extends Model
{
    protected $table = 'vehicles';

    protected $fillable = [
        'plate_number',
        'type',
        'ownership',
        'region_id',
        'status',
    ];

    public $timestamps = false;

    public function Region(){
       return $this->belongsTo(roles::class , 'region_id');
    }
}
