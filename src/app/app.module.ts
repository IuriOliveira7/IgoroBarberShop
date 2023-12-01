import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ComponenteInicioComponent } from './components/componente-inicio/componente-inicio.component';
import { PageInicioComponent } from './pages/page-inicio/page-inicio.component';
import { HomeComponent } from './pages/home/home.component';
import { TopBarComponent } from './components/top-bar/top-bar.component';
import { ConteudoHomeComponent } from './components/conteudo-home/conteudo-home.component';

@NgModule({
  declarations: [
    AppComponent,
    ComponenteInicioComponent,
    PageInicioComponent,
    HomeComponent,
    TopBarComponent,
    ConteudoHomeComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
