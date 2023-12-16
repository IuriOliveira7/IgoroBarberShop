import { Injectable } from '@angular/core';
import { addDays, startOfMonth, endOfMonth, format, Locale, startOfWeek, endOfWeek, addWeeks, subWeeks, addMonths, subMonths, isAfter, isSameMonth, isToday } from 'date-fns';
import { ptBR } from 'date-fns/locale';

@Injectable({
  providedIn: 'root'
})
export class AgendaService {
  private dataAtual = new Date();
  diaAtual: any;
  
  obterDadosDaSemana(): { nomeMes: string, diasDaSemana: string[], diasDaSemanaSelecionados: { numero: number, diaDaSemana: string, nomeMes: string, diaAtual: boolean }[] } {
    // Calcula o início e o fim da semana
    const inicioDaSemana = startOfWeek(this.dataAtual);
    const fimDaSemana = endOfWeek(this.dataAtual);

    // Array para armazenar os dados da semana
    const diasDaSemanaSelecionados = [];

    // Adiciona cada dia da semana ao array
    let diaAtual = inicioDaSemana;
    while (diaAtual <= fimDaSemana) {
      diasDaSemanaSelecionados.push({
        numero: diaAtual.getDate(),
        diaDaSemana: format(diaAtual, 'EEE', { locale: ptBR }).slice(0, 3),
        nomeMes: isSameMonth(diaAtual, this.dataAtual) ? format(this.dataAtual, 'MMMM', { locale: ptBR }) : format(addMonths(this.dataAtual, 1), 'MMMM', { locale: ptBR }),
        diaAtual: isToday(diaAtual),
      });

      diaAtual = addDays(diaAtual, 1);
    }

    // Retorna os dados da semana
    return {
      nomeMes: format(inicioDaSemana, 'MMMM', { locale: ptBR }),
      diasDaSemana: ['Dom', 'Seg', 'Ter', 'Qua', 'Qui', 'Sex', 'Sáb'],
      diasDaSemanaSelecionados,
    };
  }

  avancarSemana(): void {
    this.dataAtual = addDays(this.dataAtual, 7);
  }

  retrocederSemana(): void {
    this.dataAtual = addDays(this.dataAtual, -7);
  }
}
