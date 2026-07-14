import {
  Component,
  ElementRef,
  HostListener,
  OnDestroy,
  ViewChild,
  afterNextRender,
  ChangeDetectorRef,
} from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { HeaderComponent, NavLink } from '../../shared/components/header/header.component';
import { UnidadeService } from '../../services/unidade.service';
import { UsuarioService } from '../../services/usuario.service';
import { UnidadeSaudeDTO } from '../../models/unidadesdto';
import { renderStars, getStatusColorLotacao, getCapacityFromStatus, getLocalUbsImage } from '../../utils/rendering';

@Component({
  selector: 'app-home',
  imports: [HeaderComponent, FormsModule],
  template: `
    <div class="w-full min-h-screen pt-16">
      <app-header [navLinks]="navLinks" />

      <div
        class="w-full py-14 bg-gradient-to-r from-[#004E4C] to-verdeClaro"
        style="boxShadow: 5px 5px 4px rgba(0, 0, 0, 0.25)"
      >
        <div class="relative w-full mx-auto">
          <div class="overflow-hidden">
            <div
              #carouselTrack
              class="flex -ml-4 md:-ml-20"
              [style.transform]="carouselTransform"
              [style.transition]="disableAnimation ? 'none' : 'transform 500ms ease-in-out'"
            >
              @for (slide of displayedSlides; track $index) {
                @if (slide.layout === 'hero') {
                  <div class="pb-4 min-w-0 shrink-0 grow-0 pl-4 md:pl-20 basis-auto">
                    <div
                      class="p-4 md:p-6 bg-white rounded-2xl shadow-sm w-[85vw] md:w-[700px] h-auto md:h-[200px] flex flex-col justify-between relative"
                      style="box-shadow: 5px 5px 4px rgba(0, 0, 0, 0.25)"
                    >
                      <div class="flex flex-row items-center justify-between">
                        <div class="flex flex-col w-full md:w-3/5">
                          <h1 class="text-xl md:text-3xl font-semibold text-gray-800 mb-2">
                            {{ slide.titulo }}
                          </h1>
                          <p class="text-base md:text-xl text-gray-600 mb-4">{{ slide.descricao }}</p>
                        </div>
                      </div>
                      <button
                        class="bg-[#106A43] hover:bg-[#0c5033] text-white text-base md:text-lg rounded-lg w-full md:w-4/12 py-2 mt-4 md:mt-0 md:absolute md:bottom-10 md:right-10"
                        (click)="slide.acao()"
                      >
                        {{ slide.botao }}
                      </button>
                    </div>
                  </div>
                } @else if (slide.layout === 'ods') {
                  <div class="pb-4 min-w-0 shrink-0 grow-0 pl-4 md:pl-20 basis-auto overflow-visible">
                    <div
                      class="p-6 md:p-10 bg-[#106A43] rounded-2xl shadow-sm text-white w-[85vw] md:w-[700px] h-auto md:h-[200px] flex flex-col md:flex-row justify-between items-center overflow-visible gap-4 md:gap-0"
                      style="box-shadow: 5px 5px 4px rgba(0, 0, 0, 0.25)"
                    >
                      <div class="flex flex-col w-full md:w-3/5">
                        <h1 class="text-xl md:text-3xl font-semibold mb-2">{{ slide.titulo }}</h1>
                        <p class="text-base md:text-xl mb-4">{{ slide.descricao }}</p>
                      </div>
                      <div class="flex justify-center md:justify-end w-full md:w-1/2">
                        <img
                          [src]="slide.imagem"
                          alt="ODS 3"
                          class="w-auto h-[80px] md:h-[150px] object-contain"
                        />
                      </div>
                    </div>
                  </div>
                } @else {
                  <div class="pb-4 min-w-0 shrink-0 grow-0 pl-4 md:pl-20 basis-auto">
                    <div
                      class="p-4 md:p-6 bg-white rounded-2xl shadow-sm w-[85vw] md:w-[700px] h-auto md:h-[200px] flex flex-col justify-between"
                      style="box-shadow: 5px 5px 4px rgba(0, 0, 0, 0.25)"
                    >
                      <div>
                        <h1 class="text-lg md:text-2xl font-semibold text-gray-800 mb-2">
                          {{ slide.titulo }}
                        </h1>
                        <p class="text-sm md:text-base text-gray-600 mb-4">{{ slide.descricao }}</p>
                      </div>
                      <button
                        class="bg-[#106A43] hover:bg-[#0c5033] text-white text-base md:text-lg rounded-lg w-full py-2"
                        (click)="slide.acao()"
                      >
                        {{ slide.botao }}
                      </button>
                    </div>
                  </div>
                }
              }
            </div>
          </div>
          <button
            class="absolute size-6 md:size-8 rounded-full top-1/2 left-2 md:left-4 -translate-y-1/2 border bg-white hover:bg-gray-100 flex items-center justify-center shadow-xs"
            (click)="slideAnterior()"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="16"
              height="16"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              stroke-width="2"
              stroke-linecap="round"
              stroke-linejoin="round"
            >
              <path d="m15 18-6-6 6-6" />
            </svg>
          </button>
          <button
            class="absolute size-6 md:size-8 rounded-full top-1/2 right-2 md:right-4 -translate-y-1/2 border bg-white hover:bg-gray-100 flex items-center justify-center shadow-xs"
            (click)="proximoSlide()"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="16"
              height="16"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              stroke-width="2"
              stroke-linecap="round"
              stroke-linejoin="round"
            >
              <path d="m9 18 6-6-6-6" />
            </svg>
          </button>
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
        <div
          class="flex items-center w-full md:w-6/12 justify-center md:justify-end h-full px-4 md:px-0 pb-2 md:pb-0"
        >
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
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="16"
              height="16"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              stroke-width="2"
            >
              <circle cx="11" cy="11" r="8" />
              <path d="m21 21-4.3-4.3" />
            </svg>
          </button>
        </div>
      </div>

      <div class="flex items-center ml-4 md:ml-20 mt-6 md:mt-10 gap-x-2">
        <span class="text-verdeEscuro text-xl md:text-2xl font-bold">Ordenar por</span>
        <select
          [(ngModel)]="ordenarPor"
          (ngModelChange)="aplicarOrdenacao()"
          class="ml-2 bg-white text-verdeEscuro border border-verdeClaro rounded-lg p-2 text-sm"
        >
          <option value="lotacao">Lotação</option>
          <option value="localizacao">Localização</option>
          <option value="status">Avaliação</option>
        </select>
      </div>

      <div
        class="grid grid-cols-1 md:grid-cols-3 pl-10 pr-10 place-items-center justify-center mt-8"
      >
        @for (card of unidadesFiltradas; track card.id) {
          <div
            class="flex flex-col relative bg-verdePastel w-11/12 pt-4 gap-6 mx-4 rounded-lg mb-6 shadow-[5px_5px_4px_rgba(0,0,0,0.25)]"
          >
            <!-- @if (!notificado) {
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="18"
                height="18"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                stroke-width="2"
                class="absolute top-2 right-9 cursor-pointer"
                (click)="notificar(card)"
              >
                <path d="M6 8a6 6 0 0 1 12 0c0 7 3 9 3 9H3s3-2 3-9" />
                <path d="M10.3 21a1.94 1.94 0 0 0 3.4 0" />
              </svg>
            } @else {
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="18"
                height="18"
                viewBox="0 0 24 24"
                fill="currentColor"
                stroke="currentColor"
                stroke-width="2"
                class="absolute top-2 right-9 cursor-pointer"
                (click)="notificar(card)"
              >
                <path d="M6 8a6 6 0 0 1 12 0c0 7 3 9 3 9H3s3-2 3-9" />
                <path d="M10.3 21a1.94 1.94 0 0 0 3.4 0" />
              </svg>
            } -->
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="18"
              height="18"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              stroke-width="2"
              class="absolute top-2 right-2 cursor-pointer"
              (click)="irParaDetalhes(card.id)"
            >
              <polyline points="15 3 21 3 21 9" />
              <polyline points="9 21 3 21 3 15" />
              <line x1="21" y1="3" x2="14" y2="10" />
              <line x1="3" y1="21" x2="10" y2="14" />
            </svg>

            <div class="flex flex-col md:flex-row flex-grow px-4 md:px-6">
              <div class="flex flex-row items-center w-full md:w-auto justify-center min-h-[150px] md:min-h-[200px]">
                <img
                  [src]="getLocalUbsImage(card.id)"
                  [alt]="card.nome"
                  class="w-full md:w-[300px] h-auto max-h-[180px] md:max-h-none object-contain"
                />
              </div>
              <div
                class="flex flex-col text-verdeEscuro w-full md:w-11/12 justify-center text-justify md:pl-4 gap-y-1 mt-2 md:mt-0"
              >
                <h1 class="text-base text-left font-bold">{{ card.nome }}</h1>
                <div class="flex items-center">
                  @for (star of getEstrelas(card.nota); track $index) {
                    @if (star === 'filled') {
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="18"
                        height="18"
                        viewBox="0 0 24 24"
                        fill="black"
                      >
                        <polygon
                          points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"
                        />
                      </svg>
                    } @else if (star === 'half') {
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="18"
                        height="18"
                        viewBox="0 0 24 24"
                      >
                        <defs>
                          <clipPath [attr.id]="'halfStarHome' + $index">
                            <rect x="0" y="0" width="12" height="24" />
                          </clipPath>
                        </defs>
                        <polygon
                          points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"
                          fill="none"
                          stroke="black"
                          stroke-width="2"
                        />
                        <polygon
                          points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"
                          fill="black"
                          [attr.clip-path]="'url(#halfStarHome' + $index + ')'"
                        />
                      </svg>
                    } @else {
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="18"
                        height="18"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="black"
                        stroke-width="2"
                      >
                        <polygon
                          points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"
                        />
                      </svg>
                    }
                  }
                </div>
                <p class="text-xs">
                  <span class="font-bold">Endereço:</span> {{ card.endereco.bairro.nome }} -
                  {{ card.endereco.rua }}
                </p>
                <p class="text-xs"><span class="font-bold">Telefone:</span> {{ card.telefone }}</p>
                <p class="font-bold text-sm">Status: {{ card.status.split('_').join(' ') }}</p>
                <div class="flex items-center">
                  @for (icon of getUserIcons(card.status); track $index) {
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="20"
                      height="20"
                      viewBox="0 0 24 24"
                      [attr.fill]="icon.preenchido ? icon.cor : 'none'"
                      [attr.stroke]="icon.preenchido ? icon.cor : '#999999'"
                      stroke-width="2"
                    >
                      <path d="M19 21v-2a4 4 0 0 0-4-4H9a4 4 0 0 0-4 4v2" />
                      <circle cx="12" cy="7" r="4" />
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
            <p>Carregando unidades...</p>
          </div>
        }
      </div>
    </div>
  `,
})
export class HomeComponent implements OnDestroy {
  @ViewChild('carouselTrack') carouselTrack!: ElementRef<HTMLElement>;

