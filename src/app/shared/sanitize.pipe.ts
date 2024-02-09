import { Pipe, PipeTransform } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
import { SafeHtml } from '@angular/platform-browser';

@Pipe({
  name: 'sanitize',
  standalone: true
})
export class SanitizePipe implements PipeTransform {

  constructor(private _sanitizer: DomSanitizer) { }

  transform(value: string): SafeHtml {
    return this._sanitizer.bypassSecurityTrustHtml(value);
  }

}
