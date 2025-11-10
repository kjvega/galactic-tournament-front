import {ChangeDetectionStrategy, Component, inject, OnInit, Signal, signal, WritableSignal} from '@angular/core';
import {FormControl, FormGroup, ReactiveFormsModule, Validators} from '@angular/forms';
import {SpeciesService} from '../../services/species.service';
import {NgClass} from '@angular/common';
import {Species} from '../../../../models/species.model';
import {toSignal} from '@angular/core/rxjs-interop';
import {AlertService} from '../../../../shared/services/alert.service';

@Component({
  selector: 'app-species-battle-component',
  imports: [
    ReactiveFormsModule,
    NgClass
  ],
  templateUrl: './species-battle-component.html',
  styleUrl: './species-battle-component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SpeciesBattleComponent implements OnInit {
  private speciesService:SpeciesService = inject(SpeciesService);
  private alertService:AlertService = inject(AlertService);
  battleForm: FormGroup = new FormGroup({});
  speciesList:Signal<Species[]> = toSignal(this.speciesService.getAll(), {
    initialValue: [] as Species[],
  });

  ngOnInit() {
    this.initForm();

  }

  initForm() {
    this.battleForm = new FormGroup({
      fighter1: new FormControl('', [Validators.required]),
      fighter2: new FormControl('', [Validators.required]),
    });
  }


  onSubmit(): void {
    if (this.battleForm.invalid) {
      this.battleForm.markAllAsTouched();
      return;
    }
    const fighter1: number = this.battleForm.get("fighter1")?.value;
    const fighter2: number = this.battleForm.get("fighter2")?.value;
    this.speciesService.fight(fighter1,fighter2).subscribe({next: (response:Species):void => {

        this.alertService.showAlert('success', `Especie Ganadora: ${response.name}`);
        this.battleForm.reset({
          fighter1: '',
          fighter2: ''});
      }})
  }

  generateRandomBattle(): void {
    const data:Species[] = this.speciesList();

    if (!data || data.length < 2) {
      this.alertService.showAlert('info', 'No hay suficientes especies registradas para generar un combate.');
      return;
    }

    const fighter1Index = Math.floor(Math.random() * data.length);
    let fighter2Index;

    do {
      fighter2Index = Math.floor(Math.random() * data.length);
    } while (fighter1Index === fighter2Index);

    const fighter1 = data[fighter1Index];
    const fighter2 = data[fighter2Index];

    this.battleForm.patchValue({
      fighter1: fighter1.id,
      fighter2: fighter2.id,
    });
  }
}
