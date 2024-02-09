import { Component, OnInit } from '@angular/core';
import { ChangeDetectorRef } from '@angular/core';
import { FormBuilder, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { ActivatedRoute, Router } from '@angular/router';
import { _signalSiteMetadata } from '../../../shared/signals';
import { Validators } from '@angular/forms';
import { inject } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { Observable } from 'rxjs';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-contact',
  standalone: true,
  imports: [FormsModule, CommonModule, ReactiveFormsModule],
  templateUrl: './contact.component.html',
  styleUrl: './contact.component.scss'
})
export class ContactComponent implements OnInit {

  siteMetadata : any = _signalSiteMetadata()
  _navigationFire : any = this.siteMetadata.navigation
  userVars : any[] = this.siteMetadata.variables.userVars
  _details! : any 

  constructor(
 
    private changeDetector: ChangeDetectorRef,
     private fb:FormBuilder, 
     private http:HttpClient, 
     private router:Router,
     private route:ActivatedRoute
  ) {}

  contactForm = this.fb.group({
    name: ['', [Validators.required, Validators.minLength(3)]],
    phone: [''],
    mail: ['',[Validators.email, Validators.required]],
    message: ['', [Validators.required, Validators.minLength(3)]],
  });


  

  titl = inject(Title)
  metadata : any = _signalSiteMetadata()
  ngOnInit(): void {
    this.setUserVariables()
    console.log(this._details)
      this.titl.setTitle(this.route.routeConfig?.path!)
  
  }
  onSubmit(){
    console.log('form data:', this.contactForm)
    this.sendMail(this.contactForm.value.mail!, this.contactForm.value.name!, this._details.mail, this._details.name, 'Contact Site Internet', this.contactForm.value.message! )
    .subscribe((data : any)=>{
    
      window.alert('Le message a été envoyé')
     
    })
  }

  sendMail(senderMail : string, senderName : string, mail : string, name: string, mailSubject: string, mailBody: string) : Observable<any>{
  
    const recipientMail = mail
    const recipientName = name

    const subject = mailSubject
    const body = mailBody + '<br> <p>Numéro de téléphone</p> ' +this.contactForm.value.phone
    
    const key = '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'
    
    const headers = {'accept':'application/json', 'api-key': key, 'Content-Type': 'application/json' }
    const url = "https://api.brevo.com/v3/smtp/email"

    const data = {  
      "sender":{  
         "name":senderName,
         "email":senderMail
      },
      "to":[  
         {  
            "email":recipientMail,
            "name":recipientName
         }
      ],
      "subject":subject,
      "htmlContent":body
     
   }

  return  this.http.post<any>(url, data,{ headers } )

  }


  setUserVariables(){

    let ob : any ={}

    this.userVars.forEach((element)=>{
  
      ob[element.key]=element.value
    })



    this._details = ob


  }
}