  navLinks: NavLink[] = [
    { id: 1, label: 'Registrar lotação', href: '/' },
    { id: 2, label: 'Ir para o mapa', href: '/mapa' },
    { id: 3, label: 'Ranking', href: '/ranking' },
    { id: 4, label: 'Sobre nós', href: '/sobre-nos' },
    { id: 5, label: 'Perfil', href: '/perfil' },
  ];

  slides = [
    {
      titulo: 'Atualize o status da sua unidade de saúde',
      descricao: 'Ajude outros usuários informando a situação atual das emergências.',
      botao: 'REGISTRAR LOTAÇÃO',
      acao: () => this.scrollParaBusca(),
      imagem: null,
      layout: 'hero',
    },
    {
      titulo: 'Seu impacto conta',
      descricao: 'Veja como suas contribuições ajudam a comunidade a se manter informada.',
      botao: 'VER MEUS PONTOS',
      acao: () => this.router.navigate(['/ranking']),
      imagem: null,
      layout: 'default',
    },
    {
      titulo: 'Objetivo 3: Saúde e Bem-Estar',
      descricao: 'Contribuindo para os Objetivos de Desenvolvimento Sustentável.',
      botao: 'SAIBA MAIS',
      acao: () => {},
      imagem: '/images/ods3.png',
      layout: 'ods',
    },
    {
      titulo: 'Descubra unidades próximas',
      descricao: 'Utilize o mapa para encontrar os hospitais e clínicas mais próximos de você.',
      botao: 'IR PARA O MAPA',
      acao: () => this.router.navigate(['/mapa']),
      imagem: null,
      layout: 'default',
    },
  ];

