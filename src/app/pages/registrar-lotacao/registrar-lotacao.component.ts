import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { HeaderComponent, NavLink } from '../../shared/components/header/header.component';
import { BarraTituloComponent } from '../../shared/components/barra-titulo/barra-titulo.component';
import { UnidadeService } from '../../services/unidade.service';
import { UsuarioService } from '../../services/usuario.service';
import { UnidadePaginaDTO } from '../../models/unidade-pagina-dto';
import { getStatusColor, getStatusArray } from '../../utils/rendering';

@Component({
  selector: 'app-registrar-lotacao',
  imports: [HeaderComponent, BarraTituloComponent],
  template: `
    <div class="flex flex-col w-full h-full bg-gray-100 min-h-screen">
      <app-header [navLinks]="navLinks" />
      <app-barra-titulo titulo="REGISTRAR LOTAÇÃO" />

      @if (!unidade) {
        <div class="w-full min-h-screen flex flex-col items-center justify-center p-8">
          <h1 class="text-2xl font-bold text-red-600">Erro: Unidade não encontrada</h1>
          <p class="text-gray-600">Verifique o ID na URL.</p>
        </div>
      } @else {
        <div class="flex flex-col w-full h-full flex-grow overflow-y-auto">
          <div class="flex flex-col lg:flex-row justify-between">
            <div class="flex items-center justify-center">
              <img [src]="unidade.imagemURL" alt="Imagem da unidade" class="w-full h-full object-cover max-h-96" />
            </div>

            <div class="flex flex-col justify-center py-8 gap-2 text-xl px-8">
              <h1 class="text-verdeEscuro font-bold text-3xl mb-4">Informações da unidade</h1>
              <h2 class="text-verdeEscuro font-bold text-2xl">{{ unidade.nome }}</h2>
              <span class="flex items-center italic text-verdeEscuro">
                <span>Ative as notificações dessa unidade</span>
                <svg xmlns="http://www.w3.org/2000/svg" class="ml-2" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M6 8a6 6 0 0 1 12 0c0 7 3 9 3 9H3s3-2 3-9"/><path d="M10.3 21a1.94 1.94 0 0 0 3.4 0"/></svg>
              </span>
              <span class="flex items-center">
                <svg xmlns="http://www.w3.org/2000/svg" class="mr-2" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"/><circle cx="12" cy="10" r="3"/></svg>
                Endereço: {{ unidade.endereco.bairro.nome }} - {{ unidade.endereco.rua }}
              </span>
              <span class="flex items-center">
                <svg xmlns="http://www.w3.org/2000/svg" class="mr-2" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"/></svg>
                Telefone: {{ unidade.telefone }}
              </span>
              <span class="flex items-center font-bold">
                <svg xmlns="http://www.w3.org/2000/svg" class="mr-2" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M23 21v-2a4 4 0 0 0-3-3.87"/><path d="M16 3.13a4 4 0 0 1 0 7.75"/></svg>
                Status: {{ unidade.status.split('_').join(' ') }}
              </span>
              <span class="italic flex items-center">
                <svg xmlns="http://www.w3.org/2000/svg" class="mr-2" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/></svg>
                {{ unidade.ultimaAtualizacao }}
              </span>
            </div>

            <div class="flex justify-center items-center">
              <div class="flex flex-col bg-verdePastel shadow-md rounded-2xl m-4 max-h-80">
                <span class="bg-[#0E6F4C] py-2 pl-4 text-white rounded-t-2xl font-bold">Como avaliar o Status de lotação?</span>
                <div class="flex flex-1 justify-center items-center p-4">
                  <ul class="flex flex-col gap-4 text-zinc-500 font-bold">
                    <li class="flex items-center gap-2">
                      <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#0E6F4C" stroke-width="2"><path d="M19 21v-2a4 4 0 0 0-4-4H9a4 4 0 0 0-4 4v2"/><circle cx="12" cy="7" r="4"/></svg>
                      VAZIO - está quase sem ninguém.
                    </li>
                    <li class="flex items-center gap-2">
                      <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#0E6F4C" stroke-width="2"><path d="M19 21v-2a4 4 0 0 0-4-4H9a4 4 0 0 0-4 4v2"/><circle cx="12" cy="7" r="4"/></svg>
                      POUCO VAZIO - está com pouca gente.
                    </li>
                    <li class="flex items-center gap-2">
                      <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#fe9a2e" stroke-width="2"><path d="M19 21v-2a4 4 0 0 0-4-4H9a4 4 0 0 0-4 4v2"/><circle cx="12" cy="7" r="4"/></svg>
                      MODERADO - quantidade moderada de pessoas.
                    </li>
                    <li class="flex items-center gap-2">
                      <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#fb2c36" stroke-width="2"><path d="M19 21v-2a4 4 0 0 0-4-4H9a4 4 0 0 0-4 4v2"/><circle cx="12" cy="7" r="4"/></svg>
                      CHEIO - está cheio.
                    </li>
                    <li class="flex items-center gap-2">
                      <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#fb2c36" stroke-width="2"><path d="M19 21v-2a4 4 0 0 0-4-4H9a4 4 0 0 0-4 4v2"/><circle cx="12" cy="7" r="4"/></svg>
                      MUITO CHEIO - está muito cheio.
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </div>

          <div class="bg-verdeEscuro px-8 py-4 flex flex-col justify-between gap-2">
            <span class="italic text-white text-2xl">
              Confirme os dados da unidade e selecione o Status de lotação:
            </span>

            <div class="flex gap-4 items-center justify-center">
              @for (status of statusArray; track status; let i = $index) {
                <div
                  class="cursor-pointer flex flex-col items-center"
                  (mouseenter)="hoveredIndex = i"
                  (mouseleave)="hoveredIndex = null"
                  (click)="selecionarStatus(i)"
                >
                  <svg xmlns="http://www.w3.org/2000/svg" width="64" height="64" viewBox="0 0 24 24" fill="none" [attr.stroke]="getCorIcone(i)" stroke-width="2">
                    <path d="M19 21v-2a4 4 0 0 0-4-4H9a4 4 0 0 0-4 4v2"/><circle cx="12" cy="7" r="4"/>
                  </svg>
                  <span class="text-white text-xs mt-1">{{ status.split('_').join(' ') }}</span>
                </div>
              }
            </div>

            <div class="flex justify-center gap-12">
              <button class="bg-white text-verdeEscuro rounded-2xl h-12 w-48 font-bold cursor-pointer" (click)="cancelar()">CANCELAR</button>
              <button class="bg-white text-verdeEscuro rounded-2xl h-12 w-48 font-bold cursor-pointer" (click)="enviarAtualizacao()">ENVIAR</button>
            </div>
          </div>
        </div>
      }
    </div>
  `,
})
export class RegistrarLotacaoComponent implements OnInit {
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
  hoveredIndex: number | null = null;
  selectedIndex: number | null = null;
  statusSelecionado = 'SEM_INFORMACAO';
  statusArray = getStatusArray();

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private unidadeService: UnidadeService,
    private usuarioService: UsuarioService,
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

