import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { HeaderComponent, NavLink } from '../../shared/components/header/header.component';
import { BarraTituloComponent } from '../../shared/components/barra-titulo/barra-titulo.component';
import { UnidadeService } from '../../services/unidade.service';
import { UnidadePaginaDTO } from '../../models/unidade-pagina-dto';
import { renderStars, getStatusColorLotacao, getCapacityFromStatus } from '../../utils/rendering';

@Component({
  selector: 'app-unidade-detail',
  imports: [HeaderComponent, BarraTituloComponent],
  template: `
    <div class="w-full min-h-screen flex flex-col items-center justify-start">
      <app-header [navLinks]="navLinks" />
      <app-barra-titulo titulo="DETALHES DA UNIDADE" />

      @if (!unidade) {
        <div class="w-full min-h-screen flex flex-col items-center justify-center p-8">
          <h1 class="text-2xl font-bold text-red-600">Unidade não encontrada</h1>
          <p class="text-gray-600 mt-2">Verifique o ID da unidade na URL.</p>
        </div>
      } @else {
        <div class="flex flex-col md:flex-row w-11/12 md:w-3/5 p-4 md:p-8 text-verdeEscuro">
          <div class="flex justify-center md:w-2/5 mb-6 md:mb-0 md:mr-8">
            <img [src]="unidade.imagemURL" [alt]="unidade.nome" class="w-full md:w-[400px] h-auto md:h-[300px] rounded-lg shadow-lg" />
          </div>
          <div class="flex flex-col justify-center text-base md:text-lg md:w-3/5">
            <h2 class="text-xl md:text-2xl font-bold mb-4">{{ unidade.nome }}</h2>
            <div class="flex items-center mb-4 cursor-pointer" (click)="avaliacaoClicada()">
              @for (star of getEstrelas(unidade.nota); track $index) {
                @if (star === 'filled') {
                  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="black"><polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"/></svg>
                } @else if (star === 'half') {
                  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24">
                    <defs>
                      <clipPath [attr.id]="'halfStar' + $index">
                        <rect x="0" y="0" width="12" height="24"/>
                      </clipPath>
                    </defs>
                    <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" fill="none" stroke="black" stroke-width="2"/>
                    <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" fill="black" [attr.clip-path]="'url(#halfStar' + $index + ')'"/>
                  </svg>
                } @else {
                  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="black" stroke-width="2"><polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"/></svg>
                }
              }
              <span class="ml-2 text-xs text-gray-600">({{ unidade.nota }})</span>
            </div>
            <p class="mb-2"><span class="font-bold">Endereço:</span> {{ unidade.endereco.bairro.nome }}</p>
            <p class="mb-2"><span class="font-bold">Telefone:</span> {{ unidade.telefone }}</p>
            <p class="flex mb-2 font-bold items-center">
              Status: {{ unidade.status }}
              <span class="cursor-pointer ml-2" (click)="mostrarInfo = true">
                <svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="12" r="10"/><path d="M12 16v-4"/><path d="M12 8h.01"/></svg>
              </span>
            </p>
            @if (mostrarInfo) {
              <div class="fixed inset-0 bg-black/50 flex items-center justify-center z-50" (click)="mostrarInfo = false">
                <div class="bg-white rounded-lg p-6 max-w-md mx-4 shadow-xl" (click)="$event.stopPropagation()">
                  <h3 class="font-bold text-lg mb-4">Como avaliar o Status de lotação?</h3>
                  <ul class="space-y-3">
                    <li class="flex items-center gap-2"><span class="font-bold text-emerald-500">VAZIO</span>: O local está quase sem ninguém.</li>
                    <li class="flex items-center gap-2"><span class="font-bold text-emerald-500">POUCO VAZIO</span>: O local está com pouca gente.</li>
                    <li class="flex items-center gap-2"><span class="font-bold text-amber-500">MODERADO</span>: Quantidade moderada de pessoas.</li>
                    <li class="flex items-center gap-2"><span class="font-bold text-red-500">CHEIO</span>: O local está cheio.</li>
                    <li class="flex items-center gap-2"><span class="font-bold text-red-500">MUITO CHEIO</span>: O local está muito cheio.</li>
                  </ul>
                  <button (click)="mostrarInfo = false" class="mt-4 bg-gray-200 hover:bg-gray-300 px-4 py-1 rounded text-sm">Fechar</button>
                </div>
              </div>
            }
            <div class="flex mb-2">
              @for (icon of getUserIcons(unidade.status); track $index) {
                <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24" [attr.fill]="icon.preenchido ? 'currentColor' : 'none'" [attr.stroke]="icon.cor" [attr.stroke-width]="icon.preenchido ? '0' : '2'">
                  <path d="M19 21v-2a4 4 0 0 0-4-4H9a4 4 0 0 0-4 4v2"/><circle cx="12" cy="7" r="4"/>
                </svg>
              }
            </div>
            <p class="italic text-xs mb-4">{{ unidade.ultimaAtualizacao }}</p>
            <button class="h-10 font-bold bg-verdeEscuro text-white rounded-lg cursor-pointer" (click)="irParaRegistrarLotacao()">
              REGISTRAR LOTAÇÃO
            </button>
          </div>
        </div>

        <div class="mt-8 pt-8 border-t border-gray-200 w-4/5 p-4 md:p-20">
          <div class="flex items-center mb-4 gap-4">
            <h2 class="text-xl md:text-2xl font-bold text-verdeEscuro mb-4">Comentários</h2>
            <div class="flex">
              @for (a of [1,2,3,4]; track a) {
                <div class="w-8 h-8 rounded-full bg-gray-300 border-2 border-white -ml-2 first:ml-0 flex items-center justify-center text-xs font-bold text-gray-600">
                  <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M19 21v-2a4 4 0 0 0-4-4H9a4 4 0 0 0-4 4v2"/><circle cx="12" cy="7" r="4"/></svg>
                </div>
              }
            </div>
          </div>

          <div class="flex items-start mb-4">
            <div class="flex items-center justify-center rounded-full w-10 h-10 bg-gray-200 flex-shrink-0">
              <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M19 21v-2a4 4 0 0 0-4-4H9a4 4 0 0 0-4 4v2"/><circle cx="12" cy="7" r="4"/></svg>
            </div>
            <textarea
              placeholder="Adicione um comentário..."
              [value]="novoComentarioTexto"
              (input)="novoComentarioTexto = $any($event.target).value"
              class="w-full ml-4 p-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-verdeClaro resize-y min-h-[40px] text-gray-700"
            ></textarea>
          </div>
          <div class="flex my-4 justify-end gap-2">
            <button class="px-3 py-1 text-sm text-gray-700 hover:text-gray-900 rounded-md cursor-pointer" (click)="cancelarComentario()">Cancelar</button>
            <button class="px-3 py-1 text-sm bg-[#106A43] text-white rounded-md hover:bg-[#0c5033] cursor-pointer" (click)="adicionarComentario()">Enviar</button>
          </div>

          <div>
            @if (unidade.comentarios.length > 0) {
              @for (comentario of unidade.comentarios; track comentario.id) {
                <div class="flex items-start mb-6 p-4 border rounded-lg bg-white shadow-sm">
                  <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" class="text-gray-500 mr-3 mt-1 flex-shrink-0"><path d="M19 21v-2a4 4 0 0 0-4-4H9a4 4 0 0 0-4 4v2"/><circle cx="12" cy="7" r="4"/></svg>
                  <div>
                    <p class="font-bold text-base md:text-lg text-gray-900">{{ comentario.cliente.nome }}</p>
                    <p class="text-gray-800 mt-1 text-sm md:text-base">{{ comentario.texto }}</p>
                    <p class="text-sm text-gray-500 mt-2">{{ comentario.data }}</p>
                  </div>
                </div>
              }
            } @else {
              <p class="text-gray-600">Nenhum comentário ainda. Seja o primeiro a comentar!</p>
            }
          </div>
        </div>
      }
    </div>
  `,
})
export class UnidadeDetailComponent implements OnInit {
  navLinks: NavLink[] = [
    { id: 1, label: 'Registrar lotação', href: '/' },
    { id: 2, label: 'Ir para o mapa', href: '/mapa' },
    { id: 3, label: 'Ranking', href: '/ranking' },
    { id: 4, label: 'Entrar', href: '/entrar' },
    { id: 5, label: 'Sobre nós', href: '/sobre-nos' },
    { id: 6, label: 'Criar conta', href: '/criar-conta' },
    { id: 7, label: 'Configurações', href: '/perfil' },
  ];

