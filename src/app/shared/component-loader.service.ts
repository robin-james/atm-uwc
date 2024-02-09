import { Injectable } from '@angular/core';
import { ContactComponent } from '../components/ATMModules/contact/contact.component';

@Injectable({
  providedIn: 'root'
})
export class ComponentLoaderService {

  constructor() { }

  setComponent(selector : string){
    if(selector == 'atm-contact'){
      return ContactComponent
    }else{
      return undefined
    }
  }
}
