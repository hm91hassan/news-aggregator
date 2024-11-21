<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Author extends Model
{
    protected $fillable = ['name', 'source_id'];

    public function news()
    {
        return $this->hasMany(News::class);
    }
}
