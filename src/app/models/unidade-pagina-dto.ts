import { Avaliacao } from './avaliacao';
import { Comentario } from './comentario';
import { Endereco } from './endereco';
import { StatusType } from './unidades';

export interface UnidadePaginaDTO {
  id: number;
  nome: string;
  nota: number;
  status: StatusType;
  endereco: Endereco;
  telefone: string;
  imagemURL: string;
  comentarios: Comentario[];
  ultimaAtualizacao: string;
  avalicao: Avaliacao;
}
