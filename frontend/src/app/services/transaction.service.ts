import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ApiService } from './api.service';
import { Transaction } from '../models/transaction.model';

@Injectable({
  providedIn: 'root'
})
export class TransactionService {
  private endpoint = 'transactions';

  constructor(private apiService: ApiService) { }

  getTransactions(): Observable<Transaction[]> {
    return this.apiService.get<Transaction[]>(this.endpoint);
  }

  getTransaction(id: number): Observable<Transaction> {
    return this.apiService.get<Transaction>(`${this.endpoint}/${id}`);
  }

  createTransaction(transaction: Transaction): Observable<Transaction> {
    return this.apiService.post<Transaction>(this.endpoint, transaction);
  }

  updateTransaction(id: number, transaction: Transaction): Observable<Transaction> {
    return this.apiService.put<Transaction>(`${this.endpoint}/${id}`, transaction);
  }

  deleteTransaction(id: number): Observable<void> {
    return this.apiService.delete<void>(`${this.endpoint}/${id}`);
  }
}