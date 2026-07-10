import { StatusType } from './unidades';

export interface AtualizacaoDTO {
  status: StatusType;
  usuarioId: number;
  unidadeId: number;
}
