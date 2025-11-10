import { ChangeDetectionStrategy, Component } from '@angular/core';
import {RouterLink, RouterLinkActive} from '@angular/router';

@Component({
  selector: 'app-landing-page-component',
  imports: [
    RouterLink,
    RouterLinkActive
  ],
  templateUrl: './landing-page-component.html',
  styleUrl: './landing-page-component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class LandingPageComponent {

}
