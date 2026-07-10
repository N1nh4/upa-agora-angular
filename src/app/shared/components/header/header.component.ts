import { Component, Input } from '@angular/core';
import { RouterLink } from '@angular/router';

export interface NavLink {
  id: number;
  href: string;
  label: string;
}

@Component({
  selector: 'app-header',
  imports: [RouterLink],
  template: `
    <header
      class="fixed top-0 left-0 w-full h-16 bg-gradient-to-r from-[#004E4C] to-verdeClaro z-50"
      style="boxShadow: 4px 8px 15px rgba(0, 0, 0, 0.25)"
    >
      <div class="h-full flex items-center px-4 md:px-10 justify-between">
        <div class="flex items-center">
          <a routerLink="/" class="text-2xl font-bold text-white">UpaAgora</a>
        </div>
        <nav class="hidden md:flex items-center space-x-8 text-xl">
          @for (link of navLinks; track link.id) {
            <a
              [routerLink]="link.href"
              class="text-white hover:text-gray-300 transition-colors"
            >
              {{ link.label }}
            </a>
          }
        </nav>
        <button
          class="md:hidden text-white text-2xl"
          (click)="menuAberto = !menuAberto"
        >
          ☰
        </button>
      </div>
      @if (menuAberto) {
        <div class="md:hidden bg-gradient-to-r from-[#004E4C] to-verdeClaro px-4 pb-4">
          @for (link of navLinks; track link.id) {
            <a
              [routerLink]="link.href"
              class="block text-white py-2 hover:text-gray-300"
              (click)="menuAberto = false"
            >
              {{ link.label }}
            </a>
          }
        </div>
      }
    </header>
  `,
})
export class HeaderComponent {
  @Input() navLinks: NavLink[] = [];
  menuAberto = false;
}
