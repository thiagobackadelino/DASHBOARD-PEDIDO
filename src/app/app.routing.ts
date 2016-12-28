import { ModuleWithProviders } from '@angular/core'
import { Routes, RouterModule } from '@angular/router'

import { ItensComponent } from './itens/itens.component';
import { HomeComponent } from './home/home.component';
import { LoginComponent } from './login/login.component';  
import { ItemNaoEncontradoComponent } from './item-nao-encontrado/item-nao-encontrado.component';


const APP_ROUTES: Routes = [
    { path: 'home', component: HomeComponent },
    { path: 'login', component: LoginComponent },
    { path: 'itens', component: ItensComponent }, 
    { path: 'naoEncontrado', component: ItemNaoEncontradoComponent }
];

export const routing:  ModuleWithProviders = RouterModule.forRoot(APP_ROUTES);