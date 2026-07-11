import { Injectable } from '@angular/core';
import { UnidadeMapaDTO } from '../models/unidade-mapa-dto';
import { environment } from '../../environments/environment';

@Injectable({ providedIn: 'root' })
export class MapaService {
  private baseUrl = environment.apiUrl;

  async getUnidadesMapa(): Promise<UnidadeMapaDTO[]> {
    console.log('[MapaService] getUnidadesMapa chamando:', this.baseUrl + '/mapa');
    try {
      const response = await fetch(`${this.baseUrl}/mapa`, {
        method: 'GET',
        headers: { 'Content-Type': 'application/json' },
      });
      console.log('[MapaService] getUnidadesMapa resposta status:', response.status);
      if (!response.ok) throw new Error('Erro ao buscar unidades do mapa');
      const data = await response.json();
      console.log('[MapaService] getUnidadesMapa dados:', data?.length, 'unidades');
      return data;
    } catch (error) {
      console.error('Erro ao buscar unidades do mapa:', error);
      return [];
    }
  }
}
