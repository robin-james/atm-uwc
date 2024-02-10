import { Component, OnInit } from '@angular/core';
import { _signalDomain, _signalLoader } from '../../shared/signals';

@Component({
  selector: 'app-page-not-found',
  standalone: true,
  imports: [],
  templateUrl: './page-not-found.component.html',
  styleUrl: './page-not-found.component.scss'
})
export class PageNotFoundComponent implements OnInit {

  domain = _signalDomain()

  ngOnInit(): void {
    _signalLoader.update(() => 'end')
  }

}
