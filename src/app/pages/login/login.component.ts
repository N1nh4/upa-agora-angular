import { Component } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { UsuarioService } from '../../services/usuario.service';
import { toast } from 'ngx-sonner';

@Component({
  selector: 'app-login',
  imports: [RouterLink],
  template: `
    <div class="min-h-screen bg-gradient-to-br from-emerald-900 to-emerald-700 flex items-center justify-center p-4">
      <div class="bg-white p-6 md:p-8 rounded-lg shadow-xl w-full max-w-md text-center">
        <h1 class="text-3xl md:text-4xl font-bold text-gray-800 mb-8">Bem vindo de volta!</h1>

        <div class="space-y-4">
          <div class="relative">
            <input
              type="email"
              placeholder="Digite seu email"
              [value]="email"
              (input)="email = $any($event.target).value"
              class="w-full pl-12 pr-10 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-500 text-gray-700"
            />
            <div class="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <svg class="h-5 w-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"/></svg>
            </div>
          </div>

          <div class="relative">
            <input
              type="password"
              placeholder="************"
              [value]="senha"
              (input)="senha = $any($event.target).value"
              class="w-full pl-12 pr-10 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-500 text-gray-700"
            />
            <div class="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <svg class="h-5 w-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"/></svg>
            </div>
          </div>

          <div class="flex items-center justify-between">
            <div class="flex items-center">
              <input type="checkbox" id="rememberMe" class="h-4 w-4 text-emerald-600 focus:ring-emerald-500 border-gray-300 rounded" />
              <label for="rememberMe" class="ml-2 text-gray-700 text-sm">Lembre-me</label>
            </div>
          </div>

          <div class="flex justify-center gap-4">
            <label class="inline-flex items-center">
              <input type="radio" name="tipoUsuario" value="cliente" [checked]="tipoUsuario === 'cliente'" (change)="tipoUsuario = 'cliente'" class="text-emerald-600" />
              <span class="ml-2">Cliente</span>
            </label>
            <label class="inline-flex items-center">
              <input type="radio" name="tipoUsuario" value="funcionario" [checked]="tipoUsuario === 'funcionario'" (change)="tipoUsuario = 'funcionario'" class="text-emerald-600" />
              <span class="ml-2">Funcionário</span>
            </label>
          </div>

          <button (click)="entrar()" class="w-full bg-emerald-600 hover:bg-emerald-700 text-white font-bold py-3 px-4 rounded-lg transition duration-300 cursor-pointer">
            Entrar
          </button>

          <p class="text-gray-600 text-xs mt-4">
            Ao criar a conta você aceita nossas
            <a routerLink="/termos-de-uso" class="text-emerald-600 hover:underline">Termos de uso</a> e
            <a routerLink="/politica-de-privacidade" class="text-emerald-600 hover:underline">Política de privacidade</a>
          </p>

          <div class="relative my-6">
            <div class="absolute inset-0 flex items-center"><div class="w-full border-t border-gray-300"></div></div>
            <div class="relative flex justify-center text-sm"><span class="px-2 bg-white text-gray-500">ou</span></div>
          </div>

          <button class="w-full flex items-center justify-center border border-gray-300 py-3 px-4 rounded-lg hover:bg-gray-50 transition text-gray-700 font-medium cursor-pointer">
            <svg class="w-6 h-6 mr-3" viewBox="0 0 24 24"><path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92a5.06 5.06 0 0 1-2.2 3.32v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.1z"/><path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/><path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"/><path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/></svg>
            Entrar com o Google
          </button>

          <p class="text-gray-600 mt-6 text-sm">
            Não possui conta?
            <a routerLink="/criar-conta" class="text-emerald-600 hover:underline font-semibold">Cadastre-se aqui</a>
          </p>
        </div>
      </div>
    </div>
  `,
})
export class LoginComponent {
  email = '';
  senha = '';
  tipoUsuario: 'cliente' | 'funcionario' = 'cliente';

  constructor(
    private usuarioService: UsuarioService,
    private router: Router
  ) {}

  async entrar() {
    try {
      const resposta = await this.usuarioService.login(this.email, this.senha, this.tipoUsuario);
      if (resposta?.mensagem === 'Login realizado com sucesso') {
        this.usuarioService.setUsuarioAtual({
          usuarioId: resposta.usuarioId,
          nome: resposta.nome,
          email: resposta.email,
        });
        toast.success('Login realizado com sucesso!');
        this.router.navigate(['/']);
      } else {
        toast.error(resposta.mensagem || 'Erro ao entrar');
      }
    } catch (error: any) {
      toast.error(error.message || 'Erro ao entrar');
    }
  }
}
