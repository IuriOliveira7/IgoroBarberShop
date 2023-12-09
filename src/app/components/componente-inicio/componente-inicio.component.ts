import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { AuthService } from 'src/app/service/auth/auth.service';



@Component({
  selector: 'app-componente-inicio',
  templateUrl: './componente-inicio.component.html',
  styleUrls: ['./componente-inicio.component.scss']
})
export class ComponenteInicioComponent {

  clienteNome: string = '';
  modalAberto: boolean = false;

  constructor(private router: Router, private toastr: ToastrService, private authService: AuthService) {
  }

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



  // Propriedades para armazenar os valores dos campos
  email: string = '';
  senha: string = '';
  usuario: string = '';
  telefone: string = '';
  confirmasenha: string = '';

  login(): void {
    // Lógica para login
    this.authService.login(this.email, this.senha)
      .then((result) => {
        this.router.navigate(['/home']);
      })
      .catch((error) => {
        // Lidar com erros de login (por exemplo, exibir uma mensagem de erro)
        this.toastr.error('Erro durante o cadastro: ' + error.message, 'Erro');
      });
  }

  cadastrar(): void {
    // Lógica para cadastro
    this.authService.register(this.email, this.senha, this.usuario, this.telefone)
      .then((result) => {
        this.alternarDivs();
        this.toastr.success('Cadastro bem-sucedido!', 'Sucesso');
      })
      .catch((error) => {
        // Lidar com erros de cadastro (por exemplo, exibir uma mensagem de erro)
        this.toastr.error('Erro durante o cadastro: ' + error.message, 'Erro');
      });
  }

}
