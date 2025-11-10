import { ChangeDetectionStrategy, Component, effect, inject } from '@angular/core';
import {NgClass, TitleCasePipe} from '@angular/common';
import { AlertService } from '../../services/alert.service';

@Component({
  selector: 'app-alert-component',
  standalone: true,
  imports: [NgClass, TitleCasePipe],
  templateUrl: './alert-component.html',
  styleUrl: './alert-component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AlertComponent {
  private readonly alertService = inject(AlertService);
  alert = this.alertService.alert;

  constructor() {
    effect(() => {
      const current = this.alert();
      if (current) {
        setTimeout(() => this.alertService.clearAlert(), 4500);
      }
    });
  }
}