  unidade: UnidadePaginaDTO | null = null;
  novoComentarioTexto = '';
  mostrarInfo = false;

  avaliacaoClicada() {
    alert('Avaliação clicada!');
  }

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private unidadeService: UnidadeService,
    private cdr: ChangeDetectorRef,
  ) {}

  ngOnInit() {
    if (typeof window !== 'undefined') window.scrollTo(0, 0);
    const id = this.route.snapshot.paramMap.get('id');
    if (id) {
      this.carregarUnidade(parseInt(id));
    }
  }

  async carregarUnidade(id: number) {
    try {
      this.unidade = await this.unidadeService.getUnidade(id);
    } catch (err) {
      console.error('Erro ao carregar unidade:', err);
    } finally {
      this.cdr.detectChanges();
    }
  }

  irParaRegistrarLotacao() {
    const id = this.route.snapshot.paramMap.get('id');
    if (id) {
      this.router.navigate(['/unidade', id, 'registrar-lotacao']);
    }
  }

  adicionarComentario() {
    if (this.novoComentarioTexto.trim() === '') {
      alert('Por favor, digite um comentário.');
      return;
    }
    alert('Comentário adicionado! (simulação)');
    this.novoComentarioTexto = '';
  }

  cancelarComentario() {
    this.novoComentarioTexto = '';
  }

  getEstrelas(nota: number): string[] {
    return renderStars(nota);
  }

  getUserIcons(status: string): { preenchido: boolean; cor: string }[] {
    const total = 5;
    const icons: { preenchido: boolean; cor: string }[] = [];
    const capacity = getCapacityFromStatus(status as any);
    const corMap: Record<string, string> = {
      'text-emerald-500': '#22c55e',
      'text-amber-500': '#eab308',
      'text-red-500': '#ef4444',
    };
    const colorClass = getStatusColorLotacao(status as any);
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
