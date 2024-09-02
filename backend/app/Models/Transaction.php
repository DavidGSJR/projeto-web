<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Transaction extends Model
{
    protected $fillable = ['description', 'amount', 'date', 'type', 'transaction_type_id'];

    public function transactionType()
    {
        return $this->belongsTo(TransactionType::class);
    }
}
