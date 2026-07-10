import { Injectable } from '@angular/core';
import { UnidadeMapaDTO } from '../models/unidade-mapa-dto';
import { environment } from '../../environments/environment';

@Injectable({ providedIn: 'root' })
export class MapaService {
  private baseUrl = environment.apiUrl;

  async getUnidadesMapa(): Promise<UnidadeMapaDTO[]> {
    try {
      const response = await fetch(`${this.baseUrl}/mapa`, {
        method: 'GET',
        headers: { 'Content-Type': 'application/json' },
      });
      if (!response.ok) throw new Error('Erro ao buscar unidades do mapa');
      return response.json();
    } catch (error) {
      console.error('Erro ao buscar unidades do mapa:', error);
      return [];
    }
  }
}
