import { Component, HostListener, OnInit, OnDestroy } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { HeaderComponent, NavLink } from '../../shared/components/header/header.component';
import { UnidadeService } from '../../services/unidade.service';
import { UsuarioService } from '../../services/usuario.service';
import { UnidadeSaudeDTO } from '../../models/unidadesdto';
import { renderStars, getStatusColorLotacao, getCapacityFromStatus } from '../../utils/rendering';

@Component({
  selector: 'app-home',
  imports: [HeaderComponent],
  template: `
    <div class="w-full min-h-screen pt-16">
      <app-header [navLinks]="navLinks" />

      <div class="w-full py-8 md:py-14 bg-gradient-to-r from-[#004E4C] to-verdeClaro" style="boxShadow: 5px 5px 4px rgba(0, 0, 0, 0.25)">
        <div class="relative w-full overflow-hidden px-4">
          <div class="flex transition-transform duration-500 ease-in-out" [style.transform]="'translateX(-' + (slideAtual * 100) + '%)'">
            @for (slide of slides; track slide; let i = $index) {
              <div class="w-full md:w-[700px] shrink-0 px-2 md:px-5">
                <div class="p-4 md:p-6 bg-white rounded-2xl shadow-sm min-h-[160px] md:min-h-[200px] flex flex-col justify-between relative" style="boxShadow: 5px 5px 4px rgba(0, 0, 0, 0.25)">
                  <div class="flex flex-col">
                    <h1 class="text-xl md:text-3xl font-semibold text-gray-800 mb-2">{{ slide.titulo }}</h1>
                    <p class="text-sm md:text-xl text-gray-600 mb-4">{{ slide.descricao }}</p>
                  </div>
                  <button
                    class="bg-[#106A43] hover:bg-[#0c5033] text-white text-sm md:text-lg rounded-lg px-4 py-2 md:w-4/12 flex items-center justify-center"
                    (click)="slide.acao()"
                  >
                    {{ slide.botao }}
                  </button>
                </div>
              </div>
            }
          </div>
          <button class="absolute left-2 top-1/2 -translate-y-1/2 bg-white/80 rounded-full p-2 hover:bg-white" (click)="slideAnterior()">❮</button>
          <button class="absolute right-2 top-1/2 -translate-y-1/2 bg-white/80 rounded-full p-2 hover:bg-white" (click)="proximoSlide()">❯</button>
        </div>
      </div>

      <div
        #searchBar
        class="sticky top-16 z-40 flex flex-col md:flex-row w-full items-center bg-verdeEscuro transition-all duration-300"
        [class.h-16]="isSearchBarSticky"
        [class.h-24]="!isSearchBarSticky"
        style="boxShadow: 4px 8px 15px rgba(0, 0, 0, 0.25)"
      >
        <div
          class="flex items-center justify-center md:justify-start pl-0 md:pl-32 text-white font-semibold transition-all duration-300"
          [class.text-xl]="isSearchBarSticky"
          [class.text-2xl]="!isSearchBarSticky"
          [class.h-full]="!isSearchBarSticky"
        >
          <h1>EMERGÊNCIAS E UPAS</h1>
        </div>
        <div class="flex items-center w-full md:w-6/12 justify-center md:justify-end h-full px-4 md:px-0 pb-2 md:pb-0">
          <input
            type="text"
            placeholder="Pesquisar por nome da unidade de saúde..."
            [value]="searchTerm"
            (input)="searchTerm = $any($event.target).value"
            class="w-3/4 px-4 bg-white text-xs rounded-l-lg focus:outline-none focus:ring-2 focus:ring-verdeClaro transition-all duration-300"
            [class.h-9]="isSearchBarSticky"
            [class.h-12]="!isSearchBarSticky"
          />
          <button
            class="flex items-center justify-center w-12 bg-verdeClaro text-white rounded-r-lg transition-all duration-300"
            [class.h-9]="isSearchBarSticky"
            [class.h-12]="!isSearchBarSticky"
          >
            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="11" cy="11" r="8"/><path d="m21 21-4.3-4.3"/></svg>
          </button>
        </div>
      </div>

      <div class="flex items-center ml-4 md:ml-20 mt-6 md:mt-10 gap-x-2">
        <span class="text-verdeEscuro text-xl md:text-2xl font-bold">Ordenar por</span>
        <select class="ml-2 bg-white text-verdeEscuro border border-verdeClaro rounded-lg p-2 text-sm">
          <option value="lotacao">Lotação</option>
          <option value="localizacao">Localização</option>
          <option value="status">Status</option>
        </select>
      </div>

      <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 px-4 md:pl-10 md:pr-10 place-items-center justify-center mt-8">
        @for (card of unidadesFiltradas; track card.id) {
          <div class="flex flex-col relative bg-verdePastel w-full mx-4 rounded-lg mb-6 shadow-[5px_5px_4px_rgba(0,0,0,0.25)]">
            @if (!notificado) {
            <svg
              xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"
              class="absolute top-2 right-9 cursor-pointer"
              (click)="notificar(card)"
            >
              <path d="M6 8a6 6 0 0 1 12 0c0 7 3 9 3 9H3s3-2 3-9"/><path d="M10.3 21a1.94 1.94 0 0 0 3.4 0"/>
            </svg>
            } @else {
            <svg
              xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="currentColor" stroke="currentColor" stroke-width="2"
              class="absolute top-2 right-9 cursor-pointer"
              (click)="notificar(card)"
            >
              <path d="M6 8a6 6 0 0 1 12 0c0 7 3 9 3 9H3s3-2 3-9"/><path d="M10.3 21a1.94 1.94 0 0 0 3.4 0"/>
            </svg>
            }
            <svg
              xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"
              class="absolute top-2 right-2 cursor-pointer"
              (click)="irParaDetalhes(card.id)"
            >
              <polyline points="15 3 21 3 21 9"/><polyline points="9 21 3 21 3 15"/><line x1="21" y1="3" x2="14" y2="10"/><line x1="3" y1="21" x2="10" y2="14"/>
            </svg>

            <div class="flex flex-col md:flex-row flex-grow p-4">
              <div class="flex items-center justify-center w-full md:w-auto min-h-[150px]">
                <img [src]="card.imagemURL" [alt]="card.nome" class="w-[200px] md:w-[300px] h-auto object-contain" />
              </div>
              <div class="flex flex-col text-verdeEscuro w-full justify-center text-justify pl-0 md:pl-4 gap-y-1 mt-4 md:mt-0">
                <h1 class="text-base text-left font-bold">{{ card.nome }}</h1>
                <div class="flex items-center">
                  @for (star of getEstrelas(card.nota); track star) {
                    @if (star === 'filled') {
                      <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="black"><polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"/></svg>
                    } @else if (star === 'half') {
                      <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="black"><polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"/></svg>
                    } @else {
                      <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="black" stroke-width="2"><polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"/></svg>
                    }
                  }
                </div>
                <p class="text-xs"><span class="font-bold">Endereço:</span> {{ card.endereco.bairro.nome }} - {{ card.endereco.rua }}</p>
                <p class="text-xs"><span class="font-bold">Telefone:</span> {{ card.telefone }}</p>
                <p class="font-bold text-sm">Status: {{ card.status.split('_').join(' ') }}</p>
                <div class="flex items-center">
                  @for (icon of getUserIcons(card.status); track icon) {
                    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" [attr.stroke]="icon.cor" stroke-width="2" [class.fill-current]="icon.preenchido">
                      <path d="M19 21v-2a4 4 0 0 0-4-4H9a4 4 0 0 0-4 4v2"/><circle cx="12" cy="7" r="4"/>
                    </svg>
                  }
                </div>
                <span class="text-xs italic">{{ card.ultimaAtualizacao }}</span>
              </div>
            </div>
            <button
              class="bg-verdeEscuro w-full text-white py-2 px-4 rounded-b-lg"
              (click)="irParaRegistrarLotacao(card.id)"
            >
              REGISTRAR LOTAÇÃO
            </button>
          </div>
        } @empty {
          <div class="col-span-full text-center text-gray-500 py-8">
            @if (carregando) {
              <p>Carregando unidades...</p>
            } @else {
              <p>Nenhuma unidade encontrada.</p>
            }
          </div>
        }
      </div>
    </div>
  `,
})
export class HomeComponent implements OnInit, OnDestroy {
  navLinks: NavLink[] = [
    { id: 1, label: 'Registrar lotação', href: '/' },
    { id: 2, label: 'Ir para o mapa', href: '/mapa' },
    { id: 3, label: 'Ranking', href: '/ranking' },
    { id: 4, label: 'Entrar', href: '/entrar' },
    { id: 5, label: 'Criar conta', href: '/criar-conta' },
    { id: 6, label: 'Sobre nós', href: '/sobre-nos' },
    { id: 7, label: 'Configurações', href: '/perfil' },
  ];

