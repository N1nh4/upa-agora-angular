import { Component, ViewChild, ElementRef, afterNextRender } from '@angular/core';
import { HeaderComponent, NavLink } from '../../shared/components/header/header.component';
import { MapaService } from '../../services/mapa.service';
import { UnidadeMapaDTO } from '../../models/unidade-mapa-dto';

@Component({
  selector: 'app-mapa',
  imports: [HeaderComponent],
  template: `
    <div class="fixed inset-0 overflow-hidden">
      <app-header [navLinks]="navLinks" />
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
    { id: 4, label: 'Entrar', href: '/entrar' },
    { id: 5, label: 'Criar conta', href: '/criar-conta' },
    { id: 6, label: 'Sobre nós', href: '/sobre-nos' },
    { id: 7, label: 'Configurações', href: '/perfil' },
  ];

  upas: UnidadeMapaDTO[] = [];
  private map: any = null;

  constructor(
    private mapaService: MapaService,
  ) {
    afterNextRender(() => {
      console.log('[Mapa] afterNextRender executou');
      this.carregarDados().then(() => {
        setTimeout(() => {
          console.log('[Mapa] chamando initMap');
          this.initMap();
        }, 100);
      });
    });
  }

  private async carregarDados() {
    try {
      this.upas = await this.mapaService.getUnidadesMapa();
    } catch (err) {
      console.error('Erro ao carregar mapa:', err);
    }
  }

  private async initMap() {
    console.log('[Mapa] initMap iniciou');
    const L = await import('leaflet');
    const el = this.mapContainer.nativeElement;
    if (!el) { console.log('[Mapa] erro: elemento nao encontrado'); return; }

    console.log('[Mapa] container dimensions:', el.clientWidth, 'x', el.clientHeight);

    this.map = L.map(el, {
      center: [-12.97, -38.51],
      zoom: 12,
      scrollWheelZoom: true,
    });

    const tileLayer = L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      attribution: '© OpenStreetMap',
    });

    tileLayer.on('tileerror', (e: any) => {
      console.error('[Mapa] tile error:', e);
    });

    tileLayer.addTo(this.map);

    setTimeout(() => this.map.invalidateSize(), 200);
    setTimeout(() => this.map.invalidateSize(), 500);

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
