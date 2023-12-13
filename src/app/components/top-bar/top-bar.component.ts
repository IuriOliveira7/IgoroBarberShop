import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/service/auth/auth.service';



@Component({
  selector: 'app-top-bar',
  templateUrl: './top-bar.component.html',
  styleUrls: ['./top-bar.component.scss']
})
export class TopBarComponent {

  constructor(private router: Router, private authService: AuthService) {}

  fotoSelecionada: any;

  ngOnInit(): void {
    this.authService.getUserData().subscribe(user => {
      // console.log('Dados do Usuário:', user);
      if (user) {
        this.fotoSelecionada = user.photoURL;
        console.log('FOTO:', this.fotoSelecionada);
      }
    });
  }

  sair() {
    this.router.navigate(['/']);
  }
}
