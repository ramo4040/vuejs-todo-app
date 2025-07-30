<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Relations\HasMany;

class Category extends Model
{
    /**
     * The attributes that are mass assignable.
     *
     * @var array<int, string>
     */
    protected $fillable = [
        'name',
        'color',
        'user_id',
    ];

    /**
     * Get the validation rules for the category.
     *
     * @return array<string, string>
     */
    public static function validationRules(): array
    {
        return [
            'name' => 'required|string|max:255',
            'color' => 'required|string',
        ];
    }

    /**
     * Get the user that owns the category.
     */
    public function user(): BelongsTo
    {
        return $this->belongsTo(User::class);
    }

    /**
     * Get the todos for the category.
     */
    public function todos(): HasMany
    {
        return $this->hasMany(Todo::class);
    }
}
