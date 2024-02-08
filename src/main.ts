import { bootstrapApplication } from '@angular/platform-browser';
import { appConfig } from './app/app.config';
import { AppComponent } from './app/app.component';
import { HttpClient } from '@angular/common/http';
import { Router, withDisabledInitialNavigation } from '@angular/router';
import { Observable, tap, from } from 'rxjs';
import { provideHttpClient } from '@angular/common/http';
import { provideRouter } from '@angular/router';
import { routes } from './app/app.routes';
import { APP_INITIALIZER } from '@angular/core';



  
  export function initializeUserData(http: HttpClient, router: Router) {
    return (): Observable<void> =>
      http
        .get('https://api-airtrame.web.app/v0/firestore/host/airtrame-uwc.web.app')
        .pipe(tap((data:any) => console.log('*** INIT ***',data)));
  }
  
  bootstrapApplication(AppComponent, {
    providers: [
      provideHttpClient(),
      provideRouter(routes, withDisabledInitialNavigation()),
      {
        provide: APP_INITIALIZER,
        useFactory: initializeUserData,
        multi: true,
        deps: [HttpClient, Router],
      },
    ],
  }).catch(err => console.error(err));