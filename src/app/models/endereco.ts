import { Bairro } from './bairro';

export interface Endereco {
  id: number;
  bairro: Bairro;
  rua: string;
  numero: string;
}
