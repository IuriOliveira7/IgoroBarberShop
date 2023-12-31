import { ToastrModule } from 'ngx-toastr';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ComponenteInicioComponent } from './components/componente-inicio/componente-inicio.component';
import { HomeComponent } from './pages/home/home.component';
import { TopBarComponent } from './components/top-bar/top-bar.component';
import { ConteudoHomeComponent } from './components/conteudo-home/conteudo-home.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { PageInicioComponent } from './pages/page-inicio/page-inicio.component';


import { AngularFireModule } from "@angular/fire/compat";
import { AngularFireAuthModule } from "@angular/fire/compat/auth";
import { AngularFireStorageModule } from '@angular/fire/compat/storage';
import { AngularFirestoreModule } from '@angular/fire/compat/firestore';
import { environment } from 'src/environments/environment';
import { AuthService } from './service/auth/auth.service';
import { LoaderComponent } from './components/loader/loader.component';
import { UserEditComponent } from './components/user-edit/user-edit.component';
import { PageUserComponent } from './pages/page-user/page-user.component';
import { PageAgendaComponent } from './pages/page-agenda/page-agenda.component';
import { AgendaComponent } from './components/agenda/agenda.component';


@NgModule({
  declarations: [
    AppComponent,
    PageInicioComponent,
    HomeComponent,
    TopBarComponent,
    LoaderComponent,
    ConteudoHomeComponent,
    ComponenteInicioComponent,
    UserEditComponent,
    PageUserComponent,
    PageAgendaComponent,
    AgendaComponent,
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    AppRoutingModule,
    FormsModule,
    ToastrModule.forRoot(),
    AngularFireModule.initializeApp(environment.firebase),
    AngularFireAuthModule,
    AngularFireStorageModule,
    AngularFirestoreModule,
  ],
  providers: [AuthService],
  bootstrap: [AppComponent]
})
export class AppModule { }
