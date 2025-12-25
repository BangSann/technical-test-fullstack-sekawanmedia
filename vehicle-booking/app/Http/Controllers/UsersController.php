<?php

namespace App\Http\Controllers;

use App\Models\User;
use App\Models\Role;
use App\Models\Region;
use App\Models\regions;
use App\Models\roles;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Hash;
use Inertia\Inertia;

class UsersController extends Controller
{
    public function index()
    {
        $users = User::with(['role' ,'region'])->get();

        return Inertia::render('users/users', [
            'users_data' => $users,
        ]);
    }
    public function create()
    {
        // return Inertia::render('Users/Create', [
        //     'roles' => roles::all(),
        //     'regions' => regions::all(),
        // ]);
    }

    public function store(Request $request)
    {
        $validated = $request->validate([
            'name' => 'required|string|max:255',
            'email' => 'required|email|unique:users,email',
            'password' => 'required|min:6',
            'role_id' => 'required|exists:roles,id',
            'region_id' => 'required|exists:regions,id',
        ]);

        User::create([
            'name' => $validated['name'],
            'email' => $validated['email'],
            'password' => Hash::make($validated['password']),
            'role_id' => $validated['role_id'],
            'region_id' => $validated['region_id'],
        ]);

        return redirect()
            ->route('users.index')
            ->with('success', 'User created successfully');
    }

    /**
     * Display the specified resource.
     */
    public function show(string $id)
    {
        $user = User::with(['role', 'region'])->findOrFail($id);

        // return Inertia::render('Users/Show', [
        //     'user' => $user,
        // ]);
    }

    public function edit(string $id)
    {
        // return Inertia::render('Users/Edit', [
        //     'user' => User::findOrFail($id),
        //     'roles' => roles::all(),
        //     'regions' => regions::all(),
        // ]);
    }

    public function update(Request $request, string $id)
    {
        $user = User::findOrFail($id);

        $validated = $request->validate([
            'name' => 'required|string|max:255',
            'email' => 'required|email|unique:users,email,' . $user->id,
            'password' => 'nullable|min:6',
            'role_id' => 'required|exists:roles,id',
            'region_id' => 'required|exists:regions,id',
        ]);

        $user->update([
            'name' => $validated['name'],
            'email' => $validated['email'],
            'role_id' => $validated['role_id'],
            'region_id' => $validated['region_id'],
            'password' => $request->filled('password')
                ? Hash::make($validated['password'])
                : $user->password,
        ]);

        return redirect()
            ->route('users.index')
            ->with('success', 'User updated successfully');
    }

    public function destroy(string $id)
    {
        User::findOrFail($id)->delete();

        return redirect()
            ->route('users.index')
            ->with('success', 'User deleted successfully');
    }
}
