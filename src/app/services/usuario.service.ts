import { Injectable } from '@angular/core';
import { BehaviorSubject, map } from 'rxjs';
import { UsuarioLogado } from '../models/usuario';
import { environment } from '../../environments/environment';

@Injectable({ providedIn: 'root' })
export class UsuarioService {
  private baseUrl = environment.apiUrl;

  private usuarioSubject = new BehaviorSubject<UsuarioLogado>({} as UsuarioLogado);
  usuario$ = this.usuarioSubject.asObservable();

  isLoggedIn$ = this.usuario$.pipe(
    map(u => !!u && !!u.usuarioId)
  );

  constructor() {
    if (typeof window !== 'undefined' && window.localStorage) {
      const salvo = localStorage.getItem('usuarioLogado');
      if (salvo) {
        try {
          this.usuarioSubject.next(JSON.parse(salvo));
        } catch {
          localStorage.removeItem('usuarioLogado');
        }
      }
    }
  }

  get usuarioAtual(): UsuarioLogado {
    return this.usuarioSubject.value;
  }

  setUsuarioAtual(usuario: UsuarioLogado) {
    if (typeof window !== 'undefined' && window.localStorage) {
      try {
        localStorage.setItem('usuarioLogado', JSON.stringify(usuario));
      } catch {
        // localStorage full — keep in-memory only
      }
    }
    this.usuarioSubject.next(usuario);
  }

  logout() {
    if (typeof window !== 'undefined' && window.localStorage) {
      localStorage.removeItem('usuarioLogado');
    }
    this.usuarioSubject.next({} as UsuarioLogado);
  }

  async atualizarFoto(fotoURL: string) {
    const usuario = this.usuarioAtual;
    if (!usuario?.usuarioId) return;

    await fetch(`${this.baseUrl}/usuario/${usuario.usuarioId}/foto`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ fotoURL }),
    });
    this.setUsuarioAtual({ ...usuario, fotoURL });
  }

  async carregarFoto() {
    const usuario = this.usuarioAtual;
    if (!usuario?.usuarioId) return;

    try {
      const response = await fetch(`${this.baseUrl}/usuario/${usuario.usuarioId}`);
      if (response.ok) {
        const data = await response.json();
        if (data.fotoURL) {
          this.setUsuarioAtual({ ...usuario, fotoURL: data.fotoURL });
        }
      }
    } catch {}
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

    if (typeof window !== 'undefined' && window.localStorage) {
      try {
        localStorage.setItem('usuarioLogado', JSON.stringify(data));
      } catch {
        // localStorage full — keep in-memory only
      }
    }
    return data;
  }

  async loginWithGoogle(idToken: string): Promise<any> {
    const response = await fetch(`${this.baseUrl}/auth/google`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ idToken }),
    });

    const data = await response.json();
    if (!response.ok) throw new Error(data.mensagem || 'Erro ao entrar com Google');

    if (typeof window !== 'undefined' && window.localStorage) {
      try {
        localStorage.setItem('usuarioLogado', JSON.stringify(data));
      } catch {}
    }
    return data;
  }
}
