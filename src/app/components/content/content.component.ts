import { Component, inject, OnInit } from '@angular/core';
import { HeaderComponent } from '../structural/header/header.component';
import { FooterComponent } from '../structural/footer/footer.component';
import { Meta, Title } from '@angular/platform-browser';
import { _signalDomain, _signalHomepage,_signalLoader,_signalRoutes,_signalSiteMetadata } from '../../shared/signals';
import { HttpClient } from '@angular/common/http';
import { MetaService } from '../../shared/meta.service';
import { ActivatedRoute } from '@angular/router';
import { SanitizePipe } from '../../shared/sanitize.pipe';
import { ContactComponent } from '../ATMModules/contact/contact.component';
import { ViewContainerRef } from '@angular/core';
import { ViewChild } from '@angular/core';
import { ComponentLoaderService } from '../../shared/component-loader.service';


@Component({
  selector: 'app-content',
  standalone: true,
  imports: [HeaderComponent, FooterComponent, SanitizePipe, ContactComponent],
  templateUrl: './content.component.html',
  styleUrl: './content.component.scss'
})
export class ContentComponent implements OnInit {


  loaded: boolean = false
  domain: string = _signalDomain()
  htmlFront!: string
  htmlHero!:string
  _isHomepage!: boolean
  _pageName!: string | null
  isModule : boolean = false


  @ViewChild('TemplateRefAnchor', { static: false, read: ViewContainerRef }) templateRefAnchor!: ViewContainerRef

  constructor(private http: HttpClient,
    private meta: MetaService,
    private route: ActivatedRoute,
    private loader:ComponentLoaderService
 ) {

  }

  ngOnInit(): void {
   
    if (this.domain == '') {
      console.log('localhost')

    } else {

        if (this.route.routeConfig?.path == '') {

          this._pageName = _signalHomepage()      
          this._isHomepage = true

        } else {

          this._pageName = this.route.routeConfig?.path!

        }
     
        this.setPage(this._pageName!)

    }

  }



  setPage(page : string) {
    const url = 'https://api-airtrame.web.app/v0/firestore/host/'+this.domain+'/'+page+'/hero'

    this.http.get(url).subscribe((data: any) => {

      this.isModule = data.isModule
     
      if(data.isModule){

        const component = this.loader.setComponent(data.selector)!
        setTimeout(()=>{
          this.templateRefAnchor.createComponent(component)
        },1)
        _signalLoader.update(() => 'end')
        this.loaded = true

      }else{
        //If static page Init Hero
        this.htmlHero = data.htmlFront
        _signalLoader.update(() => 'end')
        this.loaded = true
        
        //set Page SEO Meta
        this.meta.setMeta(this.domain,this._isHomepage,data.metadata.name, data.metadata.title, data.metadata.metadescription, data.metadata.keywords)

        //Then init full page
        this.http.get( 'https://api-airtrame.web.app/v0/firestore/host/'+this.domain+'/'+page)
        .subscribe((page : any)=>{
          this.htmlFront = page.htmlFront
        })

      }
      
    })

  }





}
