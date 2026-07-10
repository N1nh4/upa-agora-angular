import { Injectable } from '@angular/core';
import { UnidadeSaudeDTO } from '../models/unidadesdto';
import { UnidadePaginaDTO } from '../models/unidade-pagina-dto';
import { environment } from '../../environments/environment';

@Injectable({ providedIn: 'root' })
export class UnidadeService {
  private baseUrl = environment.apiUrl;

  async getUnidades(): Promise<UnidadeSaudeDTO[]> {
    const response = await fetch(`${this.baseUrl}/`, {
      method: 'GET',
      headers: { 'Content-Type': 'application/json' },
    });
    if (!response.ok) throw new Error('Erro ao buscar unidades');
    return response.json();
  }

  async getUnidade(id: number): Promise<UnidadePaginaDTO> {
    const response = await fetch(`${this.baseUrl}/unidade/${id}`);
    if (!response.ok) throw new Error('Unidade não encontrada');
    return response.json();
  }

  async buscarInformacoesDaUnidade(dados: any) {
    const response = await fetch(`${this.baseUrl}/unidade/2/registrar-lotacao`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(dados),
    });
    if (!response.ok) throw new Error('Erro ao buscar informações');
    return response.json();
  }

  async registrarAtualizacaoCompleta(status: string, usuarioId: number, unidadeId: number): Promise<any> {
    const dados = { status, usuarioId, unidadeId };
    const response = await fetch(`${this.baseUrl}/atualizacoes`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(dados),
    });
    if (!response.ok) throw new Error('Erro ao enviar atualização');
    return response.json();
  }

  async notificarUnidade(email: string, id: number): Promise<any> {
    const response = await fetch(`${this.baseUrl}/salvar-email-notificacao`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(email),
    });
    if (!response.ok) throw new Error('Erro ao notificar');
    return response.json();
  }
}
