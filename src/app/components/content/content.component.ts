import { Component, inject, OnInit } from '@angular/core';
import { HeaderComponent } from '../structural/header/header.component';
import { FooterComponent } from '../structural/footer/footer.component';
import { Meta, Title } from '@angular/platform-browser';
import { _signalDomain, _signalHomepage,_signalLoader,_signalRoutes,_signalSiteId,_signalSiteMetadata,_signalVariables } from '../../shared/signals';
import { HttpClient } from '@angular/common/http';
import { MetaService } from '../../shared/meta.service';
import { ActivatedRoute } from '@angular/router';
import { SanitizePipe } from '../../shared/sanitize.pipe';


@Component({
  selector: 'app-content',
  standalone: true,
  imports: [HeaderComponent, FooterComponent, SanitizePipe],
  templateUrl: './content.component.html',
  styleUrl: './content.component.scss'
})
export class ContentComponent implements OnInit {


  meta = inject(Meta)
  titl = inject(Title)



  _sections!: any[]
  loaded: boolean = false
  domain: string = _signalDomain()
  htmlFront!: string
  _isHomepage!: boolean
  _pageUrl!: string | null

  constructor(private http: HttpClient,
    private seoService: MetaService,
    private route: ActivatedRoute,) {

  }
  ngOnInit(): void {
    console.log(this.loaded)
    if (this.domain == '') {
      console.log('localhost')

    } else {
     
      this.route.paramMap.subscribe((data: any) => {

     
        if (data.params.name == undefined) {
          this._pageUrl = _signalHomepage()
          this._isHomepage = true
        } else {
          this._pageUrl = data.params.name
        }
        this.sectionInitApi(this._pageUrl!)


      })

    }

  }



  getSectionsApi(page: string) {

    const url = 'https://api-airtrame.web.app/v0/firestore/host/airtrame-uwc.web.app/'+page

    return this.http.get(url)
  }

  sectionInitApi(page : string) {

    this.getSectionsApi(page).subscribe((data: any) => {
     
      console.log(data)
      this.htmlFront = data.htmlFront
      _signalLoader.update(() => 'end')
      this.loaded = true
      console.log(this.loaded)
      this.setMeta(data.name, data.title, data.metadescription, data.keywords)
    })

  }


  setMeta(pageName: string, SEOtitle: string, SEOmeta: string, SEOkeywords: string[]) {



    const existingMetadescription = document.querySelectorAll("meta[name='description']")
    existingMetadescription.forEach((element) => {
      element.remove()
    })

    const existingKeywords = document.querySelectorAll("meta[name='keywords']")
    existingKeywords.forEach((element) => {
      element.remove()
    })



    if (SEOmeta != undefined) {
      this.meta.addTags([
        { name: 'description', content: SEOmeta }

      ]);
    }


    if (SEOkeywords != undefined) {
      this.meta.addTags([
        { name: 'keywords', content: SEOkeywords.join(', ') }
      ]);
    }


    if (SEOtitle != undefined) {
      this.titl.setTitle(SEOtitle)
    } else {


      this.titl.setTitle(pageName!)

    }
    const canonical = 'https://' + _signalDomain()
    if (!this._isHomepage) {

      this.seoService.updateCanonicalUrl(canonical + '/' + pageName);
    } else {

      this.seoService.updateCanonicalUrl(canonical);
    }


  }



}
