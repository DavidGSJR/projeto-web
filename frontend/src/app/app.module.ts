import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { CommonModule } from '@angular/common';
import { AppComponent } from './app.component';
import { HomeComponent } from './components/home/home.component';
import { TransactionListComponent } from './components/transaction-list/transaction-list.component';
import { TransactionFormComponent } from './components/transaction-form/transaction-form.component';
import { AppRoutingModule } from './app-routing.module'; // Importar o módulo de roteamento
import { TransactionService } from './services/transaction.service';

@NgModule({
  declarations: [
    HomeComponent,
    TransactionListComponent,
    TransactionFormComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    CommonModule,
    AppRoutingModule 
  ],
  providers: [TransactionService],
  bootstrap: [AppComponent]
})
export class AppModule { }
