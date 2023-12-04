import { ToastrModule } from 'ngx-toastr';
import { AngularFireAuthModule } from '@angular/fire/compat/auth';
import { AngularFireModule } from '@angular/fire/compat';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ComponenteInicioComponent } from './components/componente-inicio/componente-inicio.component';
import { HomeComponent } from './pages/home/home.component';
import { TopBarComponent } from './components/top-bar/top-bar.component';
import { ConteudoHomeComponent } from './components/conteudo-home/conteudo-home.component';
import { environment } from './environments/environments';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { PageInicioComponent } from './pages/page-inicio/page-inicio.component';

@NgModule({
  declarations: [
    AppComponent,
    PageInicioComponent,
    HomeComponent,
    TopBarComponent,
    ConteudoHomeComponent,
    ComponenteInicioComponent,
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    AppRoutingModule,
    FormsModule,
    AngularFireModule.initializeApp(environment.firebase),
    AngularFireAuthModule,
    ToastrModule.forRoot(),
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
