import { CaixaIncluirMovimentacaoComponent } from './caixa-incluir-movimentacao/caixa-incluir-movimentacao.component';
import { CaixaComponent } from './caixa/caixa.component';
import { OrdemRelatorioComponent } from './ordem-relatorio/ordem-relatorio.component';
import { ModuleWithProviders } from '@angular/core'
import { Routes, RouterModule } from '@angular/router'

import { ItensComponent } from './itens/itens.component';
import { HomeComponent } from './home/home.component';
import { LoginComponent } from './login/login.component';  
import { ItemNaoEncontradoComponent } from './item-nao-encontrado/item-nao-encontrado.component';
import { OrdemItemModalComponent } from './ordem-item-modal/ordem-item-modal.component';

const APP_ROUTES: Routes = [
    { path: 'home', component: HomeComponent }, 
    { path: 'ordem-item-modal/:id', component: OrdemItemModalComponent },
    { path: '', component: LoginComponent },
    { path: 'login', component: LoginComponent },
    { path: 'itens', component: ItensComponent }, 
    { path: 'relatorios', component: OrdemRelatorioComponent},
    { path: 'naoEncontrado', component: ItemNaoEncontradoComponent },
    { path: 'caixa', component: CaixaComponent },
    { path: 'caixa-incluir-movimentacao/:id', component: CaixaIncluirMovimentacaoComponent },
    { path: 'caixa-incluir-movimentacao', component: CaixaIncluirMovimentacaoComponent }
];

export const routing:  ModuleWithProviders = RouterModule.forRoot(APP_ROUTES);