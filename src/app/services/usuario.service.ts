import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { UsuarioLogado } from '../models/usuario';
import { environment } from '../../environments/environment';

@Injectable({ providedIn: 'root' })
export class UsuarioService {
  private baseUrl = environment.apiUrl;

  private usuarioSubject = new BehaviorSubject<UsuarioLogado>({} as UsuarioLogado);
  usuario$ = this.usuarioSubject.asObservable();

  get usuarioAtual(): UsuarioLogado {
    return this.usuarioSubject.value;
  }

  setUsuarioAtual(usuario: UsuarioLogado) {
    this.usuarioSubject.next(usuario);
  }

  async criarUsuario(nome: string, email: string, senha: string): Promise<any> {
    const response = await fetch(`${this.baseUrl}/criar-conta`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ nome, email, senha }),
    });
    if (!response.ok) throw new Error('Erro ao criar usuário');
    return response.json();
  }

  async login(email: string, senha: string, tipo: 'cliente' | 'funcionario' = 'cliente'): Promise<any> {
    const url = tipo === 'cliente'
      ? `${this.baseUrl}/entrar`
      : `${this.baseUrl}/entrar-funcionario`;

    const response = await fetch(url, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email, senha }),
    });

    const data = await response.json();
    if (!response.ok) throw new Error(data.message || 'Erro ao entrar');

    localStorage.setItem('usuarioLogado', JSON.stringify(data));
    return data;
  }
}
