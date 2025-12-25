<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Factories\HasFactory;

class VehicleOrderApproval extends Model
{
    use HasFactory;

    protected $table ="vehicle_order_approvals";
    protected $fillable = [
        'order_id',
        'approver_id',
        'level',
        'status',
        'note',
        'approved_at',
    ];

    protected $casts = [
        'approved_at' => 'datetime',
    ];

    /**
     * Relasi ke VehicleOrder
     */
    public function order()
    {
        return $this->belongsTo(VehicleOrder::class, 'order_id');
    }

    /**
     * User yang melakukan approval
     */
    public function approver()
    {
        return $this->belongsTo(User::class, 'approver_id');
    }
}
