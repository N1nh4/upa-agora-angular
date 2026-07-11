import { Avaliacao } from './avaliacao';
import { Endereco } from './endereco';
import { StatusType } from './unidades';

export interface UnidadeSaudeDTO {
  id: number;
  nota: number;
  nome: string;
  status: StatusType;
  endereco: Endereco;
  telefone: string;
  imagemURL: string;
  ultimaAtualizacao: string;
  avalicao: Avaliacao;
  lat: number | null;
  lng: number | null;
}
