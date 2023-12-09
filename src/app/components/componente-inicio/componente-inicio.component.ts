import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';


@Component({
  selector: 'app-componente-inicio',
  templateUrl: './componente-inicio.component.html',
  styleUrls: ['./componente-inicio.component.scss']
})
export class ComponenteInicioComponent {

  clienteNome: string = '';
  modalAberto: boolean = false;

  constructor(private router: Router, private toastr: ToastrService) {}

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

}
