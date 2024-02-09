import { Component, OnInit } from '@angular/core';
import { Router, RouterModule } from '@angular/router';
import { DomSanitizer, SafeUrl  } from '@angular/platform-browser';
import { _signalRoutes, _signalSiteMetadata } from '../../../shared/signals';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [RouterModule, CommonModule],
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss'
})
export class HeaderComponent implements OnInit {

  constructor( private router:Router, private sanitize:DomSanitizer){}

  dpMobileMenu : boolean =false
  dpSubNavigation : boolean =false
  siteMetadata : any = _signalSiteMetadata()
  _navigationFire : any = this.siteMetadata.navigation
  logoUrl : SafeUrl = this.sanitize.bypassSecurityTrustUrl(this.siteMetadata.variables.assets.logo.color)
  _routes: any[] = _signalRoutes()
  noMenu : boolean = false

  _menu:any[]=[
    {
      label : 'about',
      path :'/about',
      haveIcon : false,
      icon : 'favorite',
      haveSubLabel : true,
      subLabel : [
        {
          label : 'Add',
      path :'/add',
      haveIcon : true,
      icon : 'add',
        },
        {
          label : 'Favorites',
      path :'/new',
      haveIcon : true,
      icon : 'star',
        },

      ]
  },
  {
    label : 'services',
      path :'/home',
      haveIcon : false,
      icon : '',
      haveSubLabel : false,
      subLabel : []
  }
]

_navbar:any = {
  logo : '',
  navigation : this._menu,
  CTAs : [{
    label : 'Contact',
    path : '/contact',
    class : 'adg-button-outlined',
    haveIcon : false,
    icon : 'star',
  },
  {
    label : 'Get started',
    path : '/contact',
    class : 'adg-button-outlined',
    haveIcon : false,
    icon : 'star',
  },
]
}

  ngOnInit(): void {

    this.getMenuType()
  
  }

  navigate(route:string){
    
    this.router.navigate([route])
    this.dpSubNavigation = false
    this.dpMobileMenu = false
  }

  displayMobileMenu(){
    this.dpMobileMenu = !this.dpMobileMenu
    this.dpSubNavigation = false
  }

  subNavigation :  undefined |any[]  = undefined
  subLabel = ''

  displaySubNavigation(label : any | null){

    if( this.dpSubNavigation == false){
      this.dpSubNavigation = true
    }
    
    this.subNavigation = label.subLabel
    this.subLabel = label.label
  }

  SubNavigationBack(){
    this.dpSubNavigation = false
  }


  navigateToHome(){
    this.router.navigate([''])
  }

  getMenuType(){
    if(this._navigationFire.item == undefined && this._navigationFire.CTA.length == 1)
    this.noMenu = true
  }
}

