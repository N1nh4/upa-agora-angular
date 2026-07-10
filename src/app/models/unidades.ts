export const StatusEnum = {
  VAZIO: 'VAZIO',
  POUCO_VAZIO: 'POUCO_VAZIO',
  MODERADO: 'MODERADO',
  CHEIO: 'CHEIO',
  MUITO_CHEIO: 'MUITO_CHEIO',
} as const;

export type StatusType = typeof StatusEnum[keyof typeof StatusEnum];

export interface UnidadeSaude {
  id: number;
  titulo: string;
  avaliacaoEstrela: number;
  endereco: string;
  telefone: string;
  status: StatusType;
  ultimaAtualizacao: string;
  imagem: string;
  comentarios?: Comentario[];
}

export interface Comentario {
  id: number;
  unidadeId: number;
  autor: string;
  avatar?: string;
  texto: string;
  data: string;
}
