import { APP_INITIALIZER, Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { bootstrapApplication } from '@angular/platform-browser';
import {
  HttpClient,
  HttpClientModule,
  provideHttpClient,
  withFetch,
} from '@angular/common/http';
import { Observable, of, take, tap } from 'rxjs';

export function initializeApp(http: HttpClient) {

  setTimeout(()=>{
    return (): Observable<any> =>
    http
      .get('https://651ec54444a3a8aa4768fa35.mockapi.io/user')
      .pipe(tap((data) => console.log(data)));
  },5000)
  
}

@Component({
  selector: 'my-app',
  standalone: true,
  imports: [CommonModule],
  template: `
    <h1>Hello from {{ name }}!</h1>
    <a target="_blank" href="https://angular.io/start">
      Learn more about Angular
    </a>
  `,
})
export class App {
  name = 'Angular 16';
}

bootstrapApplication(App, {
  providers: [
    provideHttpClient(withFetch()),
    {
      provide: APP_INITIALIZER,
      useFactory: initializeApp,
      multi: true,
      deps: [HttpClient],
    },
  ],
});
