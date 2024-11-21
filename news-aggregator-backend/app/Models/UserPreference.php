<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class UserPreference extends Model
{
    protected $fillable = [
        'user_id',
        'sources',
        'categories',
        'authors',
    ];

    protected $casts = [
        'sources' => 'array',     // Ensure sources are cast to and from JSON
        'categories' => 'array',  // Ensure categories are cast to and from JSON
        'authors' => 'array',     // Ensure authors are cast to and from JSON
    ];
}
