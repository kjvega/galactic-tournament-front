import {ChangeDetectionStrategy, Component, inject, OnInit} from '@angular/core';
import {SpeciesService} from '../../services/species.service';
import {FormControl, FormGroup, ReactiveFormsModule, Validators} from '@angular/forms';
import {NgClass} from '@angular/common';
import {Species} from '../../../../models/species.model';

@Component({
  selector: 'app-species-form-component',
  imports: [
    NgClass,
    ReactiveFormsModule
  ],
  templateUrl: './species-form-component.html',
  styleUrl: './species-form-component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SpeciesFormComponent implements OnInit {
  speciesService:SpeciesService = inject(SpeciesService)
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
        alert(`Especie registrada: ${response.name}`);
        this.speciesForm.reset({ powerLevel: 0 });
      },
      error: (err) => console.error(err)
    });
  }

}
