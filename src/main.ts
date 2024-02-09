import { bootstrapApplication } from '@angular/platform-browser';
import { appConfig } from './app/app.config';
import { AppComponent } from './app/app.component';
import { HttpClient, withFetch } from '@angular/common/http';
import { Router, withDisabledInitialNavigation } from '@angular/router';
import { provideHttpClient } from '@angular/common/http';
import { provideRouter } from '@angular/router';
import { routes } from './app/app.routes';
import { APP_INITIALIZER } from '@angular/core';
import { initApp } from './app/shared/signals';
import { provideClientHydration } from '@angular/platform-browser';


  
  export function initializeApp(http: HttpClient, router: Router) {
    return () => initApp(http,router)
    }

  bootstrapApplication(AppComponent, {
    providers: [
      provideClientHydration(),
      provideHttpClient(withFetch()),
      provideRouter(routes, withDisabledInitialNavigation()),
      {
        provide: APP_INITIALIZER,
        useFactory: initializeApp,
        multi: true,
        deps: [HttpClient, Router],
      },
    ],
  }).catch(err => console.error(err));