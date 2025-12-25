<?php

namespace App\Http\Controllers;

use App\Models\drivers;
use App\Models\LogActivity;
use App\Models\User;
use App\Models\VehicleOrder;
use App\Models\VehicleOrderApproval;
use App\Models\vehicles;
use App\Models\VehicleUsage;
use Carbon\Carbon;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\DB;
use Inertia\Inertia;

class VehicleOrderController extends Controller
{
    public function index()
    {
        $orders = VehicleOrder::with([
            'user',
            'vehicle',
            'driver',
            'approvals.approver',
        ])->get();

        return Inertia::render('vehicle_order/vehicle_orders', [
            'vehicle_orders' => $orders,
        ]);
    }

    public function create()
    {
        return Inertia::render('vehicle_order/add_order', [
            'users' => User::all(),
            'vehicles' => vehicles::where('status', 'tersedia')->get(),
            'drivers' => drivers::where('status', 'Active')->get(),
        ]);
    }

    public function store(Request $request)
    {
        $validated = $request->validate([
            'vehicle_id' => 'required|exists:vehicles,id',
            'user_id' => 'required|exists:users,id',
            'approval_id_lvl1' => 'required|exists:users,id',
            'approval_id_lvl2' => 'required|exists:users,id',
            'driver_id' => 'required|exists:drivers,id',
            'purpose' => 'required|string|max:255',
        ]);

        DB::transaction(function () use ($validated) {

            $order = VehicleOrder::create([
                'user_id' => $validated['user_id'],
                'vehicle_id' => $validated['vehicle_id'],
                'driver_id' => $validated['driver_id'],
                'purpose' => $validated['purpose'],
                'status' => 'pending',
            ]);

            VehicleOrderApproval::create([
                'order_id' => $order->id,
                'approver_id' => $validated['approval_id_lvl1'],
                'level' => 1,
                'status' => 'pending',
                'node' => '',
            ]);

            VehicleOrderApproval::create([
                'order_id' => $order->id,
                'approver_id' => $validated['approval_id_lvl2'],
                'level' => 2,
                'status' => 'pending',
            ]);
        });

        LogActivity::create([
            'activity' => 'user {'.Auth::id().'} membuat data pemesanan'
        ]);

        return redirect()
            ->back()
            ->with('success', 'Vehicle order submitted and approval created successfully');
    }

    public function edit(string $id)
    {
        $order = VehicleOrder::with('approvals')->findOrFail($id);

        return Inertia::render('vehicle_order/edit_order', [
            'order' => $order,

            'approval_lvl1' => $order->approvals->firstWhere('level', 1),
            'approval_lvl2' => $order->approvals->firstWhere('level', 2),

            'users' => User::all(),
            'vehicles' => vehicles::all(),
            'drivers' => drivers::all(),
        ]);
    }

    public function update(Request $request, string $id)
    {
        $order = VehicleOrder::findOrFail($id);

        $validated = $request->validate([
            'vehicle_id' => 'required|exists:vehicles,id',
            'user_id' => 'required|exists:users,id',
            'approval_id_lvl1' => 'required|exists:users,id',
            'approval_id_lvl2' => 'required|exists:users,id|different:approval_id_lvl1',
            'driver_id' => 'required|exists:drivers,id',
            'purpose' => 'required|string|max:255',
        ]);

        DB::transaction(function () use ($order, $validated) {

            $order->update([
                'user_id' => $validated['user_id'],
                'vehicle_id' => $validated['vehicle_id'],
                'driver_id' => $validated['driver_id'],
                'purpose' => $validated['purpose'],
            ]);

            VehicleOrderApproval::updateOrCreate(
                [
                    'order_id' => $order->id,
                    'level' => 1,
                ],
                [
                    'approver_id' => $validated['approval_id_lvl1'],
                    'status' => 'pending',
                    'note' => null,
                    'approved_at' => null,
                ]
            );

            VehicleOrderApproval::updateOrCreate(
                [
                    'order_id' => $order->id,
                    'level' => 2,
                ],
                [
                    'approver_id' => $validated['approval_id_lvl2'],
                    'status' => 'pending',
                    'note' => null,
                    'approved_at' => null,
                ]
            );

            LogActivity::create([
                'activity' => 'user {'.Auth::id().'} mengupdate order data {'.$order->id."}"
            ]);
        });


        return redirect()
            ->back()
            ->with('success', 'Vehicle order updated successfully');
    }

    public function destroy(string $id)
    {
        VehicleOrder::findOrFail($id)->delete();
        VehicleOrderApproval::where('order_id', $id)->delete();

        LogActivity::create([
            'activity' => 'user {'.Auth::id().'} menghapus order data {'.$id."}"
        ]);

        return redirect()
            ->back()
            ->with('success', 'Vehicle order deleted successfully');
    }

    public function confirmationVehicleOrder(string $id)
    {
        $order = VehicleOrder::with(['vehicle', 'driver'])->findOrFail($id);

        if ($order->status !== 'approved') {
            return redirect()->back()->withErrors('Order has not been approved yet');
        }

        DB::transaction(function () use ($order) {

            $order->update([
                'start_date' => Carbon::now(),
            ]);

            $order->vehicle->update([
                'status' => 'digunakan',
            ]);

        });

        LogActivity::create([
            'activity' => 'user {'.Auth::id().'} mengkonfirmasi order data {'.$id."}"
        ]);

        return redirect()
            ->back()
            ->with('success', 'Vehicle order confirmed successfully');

    }

    public function completeVehicleOrderView(Request $request)
    {
        $id = $request->query('order_id');

        $order = VehicleOrder::with(['vehicle', 'driver', 'user'])
            ->where('id', $id)
            ->where('status', 'approved')
            ->firstOrFail();

        return Inertia::render('vehicle_order/complete_order', [
            'vehicle_order' => $order,
        ]);
    }

    public function completeVehicleOrder(Request $request)
    {
        $request->validate([
            'order_id' => 'required',
            'start_km' => 'required|integer|min:0',
            'end_km' => 'required|integer|gt:start_km',
        ]);

        DB::transaction(function () use ($request) {

            $order = VehicleOrder::with('vehicle')
                ->where('id', $request->order_id)
                ->lockForUpdate()
                ->firstOrFail();

            VehicleUsage::create([
                'order_id' => $order->id,
                'vehicle_id' => $order->vehicle_id,
                'driver_id' => $order->driver_id,
                'start_km' => $request->start_km,
                'end_km' => $request->end_km,
            ]);

            $order->update([
                'end_date' => Carbon::now()
            ]);

            $order->vehicle->update([
                'status' => 'tersedia',
            ]);

            $order->update([
                'status' => 'completed',
            ]);

            LogActivity::create([
                'activity' => 'user {'.Auth::id().'} menyelesaikan order data {'.$order->id."}"
            ]);
        });


        return redirect()->to('/dashboard/vehicle-order')
            ->with('success', 'Pemesanan kendaraan berhasil diselesaikan.');
    }
}
