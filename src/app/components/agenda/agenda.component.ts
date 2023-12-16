import { Component, Input } from '@angular/core';
import { addMonths, subMonths } from 'date-fns';
import { AgendaService } from 'src/app/service/agenda/agenda.service';


@Component({
  selector: 'app-agenda',
  templateUrl: './agenda.component.html',
  styleUrl: './agenda.component.scss'
})
export class AgendaComponent {
  @Input() mes!: string;
  @Input() ano!: number;

  diaAtual: any;

  dadosDaSemana!: { nomeMes: string, diasDaSemana: string[], diasDaSemanaSelecionados: { numero: number, diaDaSemana: string, nomeMes: string, diaAtual: boolean }[] };


  constructor(private agendaService: AgendaService) {}

  ngOnInit() {
    this.atualizarDadosDaSemana();
    

    // const diaAtual = this.dadosDaSemana.diasDaSemanaSelecionados.find(dia => dia.diaAtual);
  
    // if (diaAtual) {
    //   console.log('DIA ATUAL:', diaAtual.numero);
    // }
  }


  avancarSemana() {
    this.agendaService.avancarSemana();
    this.atualizarDadosDaSemana();
  }

  retrocederSemana() {
    this.agendaService.retrocederSemana();
    this.atualizarDadosDaSemana();
  }

  private atualizarDadosDaSemana() {
    this.dadosDaSemana = this.agendaService.obterDadosDaSemana();
  }

}
