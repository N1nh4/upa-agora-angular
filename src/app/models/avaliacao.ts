import { Comentario } from './comentario';

export interface Avaliacao {
  id: number;
  comentario: Comentario;
  nota: number;
}
