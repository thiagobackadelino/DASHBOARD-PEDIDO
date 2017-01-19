import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { ReactiveFormsModule } from '@angular/forms';
import { ProgressbarModule } from './com/progressbar/progressbar.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './login/login.component';
import { HomeComponent } from './home/home.component';
import { ItensComponent } from './itens/itens.component';
import { routing } from './app.routing';
import { ItensService } from './itens/itens.service';
import { CaixaService } from './caixa/caixa.service';
import { OrdensService } from './ordem/ordens.service';
import { DataServiceItem } from './services/data.service.item';
import { DataServiceOrdem } from './services/data.service.ordem';
import { DataServiceCaixa } from './services/data.service.caixa';
import { ItemNaoEncontradoComponent } from './item-nao-encontrado/item-nao-encontrado.component'; 
import { OrdemComponent } from './ordem/ordem.component';
import { OrdemItemModalComponent } from './ordem-item-modal/ordem-item-modal.component';
import { OrdemItemSelecaoComponent } from './ordem-item-selecao/ordem-item-selecao.component';
import { SeletorQuantidadeComponent } from './com/seletor-quantidade/seletor-quantidade.component';
import { CardComponent } from './com/card/card.component';
import { RemoveSpacesPipe } from './pipes/remove-spaces.pipe';
import { CaixaComponent } from './caixa/caixa.component';
import { ProgressbarDemoComponent } from './com-impl/progressbar/progressbar-demo.component';
import { DatepickerDemoComponent } from './com-impl/datepicker/datepicker-demo.component';
import { DatepickerModule } from './com/datepicker/datepicker.module';

import { RouterModule }   from '@angular/router';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    HomeComponent,
    ItensComponent,
    ItemNaoEncontradoComponent, 
    OrdemComponent,
    OrdemItemModalComponent,
    OrdemItemSelecaoComponent,
    SeletorQuantidadeComponent,
    CardComponent,
    RemoveSpacesPipe,
    CaixaComponent,
    ProgressbarDemoComponent,
    DatepickerDemoComponent,
  ],
  imports: [
    BrowserModule,
    FormsModule,
    ReactiveFormsModule,
    HttpModule,
    routing,
    ProgressbarModule,
    DatepickerModule,
        RouterModule.forRoot([
      {
        path: 'datepicker',
        component: DatepickerDemoComponent
      }
    ]),
     RouterModule.forRoot([
      {
        path: 'progressbar',
        component: ProgressbarDemoComponent
      }
    ])
  ],
  providers: [
    ItensService,
    OrdensService,
    CaixaService,
    DataServiceItem,
    DataServiceOrdem,
    DataServiceCaixa],
  bootstrap: [AppComponent]
})
export class AppModule { }
