import { Component, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-barra-titulo',
  template: `
    <div
      class="sticky top-16 z-40 bg-verdeEscuro h-24 w-full flex items-center mt-16"
      style="boxShadow: 4px 8px 15px rgba(0, 0, 0, 0.25)"
    >
      <div class="flex font-bold items-center justify-start pl-8 h-full text-white text-xl md:text-2xl gap-3">
        @if (mostrarVoltar) {
          <button
            class="cursor-pointer hover:opacity-80 transition-opacity flex items-center"
            (click)="voltar.emit()"
          >
            <svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round">
              <path d="M19 12H5"/>
              <polyline points="12 19 5 12 12 5"/>
            </svg>
          </button>
        }
        <h1>{{ titulo }}</h1>
      </div>
    </div>
  `,
})
export class BarraTituloComponent {
  @Input() titulo = '';
  @Input() mostrarVoltar = false;
  @Output() voltar = new EventEmitter<void>();
}
