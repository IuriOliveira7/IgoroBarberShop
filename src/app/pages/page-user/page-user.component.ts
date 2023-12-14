import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/service/auth/auth.service';


@Component({
  selector: 'app-page-user',
  templateUrl: './page-user.component.html',
  styleUrl: './page-user.component.scss'
})
export class PageUserComponent {



  constructor(private router: Router, private authService: AuthService) {}

  fotoSelecionada: any;
  email: string | undefined;
  userName: string | undefined;
  phone: string | undefined;
  imageUrl: string | ArrayBuffer | null = null;

  ngOnInit(): void {
    this.authService.getUserData().subscribe(user => {
      if (user) {
        this.fotoSelecionada = user.photoURL;
        this.userName = user.name;
        this.email = user.email;
        this.phone = user.phone;
      }
    });
  }

  exibirInformacoesUser: boolean = true;
  carregando: boolean = false;

  
  
  alterarEstado(exibirInformacoesUser: boolean): void {
    this.exibirInformacoesUser = exibirInformacoesUser;
  }

  alternarDivs(): void {
    this.alterarEstado(!this.exibirInformacoesUser);
  }

  voltar() {
    this.router.navigate(['/home']);
  }

  voltaruser() {
    this.alterarEstado(!this.exibirInformacoesUser);
  }


  emailedit: string = 'iuriolivera7@gmail.com';
  senha: string = '123456789';
  usuario: string = '';
  telefone: string = '';

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

