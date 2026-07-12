import { Component } from '@angular/core';
import { Location } from '@angular/common';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-termos-de-uso',
  imports: [RouterLink],
  template: `
    <div class="max-w-4xl mx-auto py-6 md:py-10 px-4 text-justify">
      <button (click)="voltar()" class="flex items-center text-green-800 mb-6 hover:underline cursor-pointer">
        <svg xmlns="http://www.w3.org/2000/svg" class="mr-2 w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M19 12H5m7-7-7 7 7 7"/></svg>
        Voltar
      </button>

      <h1 class="text-2xl md:text-3xl font-bold mb-6 text-center text-green-900">Termos de Uso</h1>
      <p class="mb-4">Última atualização: 11 de julho de 2025</p>

      <p class="mb-4">Bem-vindo à plataforma colaborativa de monitoramento de lotação em unidades de saúde.</p>

      <p class="mb-4">
        Ao criar uma conta ou utilizar esta plataforma, você concorda com estes Termos de Uso e com a
        <a routerLink="/politica-de-privacidade" class="text-emerald-600 hover:underline">Política de privacidade</a>.
      </p>

      <p class="mb-4 font-semibold">1. Objetivo da Plataforma</p>
      <p class="mb-4">Este sistema tem por finalidade permitir que usuários contribuam colaborativamente com informações sobre o estado de lotação de emergências e UPAs.</p>

      <p class="mb-4 font-semibold">2. Cadastro de Usuário</p>
      <p class="mb-4">O uso da plataforma pode ser feito de forma anônima para consulta. Para contribuir, o usuário deve realizar um cadastro.</p>

      <p class="mb-4 font-semibold">3. Responsabilidades do Usuário</p>
      <ul class="list-disc pl-6 mb-4">
        <li>Contribuir com informações verdadeiras e recentes.</li>
        <li>Não utilizar a plataforma para disseminação de informações falsas.</li>
        <li>Respeitar o intervalo mínimo de 30 minutos entre atualizações.</li>
        <li>Não tentar comprometer a segurança do sistema.</li>
      </ul>

      <p class="mb-4 font-semibold">4. Limitações da Plataforma</p>
      <p class="mb-4">As informações são baseadas em colaboração dos usuários e não possuem vínculo oficial com entidades governamentais.</p>

      <p class="mb-4 font-semibold">5. Direitos Autorais</p>
      <p class="mb-4">O conteúdo da plataforma pertence ao time de desenvolvimento acadêmico, sendo vedada a reprodução sem autorização.</p>

      <p class="mb-4 font-semibold">6. Suspensão ou Cancelamento</p>
      <p class="mb-4">A plataforma se reserva o direito de suspender ou excluir contas que violem estes termos.</p>

      <p class="mb-4 font-semibold">7. Alterações</p>
      <p class="mb-4">Estes Termos de Uso podem ser atualizados periodicamente.</p>

      <p class="mb-4 font-semibold">8. Contato</p>
      <p class="mb-4">Para dúvidas ou sugestões, entre em contato pelo email: alanaabreu1103@gmail.com</p>
    </div>
  `,
})
export class TermosDeUsoComponent {
  constructor(private location: Location) {}
  voltar() {
    this.location.back();
  }
}
