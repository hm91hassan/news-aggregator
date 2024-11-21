<?php

namespace App\Http\Controllers;

use App\Models\UserPreference;
use Illuminate\Http\Request;

class UserPreferenceController extends Controller
{
    public function store(Request $request)
    {
        $validated = $request->validate([
            'sources' => 'nullable|array',
            'categories' => 'nullable|array',
        ]);

        $user = $request->user();

        $user->preferences()->updateOrCreate([], [
            'sources' => $validated['sources'],
            'categories' => $validated['categories'],
        ]);

        return response()->json(['message' => 'Preferences saved successfully']);
    }

    public function show()
    {
        $preferences = UserPreference::where('user_id', auth()->id())->first();

        return response()->json($preferences);
    }
}
