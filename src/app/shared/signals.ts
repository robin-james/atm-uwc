import { HttpClient } from "@angular/common/http";
import { signal } from "@angular/core";
import { Router } from "@angular/router";
import { ContentComponent } from "../components/content/content.component";
import { PageNotFoundComponent } from "../components/page-not-found/page-not-found.component";
import { MaintenanceModeComponent } from "../components/maintenance-mode/maintenance-mode.component";

export const _signalRoutes = signal([''])
export const _signalDomain = signal('')
export const _signalLoader = signal('start')
export const _signalSiteMetadata = signal(null)
export const _signalHomepage = signal('')



export function initApp(http: HttpClient, router: Router): Promise<void> {

  return new Promise((resolve) => {

    if (typeof window !== 'undefined') {
      _signalLoader.update(() => 'pre end')
      resolve()

      var domain = window.location.host

      if (domain == 'localhost:4200' || domain == 'localhost:4000' || domain == 'atm-uwc.vercel.app') {
        domain = 'airtrame-uwc.web.app' // development domain
      }

      _signalDomain.set(domain)

      //Get site
      const url = 'https://api-airtrame.web.app/v0/firestore/host/' + domain

      http
        .get(url)
        .subscribe((res: any) => {


          if (!res.maintenanceMode) {
            //Init site Metadata
            _signalSiteMetadata.set(res)

            //init routes
            const mapping = res.mapping
            let routes: any = [];
            mapping.forEach((element: any) => {
              routes.push(element.loc)
              router.config.push({ path: element.loc, component: ContentComponent })
            })

            _signalRoutes.set(routes)
            router.config.push({ path: '', pathMatch: 'full', component: ContentComponent, data: { Homepage: true } })
            router.config.push({ path: '404/notfound', component: PageNotFoundComponent })
            router.config.push({ path: '**', component: PageNotFoundComponent })
            var dox = window.location.pathname

            router.navigateByUrl(dox)

            //init Homepage name
            _signalHomepage.set(res.homepage)

          }else{

            router.config.push({ path: '',pathMatch: 'full', component: MaintenanceModeComponent })
            router.config.push({ path: '**', component: MaintenanceModeComponent })
            router.navigateByUrl('')

          }



        })
    }
  })


}




































