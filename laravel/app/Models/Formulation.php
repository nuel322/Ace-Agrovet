<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Formulation extends Model
{
    use HasFactory;

    /**
     * The table associated with the model.
     *
     * @var string
     */
    protected $table = 'formulations';

    /**
     * Indicates if the model's ID is auto-incrementing.
     *
     * @var bool
     */
    public $incrementing = false;

    /**
     * The "type" of the primary key ID.
     *
     * @var string
     */
    protected $keyType = 'string';

    /**
     * Disable standard Laravel timestamps since we map to customized createdAt fields.
     *
     * @var bool
     */
    public $timestamps = false;

    /**
     * The attributes that are mass assignable.
     *
     * @var array<int, string>
     */
    protected $fillable = [
        'id',
        'name',
        'target_cp',
        'ingredient1_name',
        'ingredient1_cp',
        'ingredient1_parts',
        'ingredient1_percent',
        'ingredient2_name',
        'ingredient2_cp',
        'ingredient2_parts',
        'ingredient2_percent',
        'created_at'
    ];

    /**
     * The attributes that should be cast.
     *
     * @var array<string, string>
     */
    protected $casts = [
        'target_cp' => 'float',
        'ingredient1_cp' => 'float',
        'ingredient1_parts' => 'float',
        'ingredient1_percent' => 'float',
        'ingredient2_cp' => 'float',
        'ingredient2_parts' => 'float',
        'ingredient2_percent' => 'float',
        'created_at' => 'string'
    ];
}
