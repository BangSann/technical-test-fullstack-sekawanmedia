<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class LogActivity extends Model
{
    protected $table = 'log_activity';

    protected $fillable = [
        'activity',
    ];

    public $timestamps = true;
}
