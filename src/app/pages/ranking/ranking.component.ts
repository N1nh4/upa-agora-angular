import { Component, OnInit } from '@angular/core';
import { HeaderComponent, NavLink } from '../../shared/components/header/header.component';
import { ClienteService } from '../../services/cliente.service';
import { ClienteRankingDTO } from '../../models/cliente-ranking-dto';
import { environment } from '../../../environments/environment';

@Component({
  selector: 'app-ranking',
  imports: [HeaderComponent],
  template: `
    <div>
      <div class="fixed top-0 left-0 w-screen h-screen -z-10" style="background-color: #DAE5DD"></div>
      <app-header [navLinks]="navLinks" />

      <div class="container mx-auto px-4 pt-6">
        <div class="bg-white rounded-lg shadow-md p-4 md:p-6 max-w-[90%] md:max-w-[56%] mx-auto mb-20 flex justify-center items-end relative mt-6 min-h-[300px]">
          @if (topRanked[0]) {
            <div class="absolute top-4" style="left: 50%; transform: translateX(-50%)">
              <svg class="w-10 h-8 md:w-12 md:h-10 text-yellow-300" viewBox="0 0 24 24" fill="currentColor"><path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/></svg>
            </div>
          }

          @for (user of displayOrderTopRanked; track user.nome; let i = $index) {
            <div class="flex flex-col items-center mx-3 md:mx-7">
              @if (getRankingOriginal(user) === 1) {
                <div class="mb-4 md:mb-9"></div>
              }
              <div class="rounded-full w-20 h-20 md:w-28 md:h-28 flex items-center justify-center mb-4 md:mb-7" style="background-color: #eaddff">
                <svg xmlns="http://www.w3.org/2000/svg" class="w-18 h-18 md:w-26 md:h-26" viewBox="0 0 24 24" fill="none" stroke="#523a8c" stroke-width="1.5"><path d="M19 21v-2a4 4 0 0 0-4-4H9a4 4 0 0 0-4 4v2"/><circle cx="12" cy="7" r="4"/></svg>
              </div>
              <p class="font-bold text-lg md:text-2xl text-green-800 text-center">{{ user.nome }}</p>
              <p class="text-lg md:text-xl font-bold">{{ user.contribuicoes }}</p>
            </div>
          }
        </div>

        <div class="grid grid-cols-2 text-green-900 font-bold text-base md:text-lg border-b pb-2 mb-4 px-4">
          <div>Classificação</div>
          <div class="text-right">Contribuições</div>
        </div>

        @for (item of rankingData; track $index) {
          <div class="flex items-center justify-between mx-auto max-w-[90%] md:max-w-[90%] bg-white rounded-2xl mb-5 p-3 md:p-3 shadow">
            <div class="flex items-center space-x-2 md:space-x-3">
              <span class="ml-2 md:ml-3 font-bold text-lg md:text-2xl">{{ $index + 1 }}</span>
              <div class="ml-4 md:ml-15 w-10 h-10 md:w-12 md:h-12 rounded-full flex items-center justify-center" style="background-color: #eaddff">
                <svg xmlns="http://www.w3.org/2000/svg" class="w-9 h-9 md:w-11 md:h-11" viewBox="0 0 24 24" fill="none" stroke="#523a8c" stroke-width="1.5"><path d="M19 21v-2a4 4 0 0 0-4-4H9a4 4 0 0 0-4 4v2"/><circle cx="12" cy="7" r="4"/></svg>
              </div>
              <div class="ml-4 md:ml-10 font-bold text-green-900 text-lg md:text-2xl">{{ item.nome }}</div>
            </div>
            <div class="font-bold text-lg md:text-2xl mr-4 md:mr-9">{{ item.contribuicoes }}</div>
          </div>
        }
      </div>
    </div>
  `,
})
export class RankingComponent implements OnInit {
  navLinks: NavLink[] = [
    { id: 1, label: 'Registrar lotação', href: '/' },
    { id: 2, label: 'Ir para o mapa', href: '/mapa' },
    { id: 3, label: 'Ranking', href: '/ranking' },
    { id: 4, label: 'Entrar', href: '/entrar' },
    { id: 5, label: 'Criar conta', href: '/criar-conta' },
    { id: 6, label: 'Sobre nós', href: '/sobre-nos' },
    { id: 7, label: 'Configurações', href: '/perfil' },
  ];

  rankingData: ClienteRankingDTO[] = [];

  get topRanked(): ClienteRankingDTO[] {
    return this.rankingData.slice(0, 3);
  }

  get displayOrderTopRanked(): ClienteRankingDTO[] {
    const top = this.topRanked;
    const order: ClienteRankingDTO[] = [];
    if (top[1]) order.push(top[1]);
    if (top[0]) order.push(top[0]);
    if (top[2]) order.push(top[2]);
    return order;
  }

  constructor(private clienteService: ClienteService) {}

  async ngOnInit() {
    try {
      const response = await fetch(`${environment.apiUrl}/ranking`);
      if (response.ok) {
        this.rankingData = await response.json();
      }
    } catch (error) {
      console.error('Erro ao carregar ranking:', error);
    }
  }

  getRankingOriginal(user: ClienteRankingDTO): number {
    const top = this.topRanked;
    if (user === top[0]) return 1;
    if (user === top[1]) return 2;
    if (user === top[2]) return 3;
    return -1;
  }
}
