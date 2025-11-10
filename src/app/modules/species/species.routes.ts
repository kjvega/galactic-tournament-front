import { Routes } from '@angular/router';
import {SpeciesFormComponent} from './pages/species-form-component/species-form-component';
import {SpeciesListComponent} from './pages/species-list-component/species-list-component';
import {SpeciesBattleComponent} from './pages/species-battle-component/species-battle-component';
import {SpeciesRankingComponent} from './pages/species-ranking-component/species-ranking-component';


export const speciesRoutes: Routes = [
  { path: '', redirectTo: 'form', pathMatch: 'full' },
  { path: 'form', component: SpeciesFormComponent },
  { path: 'list', component: SpeciesListComponent },
  { path: 'battle', component: SpeciesBattleComponent },
  { path: 'ranking', component: SpeciesRankingComponent }
];
