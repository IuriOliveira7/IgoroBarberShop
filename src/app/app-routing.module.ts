import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PageInicioComponent } from './pages/page-inicio/page-inicio.component';
import { HomeComponent } from './pages/home/home.component';

const routes: Routes = [

  { path: '', component: PageInicioComponent },
  { path: 'home', component: HomeComponent }

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
