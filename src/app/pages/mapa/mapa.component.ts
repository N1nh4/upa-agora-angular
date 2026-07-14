import { Component, ViewChild, ElementRef, afterNextRender, Inject, PLATFORM_ID, ChangeDetectorRef } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';
import { HeaderComponent, NavLink } from '../../shared/components/header/header.component';
import { MapaService } from '../../services/mapa.service';
import { UnidadeMapaDTO } from '../../models/unidade-mapa-dto';

@Component({
  selector: 'app-mapa',
  imports: [HeaderComponent],
  template: `
    <div class="fixed inset-0 overflow-hidden">
      <app-header [navLinks]="navLinks" />
      @if (carregando) {
        <div class="absolute inset-0 flex flex-col items-center justify-center bg-gray-100" style="top: 64px; z-index: 1000;">
          <div class="w-10 h-10 border-4 border-verdeEscuro border-t-transparent rounded-full animate-spin"></div>
          <p class="text-gray-600 mt-4">Carregando mapa...</p>
        </div>
      }
      <div #mapContainer style="position: absolute; top: 64px; left: 0; width: 100%; height: calc(100% - 64px);"></div>
    </div>
  `,
})
export class MapaComponent {
  @ViewChild('mapContainer', { static: true }) mapContainer!: ElementRef;

  navLinks: NavLink[] = [
    { id: 1, label: 'Registrar lotação', href: '/' },
    { id: 2, label: 'Ir para o mapa', href: '/mapa' },
    { id: 3, label: 'Ranking', href: '/ranking' },
    { id: 4, label: 'Sobre nós', href: '/sobre-nos' },
    { id: 5, label: 'Perfil', href: '/perfil' },
  ];

  upas: UnidadeMapaDTO[] = [];
  carregando = true;
  private map: any = null;

  constructor(
    private mapaService: MapaService,
    private cdr: ChangeDetectorRef,
    @Inject(PLATFORM_ID) private platformId: Object,
  ) {
    afterNextRender(() => {
      if (!isPlatformBrowser(this.platformId)) return;
      this.init();
    });
  }

  private async init() {
    try {
      const data = await this.mapaService.getUnidadesMapa();
      this.upas = Array.isArray(data) ? data : [];
    } catch (err) {
      console.error('Erro ao carregar mapa:', err);
      this.upas = [];
    }

    try {
      const leafletModule = await import('leaflet');
      const L = (leafletModule as any).default || leafletModule;
      const el = this.mapContainer.nativeElement;

      this.map = L.map(el, {
        center: [-12.97, -38.51],
        zoom: 12,
        scrollWheelZoom: true,
      });

      L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        attribution: '© OpenStreetMap',
      }).addTo(this.map);

      this.upas.forEach((upa) => {
        const cor = this.definirCor(upa.status);
        const icon = L.divIcon({
          html: `<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="${cor}" stroke="white" stroke-width="2"><circle cx="12" cy="12" r="10"/></svg>`,
          className: '',
          iconSize: [32, 32],
          iconAnchor: [16, 16],
        });

        const popupContent = `
          <div style="text-align:center; min-width:150px">
            <strong>${upa.nome}</strong>
            <br/>
            <a href="https://www.google.com/maps/dir/?api=1&destination=${upa.lat},${upa.lng}"
               target="_blank"
               rel="noopener noreferrer"
               style="display:inline-block; margin-top:8px; padding:6px 12px; background:#004E4C; color:white; border-radius:6px; text-decoration:none; font-size:13px; font-weight:bold; cursor:pointer;">
              Abrir no Google Maps
            </a>
          </div>
        `;

        L.marker([upa.lat, upa.lng], { icon })
          .addTo(this.map)
          .bindPopup(popupContent);
      });

      this.carregando = false;
      this.cdr.detectChanges();
      this.map.invalidateSize();
    } catch (err) {
      console.error('Erro ao inicializar mapa:', err);
      this.carregando = false;
      this.cdr.detectChanges();
    }
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
