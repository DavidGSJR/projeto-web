import { Component, OnInit } from '@angular/core';
import { TransactionService } from '../../services/transaction.service';
import { Transaction } from '../../models/transaction.model';

@Component({
  selector: 'app-transaction-list',
  template: `
    <h2>Transações</h2>
    <button (click)="addTransaction()">Adicionar Transação</button>
    <table>
      <thead>
        <tr>
          <th>Descrição</th>
          <th>Valor</th>
          <th>Data</th>
          <th>Tipo</th>
          <th>Ações</th>
        </tr>
      </thead>
      <tbody>
        <tr *ngFor="let transaction of transactions">
          <td>{{ transaction.description }}</td>
          <td>{{ transaction.amount | currency:'BRL' }}</td>
          <td>{{ transaction.date | date:'dd/MM/yyyy' }}</td>
          <td>{{ transaction.type }}</td>
          <td>
            <button (click)="editTransaction(transaction)">Editar</button>
            <button (click)="deleteTransaction(transaction.id)">Excluir</button>
          </td>
        </tr>
      </tbody>
    </table>
  `
})
export class TransactionListComponent implements OnInit {
  transactions: Transaction[] = [];

  constructor(private transactionService: TransactionService) {}

  ngOnInit(): void {
    this.loadTransactions();
  }

  loadTransactions(): void {
    this.transactionService.getTransactions().subscribe(
      (transactions) => this.transactions = transactions,
      (error) => console.error('Erro ao carregar transações', error)
    );
  }

  addTransaction(): void {
    // Navegue para o componente de formulário
  }

  editTransaction(transaction: Transaction): void {
    // Navegue para o componente de formulário com o ID da transação
  }

  deleteTransaction(id?: number): void {
    if (id === undefined) {
      console.error('ID da transação é indefinido');
      return;
    }
  
    if (confirm('Tem certeza que deseja excluir esta transação?')) {
      this.transactionService.deleteTransaction(id).subscribe(
        () => this.loadTransactions(),
        (error) => console.error('Erro ao excluir transação', error)
      );
    }
  }
  
}