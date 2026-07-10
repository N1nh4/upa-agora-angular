import { Component, Inject, OnInit, PLATFORM_ID, ViewChild, ElementRef, AfterViewInit } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';
import { HeaderComponent, NavLink } from '../../shared/components/header/header.component';
import { MapaService } from '../../services/mapa.service';
import { UnidadeMapaDTO } from '../../models/unidade-mapa-dto';

@Component({
  selector: 'app-mapa',
  imports: [HeaderComponent],
  template: `
    <div class="fixed inset-0 flex flex-col overflow-hidden">
      <app-header [navLinks]="navLinks" />
      <div class="flex-1 z-0 mt-16" #mapContainer></div>
    </div>
  `,
})
export class MapaComponent implements OnInit, AfterViewInit {
  @ViewChild('mapContainer', { static: true }) mapContainer!: ElementRef;

  navLinks: NavLink[] = [
    { id: 1, label: 'Registrar lotação', href: '/' },
    { id: 2, label: 'Ir para o mapa', href: '/mapa' },
    { id: 3, label: 'Ranking', href: '/ranking' },
    { id: 4, label: 'Entrar', href: '/entrar' },
    { id: 5, label: 'Criar conta', href: '/criar-conta' },
    { id: 6, label: 'Sobre nós', href: '/sobre-nos' },
    { id: 7, label: 'Configurações', href: '/perfil' },
  ];

  upas: UnidadeMapaDTO[] = [];
  private map: any = null;
  private isBrowser: boolean;

  constructor(
    private mapaService: MapaService,
    @Inject(PLATFORM_ID) platformId: Object
  ) {
    this.isBrowser = isPlatformBrowser(platformId);
  }

  async ngOnInit() {
    if (!this.isBrowser) return;
    try {
      this.upas = await this.mapaService.getUnidadesMapa();
    } catch (err) {
      console.error('Erro ao carregar mapa:', err);
    }
  }

  ngAfterViewInit() {
    if (!this.isBrowser) return;
    this.initMap();
  }

  private async initMap() {
    const L = await import('leaflet');
    const el = this.mapContainer.nativeElement;
    if (!el) return;

    this.map = L.map(el, {
      center: [-12.97, -38.51],
      zoom: 12,
      scrollWheelZoom: true,
    });

    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      attribution: '© OpenStreetMap',
    }).addTo(this.map);

    setTimeout(() => this.map.invalidateSize(), 200);

    this.upas.forEach((upa) => {
      const cor = this.definirCor(upa.status);
      const icon = L.divIcon({
        html: `<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="${cor}" stroke="white" stroke-width="2"><circle cx="12" cy="12" r="10"/></svg>`,
        className: '',
        iconSize: [32, 32],
        iconAnchor: [16, 16],
      });

      L.marker([upa.lat, upa.lng], { icon })
        .addTo(this.map)
        .bindPopup(upa.nome);
    });
  }

  private definirCor(status: string): string {
    switch (status) {
      case 'VAZIO':
      case 'POUCO_VAZIO':
        return '#22c55e';
      case 'MODERADO':
        return '#eab308';
      case 'CHEIO':
      case 'MUITO_CHEIO':
        return '#ef4444';
      default:
        return '#22c55e';
    }
  }
}