  private _displayedSlides = [this.slides[this.slides.length - 1], ...this.slides, this.slides[0]];
  get displayedSlides() { return this._displayedSlides; }

  private _currentIndex = 1;
  disableAnimation = false;
  private _transitioning = false;
  private _vw = 1200;
  private autoPlayInterval: any;

  get carouselTransform(): string {
    const cardW = this._vw < 768 ? this._vw * 0.85 : 700;
    const gap = this._vw < 768 ? cardW + 16 : 780;
    const offset = (this._vw - cardW) / 2 - this._currentIndex * gap;
    return `translateX(${offset}px)`;
  }

  unidades: UnidadeSaudeDTO[] = [];
  searchTerm = '';
  carregando = false;
  notificado = false;
  isSearchBarSticky = false;
  ordenarPor = 'lotacao';
  userLat: number | null = null;
  userLng: number | null = null;

  private statusOrder: Record<string, number> = {
    VAZIO: 1,
    POUCO_VAZIO: 2,
    MODERADO: 3,
    CHEIO: 4,
    MUITO_CHEIO: 5,
  };

  private calcularDistancia(lat1: number, lng1: number, lat2: number, lng2: number): number {
    const R = 6371;
    const dLat = ((lat2 - lat1) * Math.PI) / 180;
    const dLng = ((lng2 - lng1) * Math.PI) / 180;
    const a =
      Math.sin(dLat / 2) * Math.sin(dLat / 2) +
      Math.cos((lat1 * Math.PI) / 180) *
        Math.cos((lat2 * Math.PI) / 180) *
        Math.sin(dLng / 2) *
        Math.sin(dLng / 2);
    return R * 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
  }

