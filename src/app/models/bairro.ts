import { Cidade } from './cidade';

export interface Bairro {
  id: number;
  nome: string;
  cidade: Cidade;
}
