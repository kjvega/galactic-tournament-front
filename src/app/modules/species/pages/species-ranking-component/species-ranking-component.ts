import { ChangeDetectionStrategy, Component, inject, Signal } from '@angular/core';
import { SpeciesService } from '../../services/species.service';
import { Species } from '../../../../models/species.model';
import { toSignal } from '@angular/core/rxjs-interop';

@Component({
  selector: 'app-species-ranking-component',
  imports: [],
  templateUrl: './species-ranking-component.html',
  styleUrl: './species-ranking-component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SpeciesRankingComponent {
  private readonly speciesService = inject(SpeciesService);

  /** Llamada directa al backend usando Signal */
  speciesRanking: Signal<Species[]> = toSignal(
    this.speciesService.getRanking(),
    { initialValue: [] as Species[] }
  );

  /** Ícono de medalla según posición */
  getMedal(index: number): string {
    if (index === 0) return '🥇';
    if (index === 1) return '🥈';
    if (index === 2) return '🥉';
    return '';
  }
}
