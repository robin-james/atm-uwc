import { Component, OnInit } from '@angular/core';
import { _signalLoader } from '../../shared/signals';
@Component({
  selector: 'app-maintenance-mode',
  standalone: true,
  imports: [],
  templateUrl: './maintenance-mode.component.html',
  styleUrl: './maintenance-mode.component.scss'
})
export class MaintenanceModeComponent implements OnInit {

  ngOnInit(): void {
    _signalLoader.update(() => 'end')
  }

}
