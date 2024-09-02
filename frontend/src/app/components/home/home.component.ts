import { Component, OnInit } from '@angular/core';
import { TransactionService } from '../../services/transaction.service';
import { Transaction } from '../../models/transaction.model';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  template: `
    <div class="home-container">
      <h1>Gerenciador de Transações Financeiras</h1>
      
      <div class="summary-cards">
        <div class="card">
          <h2>Total de Receitas</h2>
          <p>{{ totalIncome | currency:'BRL' }}</p>
        </div>
        <div class="card">
          <h2>Total de Despesas</h2>
          <p>{{ totalExpenses | currency:'BRL' }}</p>
        </div>
        <div class="card">
          <h2>Saldo</h2>
          <p [ngClass]="{'positive': balance >= 0, 'negative': balance < 0}">
            {{ balance | currency:'BRL' }}
          </p>
        </div>
      </div>

      <div class="recent-transactions">
        <h2>Transações Recentes</h2>
        <table>
          <thead>
            <tr>
              <th>Descrição</th>
              <th>Valor</th>
              <th>Data</th>
              <th>Tipo</th>
            </tr>
          </thead>
          <tbody>
            <tr *ngFor="let transaction of recentTransactions">
              <td>{{ transaction.description }}</td>
              <td [ngClass]="{'income': transaction.type === 'receita', 'expense': transaction.type === 'despesa'}">
                {{ transaction.amount | currency:'BRL' }}
              </td>
              <td>{{ transaction.date | date:'dd/MM/yyyy' }}</td>
              <td>{{ transaction.type | titlecase }}</td>
            </tr>
          </tbody>
        </table>
      </div>

      <div class="actions">
        <button routerLink="/transactions">Ver Todas as Transações</button>
        <button routerLink="/transactions/new">Adicionar Nova Transação</button>
      </div>
    </div>
  `,
  styles: [`
    .home-container {
      max-width: 800px;
      margin: 0 auto;
      padding: 20px;
    }
    .summary-cards {
      display: flex;
      justify-content: space-between;
      margin-bottom: 20px;
    }
    .card {
      background-color: #f0f0f0;
      padding: 15px;
      border-radius: 5px;
      width: 30%;
    }
    .recent-transactions {
      margin-bottom: 20px;
    }
    table {
      width: 100%;
      border-collapse: collapse;
    }
    th, td {
      text-align: left;
      padding: 8px;
      border-bottom: 1px solid #ddd;
    }
    .positive { color: green; }
    .negative { color: red; }
    .income { color: green; }
    .expense { color: red; }
    .actions {
      display: flex;
      justify-content: space-around;
    }
  `]
})
export class HomeComponent implements OnInit {
  totalIncome: number = 0;
  totalExpenses: number = 0;
  balance: number = 0;
  recentTransactions: Transaction[] = [];

  constructor(private transactionService: TransactionService) {}

  ngOnInit() {
    this.loadSummary();
    this.loadRecentTransactions();
  }

  loadSummary() {
    this.transactionService.getTransactions().subscribe(
      transactions => {
        this.totalIncome = transactions
          .filter(t => t.type === 'receita')
          .reduce((sum, t) => sum + t.amount, 0);
        
        this.totalExpenses = transactions
          .filter(t => t.type === 'despesa')
          .reduce((sum, t) => sum + Math.abs(t.amount), 0);
        
        this.balance = this.totalIncome - this.totalExpenses;
      },
      error => console.error('Erro ao carregar resumo', error)
    );
  }

  loadRecentTransactions() {
    this.transactionService.getTransactions().subscribe(
      transactions => {
        this.recentTransactions = transactions
          .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())
          .slice(0, 5);
      },
      error => console.error('Erro ao carregar transações recentes', error)
    );
  }
}