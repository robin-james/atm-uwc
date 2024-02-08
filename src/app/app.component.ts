import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterOutlet } from '@angular/router';
import { HttpClient, HttpClientModule } from '@angular/common/http';


import { adgLoader, adgDomain, adgVariables, adgSiteId,adgHomepage,adgRoutes,adgSiteMetadata } from './shared/signals';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, RouterOutlet, HttpClientModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent implements OnInit{
  title = 'atm-uwc';

  constructor(private http:HttpClient){}

  ngOnInit(): void {
    this.initializeApp()
    console.log('test')
  }

  initializeApp(){
  
  
        if (typeof window !== 'undefined') {
          adgLoader.update(() => 'pre end')
          
         
  
          var domain = window.location.host
  
          if (domain == 'localhost:4200' || domain == 'localhost:4000') {
            domain = 'airtrame-uwc.web.app'
          }
  
          adgDomain.set(domain)
  
          //Get site
          const url = 'https://api-airtrame.web.app/v0/firestore/host/airtrame-uwc.web.app'
  
          this.http.get(url).subscribe((res: any) => {
  
            console.log('*** INIT SITE WITH ***', res)
  
            //init variables
            adgVariables.set(res.variables)
           
  
            //init routes
            const mapping = res.mapping
            let routes: any = [];
            mapping.forEach((element: any) => {
              routes.push(element.loc)
            })
  
            adgRoutes.set(routes)
  
            var dox = window.location.pathname
  

            
           // router.navigateByUrl(dox)
  
          })
  
    
  
  
  
      
  
  }
}
}
