import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { HeaderComponent, NavLink } from '../../shared/components/header/header.component';
import { BarraTituloComponent } from '../../shared/components/barra-titulo/barra-titulo.component';
import { UnidadeService } from '../../services/unidade.service';
import { UsuarioService } from '../../services/usuario.service';
import { toast } from 'ngx-sonner';
import { UnidadePaginaDTO } from '../../models/unidade-pagina-dto';
import { getStatusColorLotacao, getCapacityFromStatus, getLocalUbsImage } from '../../utils/rendering';

@Component({
  selector: 'app-unidade-detail',
  imports: [HeaderComponent, BarraTituloComponent],
  template: `
    <div class="w-full min-h-screen flex flex-col">
      <app-header [navLinks]="navLinks" />
      <app-barra-titulo titulo="DETALHES DA UNIDADE" [mostrarVoltar]="true" (voltar)="voltar()" />

      @if (!unidade) {
        <div class="w-full min-h-screen flex flex-col items-center justify-center p-8">
          <h1 class="text-2xl font-bold text-red-600">Unidade não encontrada</h1>
          <p class="text-gray-600 mt-2">Verifique o ID da unidade na URL.</p>
        </div>
      } @else {
        <div class="w-3/5 mx-auto p-8 text-verdeEscuro">
          <div class="flex">
            <div class="flex w-2/5 mr-8">
              <img
                [src]="getLocalUbsImage(unidade.id)"
                [alt]="unidade.nome"
                class="w-[400px] h-[300px] object-cover rounded-lg shadow-lg"
              />
            </div>
            <div class="flex flex-col justify-center text-lg w-3/5">
              <h2 class="text-xl md:text-2xl font-bold mb-4">{{ unidade.nome }}</h2>

              <div class="flex items-center mb-4">
                <span class="font-bold mr-2">Avaliação:</span>
                @for (star of [1,2,3,4,5]; track star) {
                  <button
                    class="cursor-pointer p-0.5"
                    (mouseenter)="hoveredStar = star"
                    (mouseleave)="hoveredStar = 0"
                    (click)="avaliar(star)"
                  >
                    @if (star <= (hoveredStar || notaUsuario || 0)) {
                      <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="#facc15" stroke="#facc15" stroke-width="1">
                        <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"/>
                      </svg>
                    } @else {
                      <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#d1d5db" stroke-width="2">
                        <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"/>
                      </svg>
                    }
                  </button>
                }
                <span class="ml-2 text-xs text-gray-600">({{ unidade.nota }})</span>
              </div>

              <p class="mb-2">
                <span class="font-bold">Endereço:</span> {{ unidade.endereco.bairro.nome }}
              </p>
              <p class="mb-2"><span class="font-bold">Telefone:</span> {{ unidade.telefone }}</p>
              <p class="flex mb-2 font-bold items-center">
                Status: {{ unidade.status }}
                <span class="cursor-pointer ml-2" (click)="mostrarInfo = true">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="12"
                    height="12"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    stroke-width="2"
                  >
                    <circle cx="12" cy="12" r="10" />
                    <path d="M12 16v-4" />
                    <path d="M12 8h.01" />
                  </svg>
                </span>
              </p>
              @if (mostrarInfo) {
                <div
                  class="fixed inset-0 bg-black/50 flex items-center justify-center z-50"
                  (click)="mostrarInfo = false"
                >
                  <div
                    class="bg-white rounded-lg p-6 max-w-md mx-4 shadow-xl"
                    (click)="$event.stopPropagation()"
                  >
                    <h3 class="font-bold text-lg mb-4">Como avaliar o Status de lotação?</h3>
                    <ul class="space-y-3">
                      <li class="flex items-center gap-2">
                        <span class="font-bold text-emerald-500">VAZIO</span>: O local está quase sem
                        ninguém.
                      </li>
                      <li class="flex items-center gap-2">
                        <span class="font-bold text-emerald-500">POUCO VAZIO</span>: O local está com
                        pouca gente.
                      </li>
                      <li class="flex items-center gap-2">
                        <span class="font-bold text-amber-500">MODERADO</span>: Quantidade moderada de
                        pessoas.
                      </li>
                      <li class="flex items-center gap-2">
                        <span class="font-bold text-red-500">CHEIO</span>: O local está cheio.
                      </li>
                      <li class="flex items-center gap-2">
                        <span class="font-bold text-red-500">MUITO CHEIO</span>: O local está muito
                        cheio.
                      </li>
                    </ul>
                    <button
                      (click)="mostrarInfo = false"
                      class="mt-4 bg-gray-200 hover:bg-gray-300 px-4 py-1 rounded text-sm"
                    >
                      Fechar
                    </button>
                  </div>
                </div>
              }
              <div class="flex mb-2">
                @for (icon of getUserIcons(unidade.status); track $index) {
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="32"
                    height="32"
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
              <p class="italic text-xs mb-4">{{ unidade.ultimaAtualizacao }}</p>
              <button
                class="h-10 font-bold bg-verdeEscuro text-white rounded-lg cursor-pointer"
                (click)="irParaRegistrarLotacao()"
              >
                REGISTRAR LOTAÇÃO
              </button>
            </div>
          </div>
        </div>

        <div class="mt-8 pt-8 border-t border-gray-200 w-4/5 mx-auto p-20">
          <div class="flex items-center mb-4 gap-4">
            <h2 class="text-xl md:text-2xl font-bold text-verdeEscuro mb-4">Comentários</h2>
            <div class="flex">
              @for (a of [1, 2, 3, 4]; track a) {
                <div
                  class="w-8 h-8 rounded-full bg-gray-300 border-2 border-white -ml-2 first:ml-0 flex items-center justify-center text-xs font-bold text-gray-600"
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
                    <path d="M19 21v-2a4 4 0 0 0-4-4H9a4 4 0 0 0-4 4v2" />
                    <circle cx="12" cy="7" r="4" />
                  </svg>
                </div>
              }
            </div>
          </div>

          <div class="flex items-start mb-4">
            @if (usuarioFotoURL) {
              <img [src]="usuarioFotoURL" alt="" class="flex items-center justify-center rounded-full w-10 h-10 object-cover flex-shrink-0" />
            } @else {
              <div
                class="flex items-center justify-center rounded-full w-10 h-10 bg-gray-200 flex-shrink-0"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="20"
                  height="20"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  stroke-width="2"
                >
                  <path d="M19 21v-2a4 4 0 0 0-4-4H9a4 4 0 0 0-4 4v2" />
                  <circle cx="12" cy="7" r="4" />
                </svg>
              </div>
            }
            <textarea
              placeholder="Adicione um comentário..."
              [value]="novoComentarioTexto"
              (input)="novoComentarioTexto = $any($event.target).value"
              class="w-full ml-4 p-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-verdeClaro resize-y min-h-[40px] text-gray-700"
            ></textarea>
          </div>
          <div class="flex my-4 justify-end gap-2">
            <button
              class="px-3 py-1 text-sm text-gray-700 hover:text-gray-900 rounded-md cursor-pointer"
              (click)="cancelarComentario()"
            >
              Cancelar
            </button>
            <button
              class="px-3 py-1 text-sm bg-[#106A43] text-white rounded-md hover:bg-[#0c5033] cursor-pointer"
              (click)="adicionarComentario()"
            >
              Enviar
            </button>
          </div>

          <div>
            @if (unidade.comentarios.length > 0) {
              @for (comentario of unidade.comentarios; track comentario.id) {
                <div class="flex items-start mb-6 p-4 border rounded-lg bg-white shadow-sm">
                  @if (comentario.clienteFotoURL) {
                    <img [src]="comentario.clienteFotoURL" alt="" class="w-8 h-8 rounded-full object-cover mr-3 mt-1 flex-shrink-0" />
                  } @else {
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="32"
                      height="32"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      stroke-width="2"
                      class="text-gray-500 mr-3 mt-1 flex-shrink-0"
                    >
                      <path d="M19 21v-2a4 4 0 0 0-4-4H9a4 4 0 0 0-4 4v2" />
                      <circle cx="12" cy="7" r="4" />
                    </svg>
                  }
                  <div>
                    <p class="font-bold text-base md:text-lg text-gray-900">
                      {{ comentario.clienteNome }}
                    </p>
                    <p class="text-gray-800 mt-1 text-sm md:text-base">{{ comentario.texto }}</p>
                    <p class="text-sm text-gray-500 mt-2">{{ comentario.data_hora }}</p>
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
    { id: 4, label: 'Sobre nós', href: '/sobre-nos' },
    { id: 5, label: 'Perfil', href: '/perfil' },
  ];

  unidade: UnidadePaginaDTO | null = null;
  novoComentarioTexto = '';
  mostrarInfo = false;
  usuarioFotoURL: string | null = null;
  hoveredStar = 0;
  notaUsuario = 0;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private unidadeService: UnidadeService,
    private usuarioService: UsuarioService,
    private cdr: ChangeDetectorRef,
  ) {}

  ngOnInit() {
    if (typeof window !== 'undefined') window.scrollTo(0, 0);
    const usuario = this.usuarioService.usuarioAtual;
    this.usuarioFotoURL = usuario?.fotoURL || null;
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

  voltar() {
    this.router.navigate(['/']);
  }

  async avaliar(nota: number) {
    const usuario = this.usuarioService.usuarioAtual;
    if (!usuario?.usuarioId) {
      toast.info('Você precisa estar logado para avaliar.');
      return;
    }

    const id = this.route.snapshot.paramMap.get('id');
    if (!id) return;

    try {
      await this.unidadeService.avaliar(parseInt(id), usuario.usuarioId, nota);
      this.notaUsuario = nota;
      toast.success('Avaliação salva!');
      this.unidade = await this.unidadeService.getUnidade(parseInt(id));
      this.cdr.detectChanges();
    } catch (error) {
      console.error('Erro ao avaliar:', error);
      toast.error('Erro ao salvar avaliação.');
    }
  }

  irParaRegistrarLotacao() {
    const usuario = this.usuarioService.usuarioAtual;
    if (!usuario?.usuarioId) {
      toast.info('Você precisa estar logado para registrar lotação.');
      return;
    }

    const id = this.route.snapshot.paramMap.get('id');
    if (id) {
      this.router.navigate(['/unidade', id, 'registrar-lotacao']);
    }
  }

  async adicionarComentario() {
    if (this.novoComentarioTexto.trim() === '') {
      toast.error('Por favor, digite um comentário.');
      return;
    }

    const usuario = this.usuarioService.usuarioAtual;
    if (!usuario || !usuario.usuarioId) {
      toast.info('Você precisa estar logado para comentar.');
      return;
    }

    const id = this.route.snapshot.paramMap.get('id');
    if (!id) return;

    try {
      await this.unidadeService.adicionarComentario(
        parseInt(id),
        usuario.usuarioId,
        this.novoComentarioTexto.trim(),
      );
      this.novoComentarioTexto = '';
      this.unidade = await this.unidadeService.getUnidade(parseInt(id));
      this.cdr.detectChanges();
      toast.success('Comentário enviado!');
    } catch (error) {
      console.error('Erro ao adicionar comentário:', error);
      toast.error('Erro ao adicionar comentário.');
    }
  }

  cancelarComentario() {
    this.novoComentarioTexto = '';
  }

  getLocalUbsImage(id: number): string {
    return getLocalUbsImage(id);
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
