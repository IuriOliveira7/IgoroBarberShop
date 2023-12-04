import { AngularFireAuth } from '@angular/fire/compat/auth';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private fireauth: AngularFireAuth, private router: Router, private toastr: ToastrService) { }

  login (email: string, senha: string) {
    this.fireauth.signInWithEmailAndPassword(email,senha).then( () => {
      localStorage.setItem('token', 'true');
      this.router.navigate(['/home']);
    }, err => {
      this.toastr.error('E-mail ou senha incorretos.');
      this.router.navigate(['']);
    })
  }

  register (email: string, senha: string) {
    this.fireauth.createUserWithEmailAndPassword(email,senha).then( () => {
      this.toastr.success('Registrado com Sucesso!');
      location.reload();
    }, err => {
      // this.toastr.error('Não foi possível fazer o registro. Por favor, tente novamente.');
      this.router.navigate(['']);
    })
  }


  logout () {
    this.fireauth.signOut().then( () => {
      localStorage.removeItem('token');
      this.router.navigate(['']);
    }, err => {
      alert(err.message)
      this.router.navigate(['']);
    })
  }



}
