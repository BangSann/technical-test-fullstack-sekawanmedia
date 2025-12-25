<?php

namespace App\Http\Controllers;

use App\Models\drivers;
use App\Models\LogActivity;
use App\Models\User;
use App\Models\VehicleOrder;
use App\Models\vehicles;
use Inertia\Inertia;

class DashboardController extends Controller
{
    public function index()
    {
        $vehicleOrders = VehicleOrder::selectRaw('
        MONTH(created_at) as month_number,
        MONTHNAME(created_at) as month,
        COUNT(*) as total_orders
    ')
            ->whereYear('created_at', 2025)
            ->groupByRaw('MONTH(created_at), MONTHNAME(created_at)')
            ->orderByRaw('MONTH(created_at)')
            ->get();
        $activities = LogActivity::orderBy('created_at', 'desc')->limit(5)->get();

        return Inertia::render('dashboard', [
            'log_activity' => $activities,
            'vehicles_order' => $vehicleOrders,
            'total_main_data' => [
                'total_vehicles' => vehicles::count(),
                'total_driver' => drivers::count(),
                'total_user' => User::count(),
            ]
        ]);
    }

    public function getLogActivity(){
        $logActivity = LogActivity::all();
        return Inertia::render('log-activity' ,[
            'logActivity_data' => $logActivity
        ]);
    }
}
