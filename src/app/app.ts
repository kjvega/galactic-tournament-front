import { Component, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import {AlertComponent} from './shared/components/alert-component/alert-component';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet,AlertComponent],
  templateUrl: './app.html',
  styleUrl: './app.scss'
})
export class App {
  protected readonly title = signal('galactic-tournament-front');
}
