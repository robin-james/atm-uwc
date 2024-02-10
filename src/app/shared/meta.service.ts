import { Injectable, Inject, inject } from '@angular/core';
import { DOCUMENT } from '@angular/common';
import {Meta, Title} from'@angular/platform-browser';

@Injectable({
  providedIn: 'root'
})
export class MetaService {

  title = inject(Title)

  constructor(@Inject(DOCUMENT) private dom : any, private meta:Meta) { 
  }
    
  updateCanonicalUrl(url:string){
    const head = this.dom.getElementsByTagName('head')[0];
    var element: HTMLLinkElement= this.dom.querySelector(`link[rel='canonical']`) || null
    if (element==null) {
      element= this.dom.createElement('link') as HTMLLinkElement;
      head.appendChild(element);
    }
    element.setAttribute('rel','canonical')
    element.setAttribute('href',url)
  }


  setMeta(domain : string, isHomepage:boolean, pageName: string, SEOtitle: string, SEOmeta: string, SEOkeywords: string[]) {

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
      this.title.setTitle(SEOtitle)
    } else {
      this.title.setTitle(pageName!)
    }

    const canonical = 'https://' + domain
    if (!isHomepage) {
      this.updateCanonicalUrl(canonical + '/' + pageName);
    } else {
      this.updateCanonicalUrl(canonical);
    }


  }

 

  setFavicon(url : string){
    var link: HTMLLinkElement = document.querySelector("link[rel~='icon']")!;
if (!link) {
    link = document.createElement('link');
    link.rel = 'icon';
    document.head.appendChild(link);
}
link.href = url;

  }

  setUserVariables(userVars : any[]){

    let ob : any ={}

    userVars.forEach((element)=>{
  
      ob[element.key]=element.value
    })

    return ob

  }
}

