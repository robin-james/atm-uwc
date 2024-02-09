import { Injectable, Inject } from '@angular/core';
import { DOCUMENT } from '@angular/common';
import {Meta, Title} from'@angular/platform-browser';

@Injectable({
  providedIn: 'root'
})
export class MetaService {

  constructor(@Inject(DOCUMENT) private dom : any, private meta:Meta, private title:Title) { 
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

  setMeta(SEOtitle : string, SEOmeta : string){

    this.meta.addTag( { 'description': SEOmeta } );  
    this.title.setTitle(SEOtitle)
  
  }

  setMetaBeta(domain : string, pageName : string | undefined ,SEOtitle: string | undefined, SEOmeta: string | undefined, SEOkeywords :string[] | undefined) {
 

    const existingMetadescription =  document.querySelectorAll("meta[name='description']")
    existingMetadescription.forEach((element)=>{
     element.remove()
    })

    const existingKeywords =  document.querySelectorAll("meta[name='keywords']")
    existingKeywords.forEach((element)=>{
     element.remove()
    })


  
    if(SEOmeta != undefined){
      this.meta.addTags([
        { name: 'description', content: SEOmeta }
     
      ]);
    }
  

    if(SEOkeywords != undefined) {
      this.meta.addTags([
        { name: 'keywords', content: SEOkeywords.join(', ') }
      ]);
    }
   

    if(SEOtitle != undefined){
      this.title.setTitle(SEOtitle)
    }else {

     
      this.title.setTitle(pageName!)

    }
    
      const canonical = 'https://'+domain
    if(pageName != undefined){
      
      this.updateCanonicalUrl(canonical+'/'+pageName);
    }else{
     
      this.updateCanonicalUrl(canonical);
    }
  
   


  }

  updateFontLink(url:string){
    const head = this.dom.getElementsByTagName('head')[0];
    //var element: HTMLLinkElement= this.dom.querySelector(`link[rel='canonical']`) || null
    var element

    element = this.dom.createElement('link') as HTMLLinkElement;
    head.appendChild(element);
    element.setAttribute('rel','stylesheet')
    element.setAttribute('href',url)
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
}

