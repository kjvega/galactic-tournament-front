import {ChangeDetectionStrategy, Component, inject, computed, Signal, signal} from '@angular/core';
import {SpeciesService} from '../../services/species.service';
import {Species} from '../../../../models/species.model';
import {toSignal} from '@angular/core/rxjs-interop';
import {Router} from '@angular/router';

@Component({
  selector: 'app-species-list-component',
  imports: [],
  templateUrl: './species-list-component.html',
  styleUrl: './species-list-component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SpeciesListComponent {
  private readonly speciesService:SpeciesService = inject(SpeciesService);
  router:Router = inject(Router);

  speciesList:Signal<Species[]> = toSignal(this.speciesService.getAll(), {
    initialValue: [] as Species[],
  });

  currentPage = signal(1);
  pageSize = signal(5);

  totalPages = computed(() => {
    const data = this.speciesList();
    return Math.ceil(data.length / this.pageSize());
  });

  pagedSpecies = computed(() => {
    const data = this.speciesList();
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

  goToSpeciesRegister(): void {
    this.router.navigate(['/species/form']);
  }

  goToSpeciesBattle(): void {
    this.router.navigate(['/species/battle']);
  }

  goToSpeciesBattles(): void {
    this.router.navigate(['/species/result/battle']);
  }

  goToSpeciesRanking(): void {
    this.router.navigate(['/species/ranking']);
  }
}
