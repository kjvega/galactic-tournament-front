import { Injectable, signal, WritableSignal } from '@angular/core';
import { Alert } from '../../models/alert.model';

@Injectable({
  providedIn: 'root'
})
export class AlertService {
  private _alert: WritableSignal<Alert | null> = signal<Alert | null>(null);
  private timeoutId: any;

  readonly alert = this._alert.asReadonly();

  showAlert(type: Alert['type'], message: string): void {
    this._alert.set({ type, message });

    if (this.timeoutId) clearTimeout(this.timeoutId);

    this.timeoutId = setTimeout(() => {
      this.clearAlert();
    }, 4000);
  }

  clearAlert(): void {
    this._alert.set(null);
    if (this.timeoutId) clearTimeout(this.timeoutId);
  }
}
