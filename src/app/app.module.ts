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
import { DataService } from './services/data.service'; 
import { ItemNaoEncontradoComponent } from './item-nao-encontrado/item-nao-encontrado.component';
@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    HomeComponent,
    ItensComponent, 
    ItemNaoEncontradoComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
    routing
  ],
  providers: [
  ItensService,
  DataService ],
  bootstrap: [AppComponent]
})
export class AppModule { }
