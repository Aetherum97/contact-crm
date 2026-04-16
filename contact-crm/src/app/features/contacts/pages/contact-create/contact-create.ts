import { Component } from '@angular/core';

import { ContactForm } from '../../components/contact-form/contact-form';

@Component({
  selector: 'app-contact-create',
  imports: [ContactForm],
  template: `
    <div class="page">
      <div class="page__header">
        <h1 class="page__title">New Contact</h1>
      </div>
      <app-contact-form />
    </div>
  `,
})
export class ContactCreate {}
