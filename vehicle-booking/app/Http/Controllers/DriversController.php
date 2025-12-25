<?php

namespace App\Http\Controllers;

use App\Models\Driver;
use App\Models\drivers;
use Illuminate\Http\Request;
use Inertia\Inertia;

class DriversController extends Controller
{

    public function index()
    {
        $drivers = drivers::all();

        return Inertia::render('drivers/drivers', [
            'drivers_data' => $drivers,
        ]);
    }

    public function create()
    {
        // return Inertia::render('Drivers/Create');
    }


    public function store(Request $request)
    {
        $validated = $request->validate([
            'name' => 'required|string|max:255',
            'phone' => 'required|string|max:20|unique:drivers,phone',
            'status' => 'required|in:Active,Inactive',
        ]);

        drivers::create($validated);

        return redirect()
            ->route('drivers.index')
            ->with('success', 'Driver created successfully');
    }

    public function show(string $id)
    {
        $driver = drivers::findOrFail($id);

        // return Inertia::render('Drivers/Show', [
        //     'driver' => $driver,
        // ]);
    }

    public function edit(string $id)
    {
        $driver = drivers::findOrFail($id);

        // return Inertia::render('Drivers/Edit', [
        //     'driver' => $driver,
        // ]);
    }

    public function update(Request $request, string $id)
    {
        $driver = drivers::findOrFail($id);

        $validated = $request->validate([
            'name' => 'required|string|max:255',
            'phone' => 'required|string|max:20|unique:drivers,phone,'.$driver->id,
            'status' => 'required|in:Active,Inactive',
        ]);

        $driver->update($validated);

        return redirect()
            ->route('drivers.index')
            ->with('success', 'Driver updated successfully');
    }

    public function destroy(string $id)
    {
        drivers::findOrFail($id)->delete();

        return redirect()
            ->route('drivers.index')
            ->with('success', 'Driver deleted successfully');
    }
}
