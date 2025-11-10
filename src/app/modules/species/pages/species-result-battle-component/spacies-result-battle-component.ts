import { ChangeDetectionStrategy, Component, computed, inject, Signal, signal } from '@angular/core';
import { SpeciesService } from '../../services/species.service';
import { BattleResult } from '../../../../models/species.model';
import { toSignal } from '@angular/core/rxjs-interop';

@Component({
  selector: 'app-species-result-battle-component',
  imports: [],
  templateUrl: './spacies-result-battle-component.html',
  styleUrl: './spacies-result-battle-component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SpeciesResultBattleComponent {
  private readonly speciesService: SpeciesService = inject(SpeciesService);

  speciesBattleResult: Signal<BattleResult[]> = toSignal(
    this.speciesService.getAllResultBattle(),
    { initialValue: [] as BattleResult[] }
  );

  // Usar signals para el estado de paginación
  currentPage = signal(1);
  pageSize = signal(5);

  totalPages = computed(() => {
    const data = this.speciesBattleResult();
    return Math.ceil(data.length / this.pageSize());
  });

  pagedSpeciesBattleResult = computed(() => {
    const data = this.speciesBattleResult();
    const start = (this.currentPage() - 1) * this.pageSize();
    const end = start + this.pageSize();
    return data.slice(start, end);
  });

  pages = computed(() => {
    return Array.from({ length: this.totalPages() }, (_, i) => i + 1);
  });

  changePage(page: number): void {
    if (page < 1 || page > this.totalPages()) return;
    this.currentPage.set(page);
  }
}