  slides = [
    { titulo: 'Atualize o status da sua unidade de saúde', descricao: 'Ajude outros usuários informando a situação atual das emergências.', botao: 'REGISTRAR LOTAÇÃO', acao: () => this.scrollParaBusca() },
    { titulo: 'Seu impacto conta', descricao: 'Veja como suas contribuições ajudam a comunidade a se manter informada.', botao: 'VER MEUS PONTOS', acao: () => {} },
    { titulo: 'Objetivo 3: Saúde e Bem-Estar', descricao: 'Contribuindo para os Objetivos de Desenvolvimento Sustentável.', botao: 'SAIBA MAIS', acao: () => {} },
    { titulo: 'Descubra unidades próximas', descricao: 'Utilize o mapa para encontrar os hospitais e clínicas mais próximos de você.', botao: 'IR PARA O MAPA', acao: () => this.router.navigate(['/mapa']) },
  ];

  slideAtual = 0;
  private autoPlayInterval: any;

  unidades: UnidadeSaudeDTO[] = [];
  searchTerm = '';
  carregando = true;
  notificado = false;
  isSearchBarSticky = false;

  get unidadesFiltradas(): UnidadeSaudeDTO[] {
    return this.unidades.filter(card =>
      card.nome.toLowerCase().includes(this.searchTerm.toLowerCase())
    );
  }

