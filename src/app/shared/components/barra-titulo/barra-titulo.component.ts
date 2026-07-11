import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-barra-titulo',
  template: `
    <div
      class="sticky top-16 z-40 bg-verdeEscuro h-24 w-full flex items-center mt-16"
      style="boxShadow: 4px 8px 15px rgba(0, 0, 0, 0.25)"
    >
      <div class="flex font-bold items-center justify-start pl-8 md:pl-32 h-full text-white text-xl md:text-2xl">
        <h1>{{ titulo }}</h1>
      </div>
    </div>
  `,
})
export class BarraTituloComponent {
  @Input() titulo = '';
}
