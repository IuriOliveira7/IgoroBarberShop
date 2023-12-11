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
    this.authService.getUserData().subscribe(user => {
      if (user) {
        this.userName = user.name;
      }
    });
  }

}