  constructor(
    private unidadeService: UnidadeService,
    private usuarioService: UsuarioService,
    private router: Router
  ) {}

  ngOnInit() {
    this.carregarUnidades();
    this.iniciarAutoPlay();
  }

  ngOnDestroy() {
    this.pararAutoPlay();
  }

  private iniciarAutoPlay() {
    this.autoPlayInterval = setInterval(() => {
      this.proximoSlide();
    }, 5000);
  }

  private pararAutoPlay() {
    if (this.autoPlayInterval) {
      clearInterval(this.autoPlayInterval);
      this.autoPlayInterval = null;
    }
  }

  async carregarUnidades() {
    try {
      this.unidades = await this.unidadeService.getUnidades();
    } catch (err) {
      console.error('Erro ao carregar unidades:', err);
    } finally {
      this.carregando = false;
    }
  }

  @HostListener('window:scroll')
  onScroll() {
    const searchBar = document.querySelector('.sticky.top-16');
    if (searchBar) {
      const rect = searchBar.getBoundingClientRect();
      this.isSearchBarSticky = rect.top <= 64;
    }
  }

  scrollParaBusca() {
    window.scrollTo({ top: 350, behavior: 'smooth' });
  }

  proximoSlide() {
    this.slideAtual = (this.slideAtual + 1) % this.slides.length;
    this.reiniciarAutoPlay();
  }

  slideAnterior() {
    this.slideAtual = (this.slideAtual - 1 + this.slides.length) % this.slides.length;
    this.reiniciarAutoPlay();
  }

  private reiniciarAutoPlay() {
    this.pararAutoPlay();
    this.iniciarAutoPlay();
  }

  irParaDetalhes(id: number) {
    this.router.navigate(['/unidade', id]);
  }

  irParaRegistrarLotacao(id: number) {
    this.router.navigate(['/unidade', id, 'registrar-lotacao']);
  }

  notificar(card: UnidadeSaudeDTO) {
    const email = this.usuarioService.usuarioAtual?.email;
    this.notificado = !this.notificado;
  }

  getEstrelas(nota: number): string[] {
    return renderStars(nota);
  }

  getUserIcons(status: string): { preenchido: boolean; cor: string }[] {
    const total = 5;
    const icons: { preenchido: boolean; cor: string }[] = [];
    const capacity = getCapacityFromStatus(status as any);
    const colorClass = getStatusColorLotacao(status as any);
    const corMap: Record<string, string> = {
      'text-emerald-500': '#22c55e',
      'text-amber-500': '#eab308',
      'text-red-500': '#ef4444',
      'text-zinc-500': '#71717a',
    };
    const cor = corMap[colorClass] || '#999999';

    for (let i = 0; i < capacity; i++) {
      icons.push({ preenchido: true, cor });
    }
    for (let i = 0; i < total - capacity; i++) {
      icons.push({ preenchido: false, cor: '#999999' });
    }
    return icons;
  }
}
