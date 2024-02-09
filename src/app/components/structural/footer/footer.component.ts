import { Component, OnInit } from '@angular/core';
import { _signalRoutes, _signalSiteMetadata } from '../../../shared/signals';
import { DomSanitizer } from '@angular/platform-browser';
import { SafeUrl } from '@angular/platform-browser';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-footer',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './footer.component.html',
  styleUrl: './footer.component.scss'
})
export class FooterComponent implements OnInit{

  constructor(private sanitize:DomSanitizer){}

  siteMetadata : any = _signalSiteMetadata()
  _navigationFire : any = this.siteMetadata.navigation
  userVars : any[] = this.siteMetadata.variables.userVars
  _details! : any
  logoUrl : SafeUrl = this.sanitize.bypassSecurityTrustUrl(this.siteMetadata.variables.assets.logo.color)
  _menu : any[] = _signalRoutes()
  _footer : any[] = this.siteMetadata.footer

  
ngOnInit(): void {
  this.setUserVariables()
 
}
  setUserVariables(){

    let ob : any ={}

    this.userVars.forEach((element)=>{
  
      ob[element.key]=element.value
    })

    this._details = ob


  }
}
