import {ChangeDetectionStrategy, Component, inject, OnInit, Signal} from '@angular/core';
import {SpeciesService} from '../../services/species.service';
import {Species} from '../../../../models/species.model';
import {toSignal} from '@angular/core/rxjs-interop';

@Component({
  selector: 'app-species-list-component',
  imports: [],
  templateUrl: './species-list-component.html',
  styleUrl: './species-list-component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SpeciesListComponent implements OnInit {
  private readonly speciesService:SpeciesService = inject(SpeciesService);
  /** Consulta reactiva: sólo la llamada al backend es signal */
  speciesList:Signal<Species[]> = toSignal(this.speciesService.getAll(), {
    initialValue: [] as Species[],
  });

  /** Paginado tradicional */
  currentPage: number = 1;
  pageSize: number = 5;
  totalPages: number = 0;
  pagedSpecies: Species[] = [];

  ngOnInit(): void {
    const data:Species[] = this.speciesList();
    this.totalPages = Math.ceil(data.length / this.pageSize);
    this.updatePage();
  }

  /** Actualiza la página actual */
  updatePage(): void {
    const data: Species[] = this.speciesList();
    const start: number = (this.currentPage - 1) * this.pageSize;
    const end: number = start + this.pageSize;
    this.pagedSpecies = data.slice(start, end);
  }

  /** Cambia la página y recalcula el slice */
  changePage(page: number): void {
    if (page < 1 || page > this.totalPages) return;
    this.currentPage = page;
    this.updatePage();
  }

  /** Devuelve las páginas numéricas */
  get pages(): number[] {
    return Array.from({ length: this.totalPages }, (_, i) => i + 1);
  }

}
