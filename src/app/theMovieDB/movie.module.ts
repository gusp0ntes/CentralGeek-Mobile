import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http'; // Importe o HttpClientModule
import { IonicModule } from '@ionic/angular';
import { AppRoutingModule } from '../app-routing.module';
import { AppComponent } from '../app.component';

@NgModule({
  declarations: [
    AppComponent
    // Outros componentes podem ser declarados aqui
  ],
  imports: [
    BrowserModule,
    IonicModule.forRoot(),
    AppRoutingModule,
    HttpClientModule // Adicione o HttpClientModule aos imports
    // Outros módulos de importação podem ser adicionados aqui
  ],
  providers: [
    // Seus provedores de serviços podem ser fornecidos aqui
  ],
  bootstrap: [AppComponent]
})
export class AppModule {}
