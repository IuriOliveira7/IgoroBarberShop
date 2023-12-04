import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/service/auth/auth.service';
import { ToastrService } from 'ngx-toastr';


@Component({
  selector: 'app-componente-inicio',
  templateUrl: './componente-inicio.component.html',
  styleUrls: ['./componente-inicio.component.scss']
})
export class ComponenteInicioComponent {

  clienteNome: string = '';
  modalAberto: boolean = false;

  constructor(private router: Router, private auth: AuthService, private toastr: ToastrService) {}

  abrirModal() {
    this.modalAberto = true;
  }

  fecharModal() {
    this.modalAberto = false;
  }

  entrar() {
    this.router.navigate(['/home']);
  }

  exibirLogin: boolean = true;

  alternarDivs(): void {
    this.exibirLogin = !this.exibirLogin;
  }







  // SISTEMA DE LOGIN

  email: string = '';
  senha: string = '';
  confirmarsenha: string = '';


  login () {
    if(this.email == '' && this.senha == '') {
      // alert('Campo de email vazio!');
      this.toastr.error('E-mail e senha não podem ser vazios.');
      return;
    }

    if(this.email == '') {
      // alert('Campo de email vazio!');
      this.toastr.error('E-mail não podem ser vazios.');
      return;
    }

    if(this.senha == '') {
      this.toastr.error('Senha não podem ser vazios.');
      return;
    }

    this.auth.login(this.email, this.senha);
    this.email = '';
    this.senha = '';
  }

  register () {
    if(this.email == '') {
      this.toastr.error('Campo de email vazio!');
      return;
    }

    if(this.senha == '') {
      this.toastr.error('Campo de senha vazio!');
      return;
    } else if (this.senha.length < 6) {
      this.toastr.error('A senha deve ter pelo menos 6 caracteres.');
      return;
    }

    if(this.confirmarsenha == '') {
      this.toastr.error('Campo Confirmar senha vazio!');
      return;
    }

    if (this.senha !== this.confirmarsenha) {
      this.toastr.error('As senhas não coincidem. Tente novamente.');
      return;
    }

    this.auth.register(this.email, this.senha);
    this.email = '';
    this.senha = '';
    this.confirmarsenha = '';
  }
}
