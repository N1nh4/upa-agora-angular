import { RenderMode, ServerRoute } from '@angular/ssr';

export const serverRoutes: ServerRoute[] = [
  {
    path: 'unidade/:id',
    renderMode: RenderMode.Server,
  },
  {
    path: 'unidade/:id/registrar-lotacao',
    renderMode: RenderMode.Server,
  },
  {
    path: 'mapa',
    renderMode: RenderMode.Client,
  },
  {
    path: '**',
    renderMode: RenderMode.Prerender,
  },
];
