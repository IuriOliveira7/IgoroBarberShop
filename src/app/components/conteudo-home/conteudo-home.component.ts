import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/service/auth/auth.service';
import { AngularFireAuth } from '@angular/fire/compat/auth';

@Component({
  selector: 'app-conteudo-home',
  templateUrl: './conteudo-home.component.html',
  styleUrls: ['./conteudo-home.component.scss']
})
export class ConteudoHomeComponent {
  userName: string | undefined;

  constructor(private authService: AuthService) { }

  ngOnInit(): void {
    // Subscreve-se para receber as informações do usuário
    this.authService.getUserData().subscribe(user => {
      if (user) {
        this.userName = user.name;
        // console.log('name:', this.userName)
      }
    });
  }
}