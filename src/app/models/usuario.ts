export interface Usuario {
  id: number;
  nome: string;
  email: string;
  dataNascimento: Date;
}

export interface UsuarioLogado {
  usuarioId: number;
  nome: string;
  email: string;
}
