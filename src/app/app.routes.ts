import { Routes } from '@angular/router';
import {LandingPageComponent} from './core/components/landing-page-component/landing-page-component';

export const routes: Routes = [
  { path: '', redirectTo: '/landing', pathMatch: 'full' },
  { path: 'landing', component: LandingPageComponent},
  {
    path: 'species',
    loadChildren: () => import('./modules/species/species.routes')
      .then(m => m.speciesRoutes)
  },
];
