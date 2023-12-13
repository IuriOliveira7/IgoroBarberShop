import { Component, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { AuthService } from 'src/app/service/auth/auth.service';
import { LoaderComponent } from '../loader/loader.component';



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

  OnInit(): void {
    this.exibirCheck = false;
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
  exibirCheck: boolean = false;
  exibirCheckRedefinicao: boolean = false;
  exibirRedefinirSenha: boolean = false;
  carregando: boolean = false;

  @ViewChild('loader') loader!: LoaderComponent;

  alterarEstado(exibirLogin: boolean, exibirCheck: boolean, exibirRedefinirSenha: boolean, exibirCheckRedefinicao: boolean): void {
    this.exibirLogin = exibirLogin;
    this.exibirCheck = exibirCheck;
    this.exibirRedefinirSenha = exibirRedefinirSenha;
    this.exibirCheckRedefinicao = exibirCheckRedefinicao;

    if (exibirLogin) {
      this.usuario = '';
      this.telefone = '';
      this.email = '';
      this.senha = '';
      this.confirmasenha = '';
    }
  }

  alternarDivs(): void {
    this.alterarEstado(!this.exibirLogin, false, false, false);
  }

  mostrarCheck(): void {
    this.alterarEstado(false, true, false, false);
  }

  mostrarCheckRedefinicao(): void {
    this.alterarEstado(false, false, false, true);
  }

  mostrarRedefinirSenha(): void {
    this.alterarEstado(false, false, true, false);
  }

  voltarParaLogin(): void {
    this.alterarEstado(true, false, false, false);
  }







  // LOGIN/CADASTRO

  novasenha: string = '';
  email: string = '';
  senha: string = '';
  usuario: string = '';
  telefone: string = '';
  confirmasenha: string = '';
  fotoSelecionada: File | null = null;
  imageUrl: string | ArrayBuffer | null = null;

  login(): void {
    this.authService.login(this.email, this.senha)
      .then((result) => {
        this.router.navigate(['/home']);
      })
      .catch((error) => {
        if (error.message === 'Senha incorreta') {
          this.toastr.error('Senha incorreta. Por favor, tente novamente.');
        } else if (this.email == '') {
          this.toastr.error('Campo e-mail vazio');
        } else if (this.senha == '') {
          this.toastr.error('Campo senha vazio');
        } else {
          this.toastr.error('Erro durante o login. Por favor, tente novamente.');
        }
      });
  }

  redefinirsenha(): void {
    this.carregando = true;

    // Verifica se todos os campos estão preenchidos
    if (this.email == '') {
      this.toastr.error('Campo e-mail vazio');
      this.carregando = false;
      return;
    } else if (this.novasenha == '') {
      this.toastr.error('Campo nova senha vazio');
      this.carregando = false;
      return;
    } else if (this.confirmasenha == '') {
      this.toastr.error('Campo confirmar senha vazio');
      this.carregando = false;
      return;
    } else if (this.novasenha != this.confirmasenha) {
      this.toastr.error('As senhas são diferentes');
      this.carregando = false;
      return;
    }

    this.authService.changePassword(this.email, this.novasenha, this.confirmasenha)
      .then((result) => {
        setTimeout(() => {
          this.carregando = false;
          this.mostrarCheckRedefinicao();
        }, 2000);
      })
      .catch((error) => {
      });
  }

  cadastrar(): void {
    this.carregando = true;

    // Verifica se todos os campos estão preenchidos
    if (this.fotoSelecionada == null) {
      this.toastr.error('Campo foto vazio');
      this.carregando = false;
      return;
    } else if (this.usuario == '') {
      this.toastr.error('Campo nome vazio');
      this.carregando = false;
      return;
    } else if (this.telefone == '') {
      this.toastr.error('Campo telefone vazio');
      this.carregando = false;
      return;
    } else if (this.email == '') {
      this.toastr.error('Campo e-mail vazio');
      this.carregando = false;
      return;
    } else if (this.senha == '') {
      this.toastr.error('Campo senha vazio');
      this.carregando = false;
      return;
    } else if (this.confirmasenha == '') {
      this.toastr.error('Campo confirmar senha vazio');
      this.carregando = false;
      return;
    }

    // Verifica se uma foto foi selecionada
    if (this.fotoSelecionada) {
      // Chama a função de registro com a foto
      this.authService.register(this.email, this.senha, this.usuario, this.telefone, this.fotoSelecionada)
        .then((result) => {
          setTimeout(() => {
            this.carregando = false;
            this.mostrarCheck();
          }, 2000);
        })
        .catch((error) => {
          // Tratamento de erros
          if (error.message === 'Senha incorreta') { 
            this.toastr.error('Erro durante o cadastro. Por favor, tente novamente.');
          }
        });
        
    }
  }

  onFileSelected_cadastro(event: any): void {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e: any) => {
        this.imageUrl = e.target.result;
        this.fotoSelecionada = file; // Adicionando esta linha
      };
      reader.readAsDataURL(file);
    }
  }

}
