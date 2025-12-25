<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class VehicleUsage extends Model
{
    protected $table = 'vehicle_usage';
    protected $fillable = [
        'order_id',
        'vehicle_id',
        'driver_id',
        'start_km',
        'end_km',
    ];

    public $timestamps = false;

    public function order(){
        return $this->belongsTo(VehicleOrder::class);

    }
    public function vehicle()
    {
        return $this->belongsTo(vehicles::class);
    }

    public function driver()
    {
        return $this->belongsTo(drivers::class);
    }
}
