import { Component, Input, OnChanges, SimpleChanges, OnDestroy } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { AsyncPipe } from '@angular/common';
import { Observable, Subscription } from 'rxjs';
import { UsuarioService } from '../../../services/usuario.service';

export interface NavLink {
  id: number;
  href: string;
  label: string;
}

@Component({
  selector: 'app-header',
  imports: [RouterLink, AsyncPipe],
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
          @for (link of visibleNavLinks; track link.id) {
            <a
              [routerLink]="link.href"
              class="text-white hover:text-gray-300 transition-colors"
            >
              {{ link.label }}
            </a>
          }
          @if (isLoggedIn$ | async) {
            <button
              (click)="logout()"
              class="text-white hover:text-gray-300 transition-colors cursor-pointer"
            >
              Sair
            </button>
          } @else {
            <a routerLink="/entrar" class="text-white hover:text-gray-300 transition-colors">
              Entrar
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
          @for (link of visibleNavLinks; track link.id) {
            <a
              [routerLink]="link.href"
              class="block text-white py-2 hover:text-gray-300"
              (click)="menuAberto = false"
            >
              {{ link.label }}
            </a>
          }
          @if (isLoggedIn$ | async) {
            <button
              (click)="logout(); menuAberto = false"
              class="block w-full text-left text-white py-2 hover:text-gray-300 cursor-pointer"
            >
              Sair
            </button>
          } @else {
            <a
              routerLink="/entrar"
              class="block text-white py-2 hover:text-gray-300"
              (click)="menuAberto = false"
            >
              Entrar
            </a>
          }
        </div>
      }
    </header>
  `,
})
export class HeaderComponent implements OnChanges, OnDestroy {
  @Input() navLinks: NavLink[] = [];
  menuAberto = false;

  isLoggedIn$!: Observable<boolean>;
  visibleNavLinks: NavLink[] = [];
  private sub?: Subscription;

  constructor(
    private usuarioService: UsuarioService,
    private router: Router
  ) {
    this.isLoggedIn$ = this.usuarioService.isLoggedIn$;
    this.sub = this.isLoggedIn$.subscribe(() => this.updateVisibleLinks());
  }

  ngOnChanges(changes: SimpleChanges) {
    if (changes['navLinks']) {
      this.updateVisibleLinks();
    }
  }

  ngOnDestroy() {
    this.sub?.unsubscribe();
  }

  private updateVisibleLinks() {
    const logged = this.usuarioService.usuarioAtual?.usuarioId;
    this.visibleNavLinks = this.navLinks.filter(link => {
      if (link.label === 'Perfil' && !logged) return false;
      return true;
    });
  }

  logout() {
    this.usuarioService.logout();
    this.router.navigate(['/']);
  }
}
