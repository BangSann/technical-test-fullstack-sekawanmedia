<?php

namespace App\Http\Controllers;

use App\Models\Vehicle;
use App\Models\Region;
use App\Models\regions;
use App\Models\vehicles;
use Illuminate\Http\Request;
use Inertia\Inertia;

class VehiclesController extends Controller
{
    public function index()
    {
        $vehicles = vehicles::with('region')->get();

        return Inertia::render('vehicles/vehicles', [
            'vehicles_data' => $vehicles,
        ]);
    }

    public function create()
    {
        // return Inertia::render('Vehicles/Create', [
        //     'regions' => regions::all(),
        // ]);
    }

    public function store(Request $request)
    {
        $validated = $request->validate([
            'plate_number' => 'required|string|max:20|unique:vehicles,plate_number',
            'type' => 'required|string|max:50',
            'ownership' => 'required|string|max:50',
            'region_id' => 'required|exists:regions,id',
            'status' => 'required|in:Active,Inactive',
        ]);

        vehicles::create($validated);

        return redirect()
            ->route('vehicles.index')
            ->with('success', 'Vehicle created successfully');
    }

    public function show(string $id)
    {
        $vehicle = vehicles::with('region')->findOrFail($id);

        // return Inertia::render('Vehicles/Show', [
        //     'vehicle' => $vehicle,
        // ]);
    }

    public function edit(string $id)
    {
        // return Inertia::render('Vehicles/Edit', [
        //     'vehicle' => vehicles::findOrFail($id),
        //     'regions' => regions::all(),
        // ]);
    }

    public function update(Request $request, string $id)
    {
        $vehicle = vehicles::findOrFail($id);

        $validated = $request->validate([
            'plate_number' => 'required|string|max:20|unique:vehicles,plate_number,' . $vehicle->id,
            'type' => 'required|string|max:50',
            'ownership' => 'required|string|max:50',
            'region_id' => 'required|exists:regions,id',
            'status' => 'required|in:Active,Inactive',
        ]);

        $vehicle->update($validated);

        return redirect()
            ->route('vehicles.index')
            ->with('success', 'Vehicle updated successfully');
    }

    public function destroy(string $id)
    {
        vehicles::findOrFail($id)->delete();

        return redirect()
            ->route('vehicles.index')
            ->with('success', 'Vehicle deleted successfully');
    }
}
