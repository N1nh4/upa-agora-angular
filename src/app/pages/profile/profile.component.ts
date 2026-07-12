import { Component, ElementRef, ViewChild, afterNextRender, ChangeDetectorRef } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { HeaderComponent, NavLink } from '../../shared/components/header/header.component';
import { UsuarioService } from '../../services/usuario.service';
import { toast } from 'ngx-sonner';
import { environment } from '../../../environments/environment';

@Component({
  selector: 'app-profile',
  imports: [HeaderComponent, FormsModule],
  template: `
    <div class="relative overflow-x-hidden">
      <div class="fixed top-0 left-0 w-screen h-48 md:h-screen bg-gradient-to-r from-verdeClaro to-verdeClaro -z-10" style="clipPath: polygon(0 0, 100% 0, 100% 30%, 0 80%)"></div>
      <app-header [navLinks]="navLinks" />

      <div class="w-full flex flex-col md:flex-row">
        <div class="flex flex-col items-center md:items-start justify-center w-full md:w-1/3 z-20 pt-4 md:pl-30 md:mt-25">
          <div class="mt-16 md:mt-16 text-center md:text-left text-white z-9">
            <h1 class="font-bold text-3xl md:text-[200%]">GERENCIAMENTO</h1>
            <h1 class="font-bold text-3xl md:text-[200%] mt-[-4px] md:mt-[-12px]">DE CONTA</h1>
          </div>

          <div class="text-center md:text-left text-black mt-4 md:mt-10 w-80 z-9 px-4 md:px-0">
            <p class="text-sm md:text-xl leading-none">Preencha ou edite os campos abaixo e salve as alterações para manter seu perfil atualizado.</p>
          </div>

          <div class="flex flex-col items-center justify-center z-20 mt-8 md:mt-16">
            @if (fotoUrl) {
              <img [src]="fotoUrl" alt="Foto do usuário" class="relative rounded-full w-[110px] h-[110px] object-cover cursor-pointer" (click)="fileInput.click()" />
            } @else {
              <svg xmlns="http://www.w3.org/2000/svg" class="relative rounded-full bg-blue-100 cursor-pointer w-[110px] h-[110px]" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1" (click)="fileInput.click()"><path d="M19 21v-2a4 4 0 0 0-4-4H9a4 4 0 0 0-4 4v2"/><circle cx="12" cy="7" r="4"/></svg>
            }
            <div class="relative ml-[62px] mt-[-25px] w-10 h-10 bg-amber-50 z-20 rounded-full flex items-center justify-center cursor-pointer" (click)="fileInput.click()">
              <svg xmlns="http://www.w3.org/2000/svg" class="text-emerald-800 w-7 h-7" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="3.5"><path d="M23 19a2 2 0 0 1-2 2H3a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h4l2-3h6l2 3h4a2 2 0 0 1 2 2z"/><circle cx="12" cy="13" r="4"/></svg>
            </div>
            <input #fileInput type="file" accept="image/*" class="hidden" (change)="onFileSelected($event)" />
          </div>
        </div>

        <div class="flex flex-col items-center md:items-start justify-center pt-4 md:pt-20 w-full px-4 md:px-0">
          <div class="w-full md:w-220 mt-6 md:mt-10 rounded-xl overflow-hidden flex flex-col md:flex-row shadow-[5px_5px_4px_rgba(0,0,0,0.25)]">
            <div class="w-full md:w-3/8 bg-gray-200 p-4 md:p-0">
              <div class="z-9 text-emerald-800 md:ml-5 md:mt-10">
                <h1 class="font-bold text-xl md:text-[200%] leading-none">Informações Pessoais</h1>
              </div>
              <div class="z-9 text-black md:ml-5 mt-2 md:mt-5">
                <p class="text-xs md:text-base leading-none">Essa informação é particular e não será compartilhada com outras pessoas.</p>
              </div>
            </div>

            <div class="w-full md:w-5/8 bg-gray-50 shadow-[5px_5px_4px_rgba(0,0,0,0.25)]">
              <div class="flex flex-col items-start justify-center p-4 md:p-0">
                <div class="w-full md:w-55 h-12 md:ml-15 mt-4 md:mt-[7%] rounded-lg overflow-hidden flex">
                  <div class="w-full bg-gray-200">
                    <div class="z-9 text-gray-400 ml-2 mt-1">
                      <h1 class="font-bold text-[70%] leading-none">NOME:</h1>
                    </div>
                    <input id="nome" type="text" class="ml-2 w-full" [(ngModel)]="nome" />
                  </div>
                </div>
                <div class="w-full md:w-39.5 h-12 md:ml-15 mt-3 md:mt-[5.5%] rounded-lg overflow-hidden flex">
                  <div class="w-full bg-gray-200">
                    <div class="z-9 text-gray-400 ml-2 mt-1">
                      <h1 class="font-bold text-[70%] leading-none">DATA DE NASCIMENTO:</h1>
                    </div>
                    <input id="data" type="date" class="ml-2 w-full" [(ngModel)]="dataNascimento" />
                  </div>
                </div>
              </div>
            </div>

            <div class="w-full md:w-5/8 bg-gray-50">
              <div class="flex flex-col items-start justify-center p-4 md:p-0">
                <div class="w-full md:w-55 h-12 md:ml-[5%] mt-4 md:mt-[6.55%] rounded-lg overflow-hidden flex">
                  <div class="w-full bg-gray-200">
                    <div class="z-9 text-gray-400 ml-2 mt-1">
                      <h1 class="font-bold text-[70%] leading-none">CIDADE/ESTADO:</h1>
                    </div>
                    <input id="cidade/estado" type="text" class="ml-2 w-full" [(ngModel)]="cidadeEstado" />
                  </div>
                </div>
                <div class="w-full md:w-70 h-12 md:ml-[-17%] mt-3 md:mt-[6%] rounded-lg overflow-hidden flex">
                  <div class="w-full bg-gray-200">
                    <div class="z-9 text-gray-400 ml-2 mt-1">
                      <h1 class="font-bold text-[70%] leading-none">ENDERECO DE EMAIL:</h1>
                    </div>
                    <input id="email" type="text" class="ml-2 w-full" [(ngModel)]="email" />
                  </div>
                </div>
                <div class="w-40 h-8 mt-6 md:mt-[15%] rounded-xl overflow-hidden flex cursor-pointer self-end mr-4 md:ml-[24%]" (click)="salvarInformacoesPessoais()">
                  <div class="w-full bg-emerald-700 flex items-center justify-center">
                    <h1 class="font-bold text-[70%] leading-none text-white">SALVAR ALTERAÇÕES</h1>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div class="w-full md:w-220 mt-6 md:mt-10 mb-10 rounded-xl overflow-hidden flex flex-col md:flex-row shadow-[5px_5px_4px_rgba(0,0,0,0.25)]">
            <div class="w-full md:w-3/8 bg-gray-200 p-4 md:p-0">
              <div class="z-9 text-emerald-800 md:ml-5 md:mt-10">
                <h1 class="font-bold text-xl md:text-[200%] leading-none">Informações Complementares</h1>
              </div>
              <div class="z-9 text-black md:ml-5 mt-2 md:mt-5">
                <p class="text-xs md:text-base leading-none">Essa informação é particular e não será compartilhada com outras pessoas.</p>
              </div>
            </div>
            <div class="w-full md:w-5/8 bg-gray-50">
              <div class="flex flex-col items-start justify-center p-4 md:p-0">
                <div class="w-full md:w-55 h-12 md:ml-15 mt-4 md:mt-[7%] rounded-lg overflow-hidden flex">
                  <div class="w-full bg-gray-200">
                    <div class="z-9 text-gray-400 ml-2 mt-1">
                      <h1 class="font-bold text-[70%] leading-none">TELEFONE:</h1>
                    </div>
                    <input id="telefone" type="text" class="ml-2 w-full" [(ngModel)]="telefone" />
                  </div>
                </div>
                <div class="w-full md:w-30 h-12 md:ml-15 mt-3 md:mt-[5.5%] rounded-lg overflow-hidden flex">
                  <div class="w-full bg-gray-200">
                    <div class="z-9 text-gray-400 ml-2 mt-1">
                      <h1 class="font-bold text-[70%] leading-none">N°:</h1>
                    </div>
                    <input id="numero" type="text" class="w-4/6 ml-2" [(ngModel)]="numero" />
                  </div>
                </div>
              </div>
            </div>
            <div class="w-full md:w-5/8 bg-gray-50">
              <div class="flex flex-col items-start justify-center p-4 md:p-0">
                <div class="w-full md:w-55 h-12 md:ml-[5%] mt-4 md:mt-[6%] rounded-lg overflow-hidden flex">
                  <div class="w-full bg-gray-200">
                    <div class="z-9 text-gray-400 ml-2 mt-1">
                      <h1 class="font-bold text-[70%] leading-none">RUA:</h1>
                    </div>
                    <input id="rua" type="text" class="ml-2 w-full" [(ngModel)]="rua" />
                  </div>
                </div>
                <div class="w-full md:w-80 h-12 md:ml-[-26.2%] mt-3 md:mt-[5%] rounded-lg overflow-hidden flex">
                  <div class="w-full bg-gray-200">
                    <div class="z-9 text-gray-400 ml-2 mt-1">
                      <h1 class="font-bold text-[70%] leading-none">COMPLEMENTO:</h1>
                    </div>
                    <input id="complemento" type="text" class="w-5/6 ml-2" [(ngModel)]="complemento" />
                  </div>
                </div>
                <div class="w-40 h-8 mt-6 md:mt-[15%] rounded-xl overflow-hidden flex cursor-pointer self-end mr-4 md:ml-[24%]" (click)="salvarInformacoesComplementares()">
                  <div class="w-full bg-emerald-700 flex items-center justify-center">
                    <h1 class="font-bold text-[70%] leading-none text-white">SALVAR ALTERAÇÕES</h1>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div class="w-full md:w-220 mb-10 rounded-xl overflow-hidden flex flex-col md:flex-row shadow-[5px_5px_4px_rgba(0,0,0,0.25)]">
            <div class="w-full md:w-3/8 bg-gray-200 p-4 md:p-0">
              <div class="z-9 text-emerald-800 md:ml-5 md:mt-10">
                <h1 class="font-bold text-xl md:text-[200%] leading-none">Segurança e privacidade</h1>
              </div>
              <div class="z-9 text-black md:ml-5 mt-2 md:mt-5">
                <p class="text-xs md:text-base leading-none">Essa informação é particular e não será compartilhada com outras pessoas.</p>
              </div>
            </div>
            <div class="w-full md:w-4/8 bg-gray-50">
              <div class="flex flex-col items-start justify-center p-4 md:p-0">
                <div class="w-full md:w-55 h-12 md:ml-15 mt-4 md:mt-[7%] rounded-lg overflow-hidden flex">
                  <div class="w-full bg-gray-200">
                    <div class="z-9 text-gray-400 ml-2 mt-1">
                      <h1 class="font-bold text-[70%] leading-none">ID:</h1>
                    </div>
                    <input id="id" type="text" class="ml-2 w-full" [value]="usuarioId" readonly />
                  </div>
                </div>
                <div class="w-full md:w-55 h-12 md:ml-15 mt-3 md:mt-[7%] rounded-lg overflow-hidden flex">
                  <div class="w-full bg-gray-200">
                    <div class="z-9 text-gray-400 ml-2 mt-1">
                      <h1 class="font-bold text-[70%] leading-none">NOVA SENHA:</h1>
                    </div>
                    <input id="novaSenha" type="password" class="ml-2 w-full" [(ngModel)]="novaSenha" />
                  </div>
                </div>
              </div>
            </div>
            <div class="w-full md:w-5/8 bg-gray-50">
              <div class="flex flex-col items-start justify-center p-4 md:p-0">
                <div class="w-full md:w-55 h-12 md:ml-4.5 mt-4 md:mt-[7.2%] rounded-lg overflow-hidden flex">
                  <div class="w-full bg-gray-200">
                    <div class="z-9 text-gray-400 ml-2 mt-1">
                      <h1 class="font-bold text-[70%] leading-none">SENHA ATUAL:</h1>
                    </div>
                    <input id="senhaAtual" type="password" class="ml-2 w-full" [(ngModel)]="senhaAtual" />
                  </div>
                </div>
                <div class="w-full md:w-55 h-12 md:ml-4.5 mt-3 md:mt-[7.2%] rounded-lg overflow-hidden flex">
                  <div class="w-full bg-gray-200">
                    <div class="z-9 text-gray-400 ml-2 mt-1">
                      <h1 class="font-bold text-[70%] leading-none">CONFIRMAR SENHA:</h1>
                    </div>
                    <input id="senhaConfirmar" type="password" class="ml-2 w-full" [(ngModel)]="senhaConfirmar" />
                  </div>
                </div>
                <div class="w-40 h-8 mt-6 md:mt-[16%] rounded-xl overflow-hidden flex cursor-pointer self-end mr-4 md:ml-[29%]" (click)="salvarSenha()">
                  <div class="w-full bg-emerald-700 flex items-center justify-center">
                    <h1 class="font-bold text-[70%] leading-none text-white">SALVAR ALTERAÇÕES</h1>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div class="w-full md:w-220 mb-10 rounded-xl overflow-hidden shadow-[5px_5px_4px_rgba(0,0,0,0.25)]">
            <div class="bg-red-50 border border-red-200 rounded-xl p-6 md:p-8">
              <h2 class="text-red-600 font-bold text-lg md:text-xl mb-2">Excluir conta</h2>
              <p class="text-red-500 text-sm md:text-base mb-6">Ao excluir sua conta, todos os seus dados serão removidos permanentemente. Esta ação não pode ser desfeita.</p>
              @if (!confirmarExclusao) {
                <button
                  class="bg-red-600 text-white px-6 py-2 rounded-lg font-bold text-sm md:text-base cursor-pointer hover:bg-red-700"
                  (click)="confirmarExclusao = true"
                >
                  EXCLUIR CONTA
                </button>
              } @else {
                <div class="flex flex-col gap-3">
                  <p class="text-red-600 font-bold text-sm">Tem certeza que deseja excluir sua conta?</p>
                  <div class="flex gap-3">
                    <button
                      class="bg-red-600 text-white px-6 py-2 rounded-lg font-bold text-sm cursor-pointer hover:bg-red-700"
                      (click)="excluirConta()"
                    >
                      SIM, EXCLUIR
                    </button>
                    <button
                      class="bg-gray-300 text-gray-700 px-6 py-2 rounded-lg font-bold text-sm cursor-pointer hover:bg-gray-400"
                      (click)="confirmarExclusao = false"
                    >
                      CANCELAR
                    </button>
                  </div>
                </div>
              }
            </div>
          </div>
        </div>
      </div>
    </div>
  `,
})
export class ProfileComponent {
  @ViewChild('fileInput') fileInput!: ElementRef<HTMLInputElement>;

