import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterOutlet } from '@angular/router';
import { HttpClientModule } from '@angular/common/http';
import { effect } from '@angular/core';
import { _signalSiteMetadata, _signalLoader } from './shared/signals';
import { MetaService } from './shared/meta.service';


@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, RouterOutlet, HttpClientModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})

export class AppComponent {

  loaded : boolean = true

  constructor(private meta:MetaService){

    effect(()=>{
    
      if(_signalLoader()=='end'){
        this.loaded = false
      }
    })
   


    effect(()=> {
      if(_signalSiteMetadata() != null){

        var metadata : any = _signalSiteMetadata()
     
        // set Favicon
        //var _faviconUrl : any = metadata.variables.assets.favicon
        this.meta.setFavicon(metadata.variables.assets.favicon)
        

        //set User Custom Style
        //import css
      var importCss = ''



      var cssStart = ` * {`
      var cssEnd = '}'

        //set fonts
      metadata.variables.style.fonts.forEach((font: any) => {
        importCss = importCss.concat('\n', font.import)
        const variable = font.key + ': ' + font.value + ';'
        cssStart =  cssStart.concat('\n', variable)
      })

         //set colors
      metadata.variables.style.colors.forEach((color: any) => {
      
        const variable = color.key + ': ' + color.value + ';'
        cssStart =  cssStart.concat('\n', variable)
      })

        //set layout
        metadata.variables.style.layout.forEach((lay: any) => {
      
          const variable = lay.key + ': ' + lay.value + ';'
          cssStart =  cssStart.concat('\n', variable)
        })

      let additionalCssStyle = document.getElementById('additionalCss');
      if (!additionalCssStyle) {
        additionalCssStyle = document.createElement("style");
        additionalCssStyle.id = 'additionalCss';
        document.head.appendChild(additionalCssStyle);
      }
      cssStart = cssStart.concat('\n', cssEnd)
      importCss = importCss.concat('\n', cssStart)
      additionalCssStyle.innerHTML = importCss;
      }
    })
  }
}


