<?php

namespace App\Http\Controllers;

use App\Models\LogActivity;
use App\Models\VehicleOrderApproval;
use Carbon\Carbon;
use Illuminate\Support\Facades\Auth;
use Inertia\Inertia;

class VehicleOrderApprovalController extends Controller
{
    public function index()
    {
        $userId = Auth::id();

        $order_data = VehicleOrderApproval::with(['order.user', 'order.vehicle', 'order.driver'])
            ->where('approver_id', $userId)
            ->where(function ($query) {
                $query
                    ->where('level', 1)

                    ->orWhere(function ($q) {
                        $q->where('level', 2)
                            ->whereHas('order.approvals', function ($sub) {
                                $sub->where('level', 1)
                                    ->where('status', 'approved');
                            });
                    });
            })
            ->orderBy('level')
            ->get();

        return Inertia::render('order_approvals/order_approvals', [
            'approvals_data' => $order_data,
        ]);
    }

    public function Approve(string $id)
    {
        $approval = VehicleOrderApproval::with(['order', 'approver'])->findOrFail($id);
        $approval->update([
            'status' => 'approved',
            'approved_at' => Carbon::now(),
            'note' => 'telah saya approve',
        ]);

        if ($approval->level == 2) {
            $approval->order->update([
                'status' => 'approved',
            ]);
        }

        LogActivity::create([
            'activity' => 'user {'.Auth::id().'} menyetujui order data {'.$id."}"
        ]);

        return redirect()->back()->with('success', 'Successfully approved booking');
    }

    public function rejected(string $id)
    {
        $approval = VehicleOrderApproval::with(['order', 'approver'])->findOrFail($id);
        $approval->update([
            'status' => 'rejected',
            'approved_at' => Carbon::now(),
            'note' => 'telah saya reject',
        ]);

        $approval->order->update([
            'status' => 'rejected',
        ]);

        LogActivity::create([
            'activity' => 'user {'.Auth::id().'} menolak order data {'.$id."}"
        ]);

        return redirect()->back()->with('success', 'Successfully reject booking');
    }
}