  fotoUrl: string | null = null;
  usuarioId: string = '';
  nome: string = '';
  email: string = '';
  telefone: string = '';
  endereco: string = '';
  cpf: string = '';
  dataNascimento: string = '';
  cidadeEstado: string = '';
  numero: string = '';
  rua: string = '';
  complemento: string = '';
  novaSenha: string = '';
  senhaAtual: string = '';
  senhaConfirmar: string = '';
  confirmarExclusao = false;

  navLinks: NavLink[] = [
    { id: 1, label: 'Registrar lotação', href: '/' },
    { id: 2, label: 'Ir para o mapa', href: '/mapa' },
    { id: 3, label: 'Ranking', href: '/ranking' },
    { id: 4, label: 'Sobre nós', href: '/sobre-nos' },
    { id: 5, label: 'Perfil', href: '/perfil' },
  ];

  constructor(private cdr: ChangeDetectorRef, private usuarioService: UsuarioService, private router: Router) {
    afterNextRender(async () => {
      await this.usuarioService.carregarFoto();
      const usuario = this.usuarioService.usuarioAtual;
      this.fotoUrl = usuario?.fotoURL || null;
      this.usuarioId = String(usuario?.usuarioId || '');

      try {
        const response = await fetch(`${environment.apiUrl}/usuario/${usuario.usuarioId}`);
        if (response.ok) {
          const data = await response.json();
          this.nome = data.nome || '';
          this.email = data.email || '';
          this.telefone = data.telefone || '';
          this.endereco = data.endereco || '';
          this.cpf = data.cpf || '';
        }
      } catch (error) {
        console.error('Erro ao carregar dados do usuário:', error);
      }

      this.cdr.detectChanges();
    });
  }

