import { Component, ViewChild } from '@angular/core';
import { LoaderComponent } from '../loader/loader.component';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { AuthService } from 'src/app/service/auth/auth.service';

@Component({
  selector: 'app-user-edit',
  templateUrl: './user-edit.component.html',
  styleUrl: './user-edit.component.scss'
})
export class UserEditComponent {
  
  constructor(private router: Router, private toastr: ToastrService, private authService: AuthService) {
  }

  email: string = '';
  name: string = '';
  phone: string = '';
  fotoSelecionada: any;
  imageUrl: string | ArrayBuffer | null = null;
  carregando: boolean = false;

  @ViewChild('loader') loader!: LoaderComponent;

  ngOnInit(): void {
    this.authService.getUserData().subscribe(user => {
      if (user) {
        this.imageUrl = user.photoURL;
        this.name = user.name;
        this.email = user.email;
        this.phone = user.phone;
      }
    });
  }

  atualizarPerfil() {
    this.carregando = true;

    this.atualizarFoto();

    this.authService.updateProfileWithoutPhoto(this.email, this.name, this.phone)
      .then(() => {
        this.carregando = false;

        this.toastr.success('Perfil atualizado com sucesso!');
      })
      .catch((error) => {
        // Tratamento de erros
        console.error('Erro ao atualizar o perfil:', error);
  
        if (error.message === 'Usuário não encontrado.') {
          this.toastr.error('Usuário não encontrado. Por favor, faça o login novamente.');
        } else {
          this.toastr.error('Erro ao atualizar o perfil. Por favor, tente novamente.');
        }
  
        this.carregando = false; // Certifique-se de ajustar o estado, mesmo em caso de erro.
      });
  }

  atualizarFoto() {
    // Se não houver uma nova foto selecionada ou a foto selecionada for igual à foto existente, não faça nada
    if (!this.fotoSelecionada || this.fotoSelecionada === this.imageUrl) {
      console.log('Nenhuma alteração na foto. A foto existente será mantida.');
      return;
    }
  
    this.carregando = true;
  
    console.log('Nova foto a ser atualizada:', {
      fotoSelecionada: this.fotoSelecionada,
    });
  
    this.authService.updatePhoto(this.fotoSelecionada)
      .then(() => {
        this.carregando = false;
        this.toastr.success('Foto atualizada com sucesso!');
      })
      .catch((error) => {
        // Tratamento de erros
        console.error('Erro ao atualizar a foto:', error);
  
        this.toastr.error('Erro ao atualizar a foto. Por favor, tente novamente.');
        this.carregando = false; // Certifique-se de ajustar o estado, mesmo em caso de erro.
      });
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
