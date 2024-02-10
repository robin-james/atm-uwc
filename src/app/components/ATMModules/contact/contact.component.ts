import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { ActivatedRoute, Router } from '@angular/router';
import { _signalSiteMetadata } from '../../../shared/signals';
import { Validators } from '@angular/forms';
import { inject } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { CommonModule } from '@angular/common';
import { MetaService } from '../../../shared/meta.service';

@Component({
  selector: 'app-contact',
  standalone: true,
  imports: [FormsModule, CommonModule, ReactiveFormsModule],
  templateUrl: './contact.component.html',
  styleUrl: './contact.component.scss'
})
export class ContactComponent implements OnInit {

  siteMetadata: any = _signalSiteMetadata()
  userVars: any[] = this.siteMetadata.variables.userVars
  _details!: any

  constructor(
    private fb: FormBuilder,
    private http: HttpClient,
    private route: ActivatedRoute,
    private meta: MetaService
  ) { }

  contactForm = this.fb.group({
    name: ['', [Validators.required, Validators.minLength(3)]],
    phone: [''],
    mail: ['', [Validators.email, Validators.required]],
    message: ['', [Validators.required, Validators.minLength(3)]],
  });


  titl = inject(Title)
  metadata: any = _signalSiteMetadata()

  ngOnInit(): void {

    this.setUserVariables()
    this.titl.setTitle(this.route.routeConfig?.path!)

  }
  onSubmit() {

    this.sendMailAPI(this.contactForm.value.mail!, this.contactForm.value.name!, this._details.mail, this._details.name, 'Contact Site Internet', this.contactForm.value.message!)
      .subscribe(() => {
    
        window.alert('Le message a été envoyé')

      })
  }


  sendMailAPI(senderMail: string, senderName: string, recipientMail: string, recipientName: string, mailSubject: string, mailBody: string) {
    const url = "https://api-airtrame.web.app/v0/mail/send"
    const body = mailBody + '<br> <p>Numéro de téléphone</p> ' + this.contactForm.value.phone
    const data = {
      recipientMail: recipientMail,
      recipientName: recipientName,
      mailSubject: mailSubject,
      mailBody: body,
      senderName: senderName,
      senderMail: senderMail,
    }

    return this.http.post<any>(url, data)
  }

  setUserVariables() {

    this._details = this.meta.setUserVariables(this.userVars)


  }
}

