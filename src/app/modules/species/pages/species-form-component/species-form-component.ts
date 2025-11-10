import {ChangeDetectionStrategy, Component, inject, OnInit} from '@angular/core';
import {SpeciesService} from '../../services/species.service';
import {FormControl, FormGroup, ReactiveFormsModule, Validators} from '@angular/forms';
import {NgClass} from '@angular/common';
import {Species} from '../../../../models/species.model';
import {AlertService} from '../../../../shared/services/alert.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-species-form-component',
  imports: [
    NgClass,
    ReactiveFormsModule
  ],
  templateUrl: './species-form-component.html',
  styleUrl: './species-form-component.scss',
  changeDetection: ChangeDetectionStrategy.Default,
})
export class SpeciesFormComponent implements OnInit {
  speciesService:SpeciesService = inject(SpeciesService)
  alertService:AlertService = inject(AlertService)
  router:Router = inject(Router)
  speciesForm:FormGroup = new FormGroup({});

  ngOnInit() {
    this.initForm();
  }

  initForm():void{
    this.speciesForm = new FormGroup({
      name: new FormControl('',[Validators.required]),
      powerLevel: new FormControl(0,[Validators.required,Validators.min(1)]),
      specialSkill: new FormControl('',[Validators.required])

    });
  }

  onSubmit(): void {
    if (this.speciesForm.invalid) return;
    this.speciesService.register(this.speciesForm.value).subscribe({
      next: (response:Species):void => {
        this.alertService.showAlert('success', `Especie registrada: ${response.name}`);
        this.speciesForm.reset({ powerLevel: 0 });
      },
      error: (err) => console.error(err)
    });
  }

  goToSpeciesList(): void {
    this.router.navigate(['/species/list']);
  }

}
