import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';

import { AppComponent } from './app.component';
import { LoginComponent } from './login/login.component';
import { HomeComponent } from './home/home.component';
import { ItensComponent } from './itens/itens.component';
import { routing } from './app.routing';
import { ItensService } from './itens/itens.service';
import { OrdensService } from './ordem/ordens.service';
import { DataServiceItem } from './services/data.service.item'; 
import { DataServiceOrdem } from './services/data.service.ordem'; 
import { ItemNaoEncontradoComponent } from './item-nao-encontrado/item-nao-encontrado.component';
import { MensagemComponent } from './mensagem/mensagem.component';
import { OrdemComponent } from './ordem/ordem.component';
@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    HomeComponent,
    ItensComponent, 
    ItemNaoEncontradoComponent, MensagemComponent, OrdemComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
    routing
  ],
  providers: [
  ItensService,
  OrdensService,
  DataServiceItem,
  DataServiceOrdem ],
  bootstrap: [AppComponent]
})
export class AppModule { }
