<?php

namespace App\Http\Controllers;

use App\Models\Transaction;
use Illuminate\Http\Request;

class TransactionController extends Controller
{
    public function index()
    {
        $transactions = Transaction::with('transactionType')->get();
        return response()->json($transactions);
    }

    public function store(Request $request)
    {
        $validatedData = $request->validate([
            'description' => 'required|string',
            'amount' => 'required|numeric',
            'date' => 'required|date',
            'type' => 'required|in:receita,despesa',
            'transaction_type_id' => 'required|exists:transaction_types,id',
        ]);

        if ($validatedData['type'] === 'despesa') {
            $validatedData['amount'] = -abs($validatedData['amount']);
        }

        $transaction = Transaction::create($validatedData);
        return response()->json($transaction, 201);
    }

    public function show(Transaction $transaction)
    {
        return response()->json($transaction->load('transactionType'));
    }

    public function update(Request $request, Transaction $transaction)
    {
        $validatedData = $request->validate([
            'description' => 'required|string',
            'amount' => 'required|numeric',
            'date' => 'required|date',
            'type' => 'required|in:receita,despesa',
            'transaction_type_id' => 'required|exists:transaction_types,id',
        ]);

        if ($validatedData['type'] === 'despesa') {
            $validatedData['amount'] = -abs($validatedData['amount']);
        }

        $transaction->update($validatedData);
        return response()->json($transaction);
    }

    public function destroy(Transaction $transaction)
    {
        $transaction->delete();
        return response()->json(null, 204);
    }
}