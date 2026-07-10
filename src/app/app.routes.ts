import { Routes } from '@angular/router';
import { HomeComponent } from './pages/home/home.component';
import { LoginComponent } from './pages/login/login.component';
import { RegisterComponent } from './pages/register/register.component';
import { MapaComponent } from './pages/mapa/mapa.component';
import { RankingComponent } from './pages/ranking/ranking.component';
import { ProfileComponent } from './pages/profile/profile.component';
import { SobreNosComponent } from './pages/sobre-nos/sobre-nos.component';
import { TermosDeUsoComponent } from './pages/termos-de-uso/termos-de-uso.component';
import { PoliticaPrivacidadeComponent } from './pages/politica-privacidade/politica-privacidade.component';
import { UnidadeDetailComponent } from './pages/unidade-detail/unidade-detail.component';
import { RegistrarLotacaoComponent } from './pages/registrar-lotacao/registrar-lotacao.component';

export const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'entrar', component: LoginComponent },
  { path: 'criar-conta', component: RegisterComponent },
  { path: 'mapa', component: MapaComponent },
  { path: 'ranking', component: RankingComponent },
  { path: 'perfil', component: ProfileComponent },
  { path: 'sobre-nos', component: SobreNosComponent },
  { path: 'termos-de-uso', component: TermosDeUsoComponent },
  { path: 'politica-de-privacidade', component: PoliticaPrivacidadeComponent },
  { path: 'unidade/:id', component: UnidadeDetailComponent },
  { path: 'unidade/:id/registrar-lotacao', component: RegistrarLotacaoComponent },
  { path: '**', redirectTo: '' },
];
