import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { TransactionService } from '../../services/transaction.service';
import { Transaction } from '../../models/transaction.model';

@Component({
  selector: 'app-transaction-form',
  template: `
    <h2>{{ isEditing ? 'Editar' : 'Adicionar' }} Transação</h2>
    <form [formGroup]="transactionForm" (ngSubmit)="onSubmit()">
      <div>
        <label for="description">Descrição:</label>
        <input id="description" formControlName="description" required>
      </div>
      <div>
        <label for="amount">Valor:</label>
        <input id="amount" type="number" formControlName="amount" required>
      </div>
      <div>
        <label for="date">Data:</label>
        <input id="date" type="date" formControlName="date" required>
      </div>
      <div>
        <label for="type">Tipo:</label>
        <select id="type" formControlName="type" required>
          <option value="receita">Receita</option>
          <option value="despesa">Despesa</option>
        </select>
      </div>
      <div>
        <label for="transactionTypeId">Categoria:</label>
        <select id="transactionTypeId" formControlName="transactionTypeId" required>
          <!-- Adicione opções de tipos de transação aqui -->
        </select>
      </div>
      <button type="submit" [disabled]="!transactionForm.valid">Salvar</button>
    </form>
  `
})
export class TransactionFormComponent implements OnInit {
  transactionForm: FormGroup;
  isEditing = false;
  
  constructor(
    private fb: FormBuilder,
    private route: ActivatedRoute,
    private router: Router,
    private transactionService: TransactionService
  ) {
    this.transactionForm = this.fb.group({
      description: ['', Validators.required],
      amount: [0, [Validators.required, Validators.min(0.01)]],
      date: ['', Validators.required],
      type: ['receita', Validators.required],
      transactionTypeId: [null, Validators.required]
    });
  }

  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('id');
    if (id) {
      this.isEditing = true;
      this.loadTransaction(+id);
    }
  }

  loadTransaction(id: number): void {
    this.transactionService.getTransaction(id).subscribe(
      (transaction) => this.transactionForm.patchValue(transaction),
      (error) => console.error('Erro ao carregar transação', error)
    );
  }

  onSubmit(): void {
    if (this.transactionForm.valid) {
      const transaction: Transaction = this.transactionForm.value;
      if (this.isEditing) {
        const id = this.route.snapshot.paramMap.get('id');
        this.transactionService.updateTransaction(+id!, transaction).subscribe(
          () => this.router.navigate(['/transactions']),
          (error) => console.error('Erro ao atualizar transação', error)
        );
      } else {
        this.transactionService.createTransaction(transaction).subscribe(
          () => this.router.navigate(['/transactions']),
          (error) => console.error('Erro ao criar transação', error)
        );
      }
    }
  }
}
