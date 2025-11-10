import { ChangeDetectionStrategy, Component, inject, computed, Signal, signal } from '@angular/core';
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
  private readonly speciesService: SpeciesService = inject(SpeciesService);

  speciesRanking: Signal<Species[]> = toSignal(
    this.speciesService.getRanking(),
    { initialValue: [] as Species[] }
  );

  // Convertir a signals
  currentPage = signal(1);
  pageSize = signal(5);

  totalPages = computed(() => {
    const data = this.speciesRanking();
    return Math.ceil(data.length / this.pageSize());
  });

  pagedSpecies = computed(() => {
    const data = this.speciesRanking();
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

  getMedal(index: number): string {
    const globalIndex = (this.currentPage() - 1) * this.pageSize() + index;
    if (globalIndex === 0) return '🥇';
    if (globalIndex === 1) return '🥈';
    if (globalIndex === 2) return '🥉';
    return '';
  }
}
