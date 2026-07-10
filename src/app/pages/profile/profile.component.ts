import { Component } from '@angular/core';
import { HeaderComponent, NavLink } from '../../shared/components/header/header.component';

@Component({
  selector: 'app-profile',
  imports: [HeaderComponent],
  template: `
    <div class="relative overflow-x-hidden">
      <div class="fixed top-0 left-0 w-screen h-screen bg-gradient-to-r from-verdeClaro to-verdeClaro -z-10" style="clipPath: polygon(0 0, 100% 0, 100% 30%, 0 80%)"></div>
      <app-header [navLinks]="navLinks" />

      <div class="w-full flex flex-col lg:flex-row pt-20 px-4 lg:px-0">
        <div class="flex flex-col items-center lg:items-start justify-center w-full lg:w-1/3 pl-0 lg:pl-30 mt-10 lg:mt-25">
          <div class="text-white text-center lg:text-left">
            <h1 class="font-bold text-3xl md:text-[200%]">GERENCIAMENTO</h1>
            <h1 class="font-bold text-3xl md:text-[200%] mt-[-4px]">DE CONTA</h1>
          </div>
          <div class="text-black mt-8 lg:mt-55 max-w-xs text-center lg:text-left">
            <p class="text-base md:text-xl leading-none">Preencha ou edite os campos abaixo e salve as alterações para manter seu perfil atualizado.</p>
          </div>
          <div class="flex flex-col items-center lg:items-start justify-center mt-10 lg:mt-20">
            <svg xmlns="http://www.w3.org/2000/svg" class="rounded-full bg-blue-100 w-24 h-24 md:w-[110px] md:h-[110px]" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1"><path d="M19 21v-2a4 4 0 0 0-4-4H9a4 4 0 0 0-4 4v2"/><circle cx="12" cy="7" r="4"/></svg>
            <div class="relative ml-16 md:ml-[72px] mt-[-24px] w-10 h-10 bg-amber-50 rounded-full flex items-center justify-center cursor-pointer">
              <svg xmlns="http://www.w3.org/2000/svg" class="text-emerald-800 w-7 h-7" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="3.5"><path d="M23 19a2 2 0 0 1-2 2H3a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h4l2-3h6l2 3h4a2 2 0 0 1 2 2z"/><circle cx="12" cy="13" r="4"/></svg>
            </div>
          </div>
        </div>

        <div class="flex flex-col items-center w-full px-4 lg:px-0 mt-8 lg:mt-0">
          <div class="w-full max-w-[900px] rounded-xl overflow-hidden shadow-[5px_5px_4px_rgba(0,0,0,0.25)] mb-6 lg:mb-10">
            <div class="flex flex-col lg:flex-row">
              <div class="w-full lg:w-3/8 bg-gray-200 p-4 lg:p-5">
                <h1 class="font-bold text-2xl lg:text-[200%] text-emerald-800 leading-none">Informações Pessoais</h1>
                <p class="text-black mt-3 lg:mt-5 leading-none text-sm">Essa informação é particular e não será compartilhada.</p>
              </div>
              <div class="w-full lg:w-5/8 bg-gray-50 p-4">
                <div class="mb-3">
                  <div class="bg-gray-200 rounded-lg p-2">
                    <label class="font-bold text-xs text-gray-400">NOME:</label>
                    <input type="text" class="w-full bg-transparent focus:outline-none" />
                  </div>
                </div>
                <div class="mb-3">
                  <div class="bg-gray-200 rounded-lg p-2">
                    <label class="font-bold text-xs text-gray-400">DATA DE NASCIMENTO:</label>
                    <input type="date" class="w-full bg-transparent focus:outline-none" />
                  </div>
                </div>
                <div class="mb-3">
                  <div class="bg-gray-200 rounded-lg p-2">
                    <label class="font-bold text-xs text-gray-400">CIDADE/ESTADO:</label>
                    <input type="text" class="w-full bg-transparent focus:outline-none" />
                  </div>
                </div>
                <div class="mb-3">
                  <div class="bg-gray-200 rounded-lg p-2">
                    <label class="font-bold text-xs text-gray-400">ENDERECO DE EMAIL:</label>
                    <input type="text" class="w-full bg-transparent focus:outline-none" />
                  </div>
                </div>
                <div class="mt-4">
                  <div class="bg-emerald-700 text-white text-center py-2 rounded-xl cursor-pointer font-bold text-xs">SALVAR ALTERAÇÕES</div>
                </div>
              </div>
            </div>
          </div>

          <div class="w-full max-w-[900px] rounded-xl overflow-hidden shadow-[5px_5px_4px_rgba(0,0,0,0.25)] mb-6 lg:mb-10">
            <div class="flex flex-col lg:flex-row">
              <div class="w-full lg:w-3/8 bg-gray-200 p-4 lg:p-5">
                <h1 class="font-bold text-2xl lg:text-[200%] text-emerald-800 leading-none">Informações Complementares</h1>
                <p class="text-black mt-3 lg:mt-5 leading-none text-sm">Essa informação é particular e não será compartilhada.</p>
              </div>
              <div class="w-full lg:w-5/8 bg-gray-50 p-4">
                <div class="mb-3">
                  <div class="bg-gray-200 rounded-lg p-2">
                    <label class="font-bold text-xs text-gray-400">TELEFONE:</label>
                    <input type="number" class="w-full bg-transparent focus:outline-none" />
                  </div>
                </div>
                <div class="mb-3">
                  <div class="bg-gray-200 rounded-lg p-2">
                    <label class="font-bold text-xs text-gray-400">N°:</label>
                    <input type="number" class="w-2/3 bg-transparent focus:outline-none" />
                  </div>
                </div>
                <div class="mb-3">
                  <div class="bg-gray-200 rounded-lg p-2">
                    <label class="font-bold text-xs text-gray-400">RUA:</label>
                    <input type="text" class="w-full bg-transparent focus:outline-none" />
                  </div>
                </div>
                <div class="mb-3">
                  <div class="bg-gray-200 rounded-lg p-2">
                    <label class="font-bold text-xs text-gray-400">COMPLEMENTO:</label>
                    <input type="text" class="w-5/6 bg-transparent focus:outline-none" />
                  </div>
                </div>
                <div class="mt-4">
                  <div class="bg-emerald-700 text-white text-center py-2 rounded-xl cursor-pointer font-bold text-xs">SALVAR ALTERAÇÕES</div>
                </div>
              </div>
            </div>
          </div>

          <div class="w-full max-w-[900px] rounded-xl overflow-hidden shadow-[5px_5px_4px_rgba(0,0,0,0.25)] mb-10">
            <div class="flex flex-col lg:flex-row">
              <div class="w-full lg:w-3/8 bg-gray-200 p-4 lg:p-5">
                <h1 class="font-bold text-2xl lg:text-[200%] text-emerald-800 leading-none">Segurança e privacidade</h1>
                <p class="text-black mt-3 lg:mt-5 leading-none text-sm">Essa informação é particular e não será compartilhada.</p>
              </div>
              <div class="w-full lg:w-5/8 bg-gray-50 p-4">
                <div class="mb-3">
                  <div class="bg-gray-200 rounded-lg p-2">
                    <label class="font-bold text-xs text-gray-400">ID:</label>
                    <input type="text" class="w-full bg-transparent focus:outline-none" />
                  </div>
                </div>
                <div class="mb-3">
                  <div class="bg-gray-200 rounded-lg p-2">
                    <label class="font-bold text-xs text-gray-400">SENHA ATUAL:</label>
                    <input type="password" class="w-full bg-transparent focus:outline-none" />
                  </div>
                </div>
                <div class="mb-3">
                  <div class="bg-gray-200 rounded-lg p-2">
                    <label class="font-bold text-xs text-gray-400">NOVA SENHA:</label>
                    <input type="password" class="w-full bg-transparent focus:outline-none" />
                  </div>
                </div>
                <div class="mb-3">
                  <div class="bg-gray-200 rounded-lg p-2">
                    <label class="font-bold text-xs text-gray-400">CONFIRMAR SENHA:</label>
                    <input type="password" class="w-full bg-transparent focus:outline-none" />
                  </div>
                </div>
                <div class="mt-4">
                  <div class="bg-emerald-700 text-white text-center py-2 rounded-xl cursor-pointer font-bold text-xs">SALVAR ALTERAÇÕES</div>
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
  navLinks: NavLink[] = [
    { id: 1, label: 'Registrar lotação', href: '/' },
    { id: 2, label: 'Ir para o mapa', href: '/mapa' },
    { id: 3, label: 'Ranking', href: '/ranking' },
    { id: 4, label: 'Entrar', href: '/entrar' },
    { id: 5, label: 'Criar conta', href: '/criar-conta' },
    { id: 6, label: 'Sobre nós', href: '/sobre-nos' },
    { id: 7, label: 'Configurações', href: '/perfil' },
  ];
}