  get unidadesFiltradas(): UnidadeSaudeDTO[] {
    let lista = this.unidades.filter(
      (card) => card.nome && card.nome.toLowerCase().includes(this.searchTerm.toLowerCase()),
    );

    switch (this.ordenarPor) {
      case 'lotacao':
        lista.sort((a, b) => (this.statusOrder[a.status] || 0) - (this.statusOrder[b.status] || 0));
        break;
      case 'localizacao':
        if (this.userLat !== null && this.userLng !== null) {
          lista.sort((a, b) => {
            if (a.lat == null || a.lng == null) return 1;
            if (b.lat == null || b.lng == null) return -1;
            return (
              this.calcularDistancia(this.userLat!, this.userLng!, a.lat, a.lng) -
              this.calcularDistancia(this.userLat!, this.userLng!, b.lat, b.lng)
            );
          });
        }
        break;
      case 'status':
        lista.sort((a, b) => b.nota - a.nota);
        break;
    }

    return lista;
  }

  constructor(
    private unidadeService: UnidadeService,
    private usuarioService: UsuarioService,
    private router: Router,
    private cdr: ChangeDetectorRef,
  ) {
    afterNextRender(() => {
      this._vw = document.documentElement.clientWidth;
      this.carregarUnidades();
      this.iniciarAutoPlay();
      this.obterLocalizacao();

      window.addEventListener('resize', () => {
        this._vw = document.documentElement.clientWidth;
      });

      this.carouselTrack.nativeElement.addEventListener('transitionend', () => {
        if (!this._transitioning) return;
        if (this._currentIndex >= this.displayedSlides.length - 1) {
          this.disableAnimation = true;
          this._currentIndex = 1;
          this.cdr.detectChanges();
          requestAnimationFrame(() => {
            this.disableAnimation = false;
            this._transitioning = false;
          });
        } else if (this._currentIndex <= 0) {
          this.disableAnimation = true;
          this._currentIndex = this.displayedSlides.length - 2;
          this.cdr.detectChanges();
          requestAnimationFrame(() => {
            this.disableAnimation = false;
            this._transitioning = false;
          });
        } else {
          this._transitioning = false;
        }
      });
    });
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
    this.carregando = true;
    try {
      this.unidades = await this.unidadeService.getUnidades();
      console.log('[Home] carregarUnidades concluiu, unidades recebidas:', this.unidades?.length);
    } catch (err) {
      console.error('[Home] Erro ao carregar unidades:', err);
    } finally {
      this.carregando = false;
      this.cdr.detectChanges();
    }
  }

  obterLocalizacao() {
    if (typeof navigator !== 'undefined' && navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          this.userLat = position.coords.latitude;
          this.userLng = position.coords.longitude;
          this.cdr.detectChanges();
        },
        () => {
          console.warn('Localização não disponível. Ordenação por localização desativada.');
        },
      );
    }
  }

  aplicarOrdenacao() {
    this.cdr.detectChanges();
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
    if (typeof window !== 'undefined') window.scrollTo({ top: 350, behavior: 'smooth' });
  }

  proximoSlide() {
    if (this._transitioning) return;
    this._transitioning = true;
    this._currentIndex++;
    this.reiniciarAutoPlay();
  }

  slideAnterior() {
    if (this._transitioning) return;
    this._transitioning = true;
    this._currentIndex--;
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

  getLocalUbsImage(id: number): string {
    return getLocalUbsImage(id);
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
