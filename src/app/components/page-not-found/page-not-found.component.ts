import { Component } from '@angular/core';
import { _signalDomain } from '../../shared/signals';

@Component({
  selector: 'app-page-not-found',
  standalone: true,
  imports: [],
  templateUrl: './page-not-found.component.html',
  styleUrl: './page-not-found.component.scss'
})
export class PageNotFoundComponent {

  domain = _signalDomain()

}
