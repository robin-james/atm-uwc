import { HttpClient } from "@angular/common/http";
import {signal} from "@angular/core";
import { Router } from "@angular/router";
import { ContentComponent } from "../components/content/content.component";
import { PageNotFoundComponent } from "../components/page-not-found/page-not-found.component";

export const adgRoutes = signal([''])
export const adgDomain  = signal('')
export const adgLoader  = signal('start')
export const adgSiteMetadata  = signal({})
export const adgSiteId  = signal('')
export const adgHomepage = signal('')
export const adgVariables = signal(null)


export function initApp(http:HttpClient, router:Router):Promise<void>{

    return new Promise((resolve)=>{

        if (typeof window !== 'undefined') {
            adgLoader.update(() => 'pre end')
            
            var domain = window.location.host
    
    
            if (domain == 'localhost:4200' || domain == 'localhost:4000' || domain == 'atm-uwc.vercel.app') {
              domain = 'airtrame-uwc.web.app'
            }
    
            adgDomain.set(domain)
    
            //Get site
            const url = 'https://api-airtrame.web.app/v0/firestore/host/airtrame-uwc.web.app'
    
            http
            .get(url)
            .subscribe((res: any) => {
    
              console.log('*** INIT SITE WITH ***', res)
    
              //init variables
              adgVariables.set(res.variables)
             
              //init routes
              const mapping = res.mapping
              let routes: any = [];
              mapping.forEach((element: any) => {
                routes.push(element.loc)
                router.config.push({ path: element.loc, component: ContentComponent})
              })
    
              adgRoutes.set(routes)
              router.config.push({ path: '',pathMatch:'full', component: ContentComponent, data:{Homepage : true}})
              router.config.push({ path: '404/notfound', component: PageNotFoundComponent})
              router.config.push({ path: '**', component: PageNotFoundComponent})
              var dox = window.location.pathname
            
             
              router.navigateByUrl(dox)
             
              resolve()
            
            })}
    })

    
}
  
       
    
       
    

    



  



    
        
                
          
    
          
              
          
          
    
       

    
   

    

    




