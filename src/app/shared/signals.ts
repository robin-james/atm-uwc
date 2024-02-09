import { HttpClient } from "@angular/common/http";
import {signal} from "@angular/core";
import { Router } from "@angular/router";
import { ContentComponent } from "../components/content/content.component";
import { PageNotFoundComponent } from "../components/page-not-found/page-not-found.component";

export const _signalRoutes = signal([''])
export const _signalDomain  = signal('')
export const _signalLoader  = signal('start')
export const _signalSiteMetadata  = signal({})
export const _signalSiteId  = signal('')
export const _signalHomepage = signal('')
export const _signalVariables = signal(null)


export function initApp(http:HttpClient, router:Router):Promise<void>{

    return new Promise((resolve)=>{

        if (typeof window !== 'undefined') {
          _signalLoader.update(() => 'pre end')
            
            var domain = window.location.host
    
    
            if (domain == 'localhost:4200' || domain == 'localhost:4000' || domain == 'atm-uwc.vercel.app') {
              domain = 'airtrame-uwc.web.app'
            }
    
            _signalDomain.set(domain)
    
            //Get site
            const url = 'https://api-airtrame.web.app/v0/firestore/host/airtrame-uwc.web.app'
    
            http
            .get(url)
            .subscribe((res: any) => {
    
              console.log('*** INIT SITE WITH ***', res)
              _signalSiteMetadata.set(res)
    
              //init variables
              _signalVariables.set(res.variables)
              _signalHomepage.set(res.homepage)
             
              //init routes
              const mapping = res.mapping
              let routes: any = [];
              mapping.forEach((element: any) => {
                routes.push(element.loc)
                router.config.push({ path: element.loc, component: ContentComponent})
              })
    
              _signalRoutes.set(routes)
              router.config.push({ path: '',pathMatch:'full', component: ContentComponent, data:{Homepage : true}})
              router.config.push({ path: '404/notfound', component: PageNotFoundComponent})
              router.config.push({ path: '**', component: PageNotFoundComponent})
              var dox = window.location.pathname
            
             
              router.navigateByUrl(dox)
             
              resolve()
            
            })}
    })

    
}
  
       
    
       
    

    



  



    
        
                
          
    
          
              
          
          
    
       

    
   

    

    




