import { Component, ElementRef, ViewChild, afterNextRender, ChangeDetectorRef } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HeaderComponent, NavLink } from '../../shared/components/header/header.component';
import { UsuarioService } from '../../services/usuario.service';
import { environment } from '../../../environments/environment';

@Component({
  selector: 'app-profile',
  imports: [HeaderComponent, FormsModule],
  template: `
    <div class="relative overflow-x-hidden">
      <div class="fixed top-0 left-0 w-screen h-screen bg-gradient-to-r from-verdeClaro to-verdeClaro -z-10" style="clipPath: polygon(0 0, 100% 0, 100% 30%, 0 80%)"></div>
      <app-header [navLinks]="navLinks" />

      <div class="w-full flex">
        <div class="flex flex-col items-start justify-center w-1/3 h-full z-20 pl-30 mt-25">
          <div class="mt-16 fixed z-9 text-white">
            <h1 class="font-bold text-[200%]">GERENCIAMENTO</h1>
            <h1 class="font-bold text-[200%] mt-[-12px]">DE CONTA</h1>
          </div>

          <div class="fixed flex z-9 text-black mt-55 w-80">
            <p class="text-xl leading-none">Preencha ou edite os campos abaixo e salve as alterações para manter seu perfil atualizado.</p>
          </div>

          <div class="fixed flex flex-col items-start justify-center z-20 ml-18 mt-110">
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

        <div class="flex flex-col items-start justify-center pt-20">
          <div class="w-220 h-59 mt-10 rounded-xl overflow-hidden flex shadow-[5px_5px_4px_rgba(0,0,0,0.25)]">
            <div class="w-3/8 bg-gray-200">
              <div class="z-9 text-emerald-800 ml-5 mt-10 w-46">
                <h1 class="font-bold text-[200%] leading-none">Informações Pessoais</h1>
              </div>
              <div class="flex z-9 text-black ml-5 mt-5 w-86">
                <p class="leading-none">Essa informação é particular e não será compartilhada com outras pessoas.</p>
              </div>
            </div>

            <div class="w-5/8 bg-gray-50 shadow-[5px_5px_4px_rgba(0,0,0,0.25)]">
              <div class="flex flex-col items-start justify-center">
                <div class="w-55 h-12 ml-15 mt-[7%] rounded-lg overflow-hidden flex">
                  <div class="w-1/1 bg-gray-200">
                    <div class="z-9 text-gray-400 ml-2 mt-1 w-46">
                      <h1 class="font-bold text-[70%] leading-none">NOME:</h1>
                    </div>
                    <input id="nome" type="text" class="ml-2" [(ngModel)]="nome" />
                  </div>
                </div>
                <div class="w-39.5 h-12 ml-15 mt-[5.5%] rounded-lg overflow-hidden flex">
                  <div class="w-1/1 bg-gray-200">
                    <div class="z-9 text-gray-400 ml-2 mt-1 w-46">
                      <h1 class="font-bold text-[70%] leading-none">DATA DE NASCIMENTO:</h1>
                    </div>
                    <input id="data" type="date" class="ml-2" [(ngModel)]="dataNascimento" />
                  </div>
                </div>
              </div>
            </div>

            <div class="w-5/8 bg-gray-50">
              <div class="flex flex-col items-start justify-center">
                <div class="w-55 h-12 ml-[5%] mt-[6.55%] rounded-lg overflow-hidden flex">
                  <div class="w-1/1 bg-gray-200">
                    <div class="z-9 text-gray-400 ml-2 mt-1 w-46">
                      <h1 class="font-bold text-[70%] leading-none">CIDADE/ESTADO:</h1>
                    </div>
                    <input id="cidade/estado" type="text" class="ml-2" [(ngModel)]="cidadeEstado" />
                  </div>
                </div>
                <div class="w-70 h-12 ml-[-17%] mt-[6%] rounded-lg overflow-hidden flex">
                  <div class="w-1/1 bg-gray-200">
                    <div class="z-9 text-gray-400 ml-2 mt-1 w-46">
                      <h1 class="font-bold text-[70%] leading-none">ENDERECO DE EMAIL:</h1>
                    </div>
                    <input id="email" type="text" class="ml-2" [(ngModel)]="email" />
                  </div>
                </div>
                <div class="w-40 h-8 ml-[24%] mt-[15%] rounded-xl overflow-hidden flex cursor-pointer" (click)="salvarInformacoesPessoais()">
                  <div class="w-1/1 bg-emerald-700">
                    <div class="z-9 text-white ml-[14.5%] mt-[6%]">
                      <h1 class="font-bold text-[70%] leading-none">SALVAR ALTERAÇÕES</h1>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div class="w-220 h-59 mt-15 mb-10 rounded-xl overflow-hidden flex shadow-[5px_5px_4px_rgba(0,0,0,0.25)]">
            <div class="w-3/8 bg-gray-200">
              <div class="z-9 text-emerald-800 ml-5 mt-10 w-46">
                <h1 class="font-bold text-[200%] leading-none">Informações Complementares</h1>
              </div>
              <div class="flex z-9 text-black ml-5 mt-5 w-86">
                <p class="leading-none">Essa informação é particular e não será compartilhada com outras pessoas.</p>
              </div>
            </div>
            <div class="w-5/8 bg-gray-50">
              <div class="flex flex-col items-start justify-center">
                <div class="w-55 h-12 ml-15 mt-[7%] rounded-lg overflow-hidden flex">
                  <div class="w-1/1 bg-gray-200">
                    <div class="z-9 text-gray-400 ml-2 mt-1 w-46">
                      <h1 class="font-bold text-[70%] leading-none">TELEFONE:</h1>
                    </div>
                    <input id="telefone" type="text" class="ml-2" [(ngModel)]="telefone" />
                  </div>
                </div>
                <div class="w-30 h-12 ml-15 mt-[5.5%] rounded-lg overflow-hidden flex">
                  <div class="w-1/1 bg-gray-200">
                    <div class="z-9 text-gray-400 ml-2 mt-1 w-46">
                      <h1 class="font-bold text-[70%] leading-none">N°:</h1>
                    </div>
                    <input id="numero" type="text" class="w-4/6 ml-2" [(ngModel)]="numero" />
                  </div>
                </div>
              </div>
            </div>
            <div class="w-5/8 bg-gray-50">
              <div class="flex flex-col items-start justify-center">
                <div class="w-55 h-12 ml-[5%] mt-[6%] rounded-lg overflow-hidden flex">
                  <div class="w-1/1 bg-gray-200">
                    <div class="z-9 text-gray-400 ml-2 mt-1 w-46">
                      <h1 class="font-bold text-[70%] leading-none">RUA:</h1>
                    </div>
                    <input id="rua" type="text" class="ml-2" [(ngModel)]="rua" />
                  </div>
                </div>
                <div class="w-80 h-12 ml-[-26.2%] mt-[5%] rounded-lg overflow-hidden flex">
                  <div class="w-1/1 bg-gray-200">
                    <div class="z-9 text-gray-400 ml-2 mt-1 w-46">
                      <h1 class="font-bold text-[70%] leading-none">COMPLEMENTO:</h1>
                    </div>
                    <input id="complemento" type="text" class="w-5/6 ml-2" [(ngModel)]="complemento" />
                  </div>
                </div>
                <div class="w-40 h-8 ml-[24%] mt-[15%] rounded-xl overflow-hidden flex cursor-pointer" (click)="salvarInformacoesComplementares()">
                  <div class="w-1/1 bg-emerald-700">
                    <div class="z-9 text-white ml-[14.5%] mt-[6%]">
                      <h1 class="font-bold text-[70%] leading-none">SALVAR ALTERAÇÕES</h1>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div class="w-220 h-59 mb-10 rounded-xl overflow-hidden flex shadow-[5px_5px_4px_rgba(0,0,0,0.25)]">
            <div class="w-3/8 bg-gray-200">
              <div class="z-9 text-emerald-800 ml-5 mt-10 w-46">
                <h1 class="font-bold text-[200%] leading-none">Segurança e privacidade</h1>
              </div>
              <div class="flex z-9 text-black ml-5 mt-5 w-86">
                <p class="leading-none">Essa informação é particular e não será compartilhada com outras pessoas.</p>
              </div>
            </div>
            <div class="w-4/8 bg-gray-50">
              <div class="flex flex-col items-start justify-center">
                <div class="w-55 h-12 ml-15 mt-[7%] rounded-lg overflow-hidden flex">
                  <div class="w-1/1 bg-gray-200">
                    <div class="z-9 text-gray-400 ml-2 mt-1 w-46">
                      <h1 class="font-bold text-[70%] leading-none">ID:</h1>
                    </div>
                    <input id="id" type="text" class="ml-2" [value]="usuarioId" readonly />
                  </div>
                </div>
                <div class="w-55 h-12 ml-15 mt-[7%] rounded-lg overflow-hidden flex">
                  <div class="w-1/1 bg-gray-200">
                    <div class="z-9 text-gray-400 ml-2 mt-1 w-46">
                      <h1 class="font-bold text-[70%] leading-none">NOVA SENHA:</h1>
                    </div>
                    <input id="novaSenha" type="password" class="ml-2" [(ngModel)]="novaSenha" />
                  </div>
                </div>
              </div>
            </div>
            <div class="w-5/8 bg-gray-50">
              <div class="flex flex-col items-start justify-center">
                <div class="w-55 h-12 ml-4.5 mt-[7.2%] rounded-lg overflow-hidden flex">
                  <div class="w-1/1 bg-gray-200">
                    <div class="z-9 text-gray-400 ml-2 mt-1 w-46">
                      <h1 class="font-bold text-[70%] leading-none">SENHA ATUAL:</h1>
                    </div>
                    <input id="senhaAtual" type="password" class="ml-2" [(ngModel)]="senhaAtual" />
                  </div>
                </div>
                <div class="w-55 h-12 ml-4.5 mt-[7.2%] rounded-lg overflow-hidden flex">
                  <div class="w-1/1 bg-gray-200">
                    <div class="z-9 text-gray-400 ml-2 mt-1 w-46">
                      <h1 class="font-bold text-[70%] leading-none">CONFIRMAR SENHA:</h1>
                    </div>
                    <input id="senhaConfirmar" type="password" class="ml-2" [(ngModel)]="senhaConfirmar" />
                  </div>
                </div>
                <div class="w-40 h-8 ml-[29%] mt-[16%] rounded-xl overflow-hidden flex cursor-pointer" (click)="salvarSenha()">
                  <div class="w-1/1 bg-emerald-700">
                    <div class="z-9 text-white ml-[14.5%] mt-[6%]">
                      <h1 class="font-bold text-[70%] leading-none">SALVAR ALTERAÇÕES</h1>
                    </div>
                  </div>
                </div>
              </div>
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

  navLinks: NavLink[] = [
    { id: 1, label: 'Registrar lotação', href: '/' },
    { id: 2, label: 'Ir para o mapa', href: '/mapa' },
    { id: 3, label: 'Ranking', href: '/ranking' },
    { id: 4, label: 'Sobre nós', href: '/sobre-nos' },
    { id: 5, label: 'Configurações', href: '/perfil' },
  ];

  constructor(private cdr: ChangeDetectorRef, private usuarioService: UsuarioService) {
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
      } catch (error) {
        console.error('Erro ao salvar foto:', error);
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
        alert('Informações pessoais salvas com sucesso!');
      } else {
        alert('Erro ao salvar informações pessoais.');
      }
    } catch (error) {
      console.error('Erro ao salvar informações pessoais:', error);
      alert('Erro ao salvar informações pessoais.');
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
        alert('Informações complementares salvas com sucesso!');
      } else {
        alert('Erro ao salvar informações complementares.');
      }
    } catch (error) {
      console.error('Erro ao salvar informações complementares:', error);
      alert('Erro ao salvar informações complementares.');
    }
  }

  async salvarSenha() {
    if (!this.senhaAtual || !this.novaSenha) {
      alert('Preencha a senha atual e a nova senha.');
      return;
    }
    if (this.novaSenha !== this.senhaConfirmar) {
      alert('A nova senha e a confirmação não coincidem.');
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
        alert('Senha atualizada com sucesso!');
        this.senhaAtual = '';
        this.novaSenha = '';
        this.senhaConfirmar = '';
      } else {
        alert(data.mensagem || 'Erro ao atualizar senha.');
      }
    } catch (error) {
      console.error('Erro ao atualizar senha:', error);
      alert('Erro ao atualizar senha.');
    }
  }
}
