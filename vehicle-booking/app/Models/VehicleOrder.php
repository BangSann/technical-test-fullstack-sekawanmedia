<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class VehicleOrder extends Model
{
    use HasFactory;

    protected $table = 'vehicle_order';

    protected $fillable = [
        'user_id',
        'vehicle_id',
        'driver_id',
        'purpose',
        'start_date',
        'end_date',
        'status',
    ];

    public function user()
    {
        return $this->belongsTo(User::class);
    }

    public function vehicle()
    {
        return $this->belongsTo(vehicles::class);
    }

    public function driver()
    {
        return $this->belongsTo(drivers::class);
    }

    public function approvals()
    {
        return $this->hasMany(VehicleOrderApproval::class, 'order_id');
    }

    // public function usage()
    // {
    //     return $this->hasOne(VehicleUsage::class, 'order_id');
    // }
}
