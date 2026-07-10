import { StatusEnum, StatusType } from '../models/unidades';

export function renderStars(avaliacao: number): string[] {
  const totalStars = 5;
  const stars: string[] = [];
  const filledStars = Math.floor(avaliacao);
  const hasHalfStar = (avaliacao % 1) >= 0.5;

  for (let i = 0; i < filledStars; i++) {
    stars.push('filled');
  }
  if (hasHalfStar) {
    stars.push('half');
  }
  const emptyStarsCount = totalStars - stars.length;
  for (let i = 0; i < emptyStarsCount; i++) {
    stars.push('empty');
  }
  return stars;
}

export function getStatusColorLotacao(status: StatusType): string {
  switch (status) {
    case StatusEnum.VAZIO:
    case StatusEnum.POUCO_VAZIO:
      return 'text-emerald-500';
    case StatusEnum.MODERADO:
      return 'text-amber-500';
    case StatusEnum.CHEIO:
    case StatusEnum.MUITO_CHEIO:
      return 'text-red-500';
    default:
      return 'text-zinc-500';
  }
}

export function getCapacityFromStatus(status: StatusType): number {
  switch (status) {
    case StatusEnum.VAZIO: return 1;
    case StatusEnum.POUCO_VAZIO: return 2;
    case StatusEnum.MODERADO: return 3;
    case StatusEnum.CHEIO: return 4;
    case StatusEnum.MUITO_CHEIO: return 5;
    default: return 0;
  }
}

export function getStatusArray() {
  return ['VAZIO', 'POUCO_VAZIO', 'MODERADO', 'CHEIO', 'MUITO_CHEIO'];
}

export function getStatusColor(index: number): string {
  if (index <= 1) return '#0E6F4C';
  if (index === 2) return '#fe9a2e';
  return '#fb2c36';
}
