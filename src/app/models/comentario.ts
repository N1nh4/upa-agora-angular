import { Cliente } from './cliente';

export interface Comentario {
  id: number;
  cliente: Cliente;
  texto: string;
  data: string;
}