  async onFileSelected(event: Event) {
    const input = event.target as HTMLInputElement;
    if (!input.files || !input.files[0]) return;

    const file = input.files[0];
    const reader = new FileReader();
    reader.onload = async () => {
      this.fotoUrl = reader.result as string;
      this.cdr.detectChanges();

      try {
        await this.usuarioService.atualizarFoto(this.fotoUrl);
        toast.success('Foto atualizada com sucesso!');
      } catch (error) {
        console.error('Erro ao salvar foto:', error);
        toast.error('Erro ao salvar foto.');
      }
    };
    reader.readAsDataURL(file);
  }

  async salvarInformacoesPessoais() {
    try {
      const response = await fetch(`${environment.apiUrl}/usuario/${this.usuarioId}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ nome: this.nome, email: this.email }),
      });
      if (response.ok) {
        const usuario = this.usuarioService.usuarioAtual;
        this.usuarioService.setUsuarioAtual({ ...usuario, nome: this.nome, email: this.email });
        toast.success('Informações pessoais salvas com sucesso!');
      } else {
        toast.error('Erro ao salvar informações pessoais.');
      }
    } catch (error) {
      console.error('Erro ao salvar informações pessoais:', error);
      toast.error('Erro ao salvar informações pessoais.');
    }
  }

  async salvarInformacoesComplementares() {
    try {
      const response = await fetch(`${environment.apiUrl}/usuario/${this.usuarioId}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ telefone: this.telefone, endereco: this.rua }),
      });
      if (response.ok) {
        toast.success('Informações complementares salvas com sucesso!');
      } else {
        toast.error('Erro ao salvar informações complementares.');
      }
    } catch (error) {
      console.error('Erro ao salvar informações complementares:', error);
      toast.error('Erro ao salvar informações complementares.');
    }
  }

  async salvarSenha() {
    if (!this.senhaAtual || !this.novaSenha) {
      toast.error('Preencha a senha atual e a nova senha.');
      return;
    }
    if (this.novaSenha !== this.senhaConfirmar) {
      toast.error('A nova senha e a confirmação não coincidem.');
      return;
    }
    try {
      const response = await fetch(`${environment.apiUrl}/usuario/${this.usuarioId}/senha`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ senhaAtual: this.senhaAtual, novaSenha: this.novaSenha }),
      });
      const data = await response.json();
      if (response.ok) {
        toast.success('Senha atualizada com sucesso!');
        this.senhaAtual = '';
        this.novaSenha = '';
        this.senhaConfirmar = '';
      } else {
        toast.error(data.mensagem || 'Erro ao atualizar senha.');
      }
    } catch (error) {
      console.error('Erro ao atualizar senha:', error);
      toast.error('Erro ao atualizar senha.');
    }
  }

  async excluirConta() {
    try {
      await this.usuarioService.deletarConta();
      toast.success('Conta excluída com sucesso!');
      this.router.navigate(['/']);
    } catch (error) {
      console.error('Erro ao excluir conta:', error);
      toast.error('Erro ao excluir conta.');
    }
  }
}