  selecionarStatus(index: number) {
    this.selectedIndex = index;
    this.statusSelecionado = this.statusArray[index];
  }

  getCorIcone(index: number): string {
    const activeIndex = this.hoveredIndex !== null ? this.hoveredIndex : this.selectedIndex;
    if (activeIndex !== null && index <= activeIndex) {
      return getStatusColor(activeIndex);
    }
    return '#999999';
  }

  async enviarAtualizacao() {
    const id = this.route.snapshot.paramMap.get('id');
    if (!id) {
      alert('ID da unidade inválido');
      return;
    }

    const idNum = parseInt(id);
    if (isNaN(idNum)) {
      alert('ID da unidade inválido');
      return;
    }

    try {
      const resposta = await this.unidadeService.registrarAtualizacaoCompleta(
        this.statusSelecionado,
        this.usuarioService.usuarioAtual.usuarioId,
        idNum
      );
      console.log('Resposta do backend:', resposta);
      if (resposta?.statusUnidadeAtualizado) {
        this.unidade = this.unidade
          ? { ...this.unidade, status: resposta.statusUnidadeAtualizado }
          : null;
      }
      alert('Atualização enviada com sucesso!');
    } catch (error) {
      console.error('Erro ao enviar atualização:', error);
      alert('Erro ao enviar atualização.');
    }
  }

  cancelar() {
    this.router.navigate(['/']);
  }
}
