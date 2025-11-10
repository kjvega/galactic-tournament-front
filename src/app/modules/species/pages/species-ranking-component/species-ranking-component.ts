import { ChangeDetectionStrategy, Component, inject, OnInit, Signal } from '@angular/core';
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
export class SpeciesRankingComponent implements OnInit {
  private readonly speciesService: SpeciesService = inject(SpeciesService);

  speciesRanking: Signal<Species[]> = toSignal(
    this.speciesService.getRanking(),
    { initialValue: [] as Species[] }
  );

  currentPage: number = 1;
  pageSize: number = 5;
  totalPages: number = 0;
  pagedSpecies: Species[] = [];

  ngOnInit(): void {
    const data: Species[] = this.speciesRanking();
    this.totalPages = Math.ceil(data.length / this.pageSize);
    this.updatePage();
  }

  updatePage(): void {
    const data: Species[] = this.speciesRanking();
    const start: number = (this.currentPage - 1) * this.pageSize;
    const end: number = start + this.pageSize;
    this.pagedSpecies = data.slice(start, end);
  }

  changePage(page: number): void {
    if (page < 1 || page > this.totalPages) return;
    this.currentPage = page;
    this.updatePage();
  }

  get pages(): number[] {
    return Array.from({ length: this.totalPages }, (_, i) => i + 1);
  }

  getMedal(index: number): string {
    const globalIndex = (this.currentPage - 1) * this.pageSize + index;
    if (globalIndex === 0) return '🥇';
    if (globalIndex === 1) return '🥈';
    if (globalIndex === 2) return '🥉';
    return '';
  }
}
