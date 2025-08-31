<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Lead extends Model
{
    protected $fillable = [
        'service_id','service_slug','service_title',
        'name','email','phone','company','message',
        'channel','ip','user_agent',
    ];
}
