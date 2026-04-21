import { Component, viewChild } from '@angular/core';

import { CanDeactivateComponent } from '../../../../core/guards/unsaved-changes.guard';
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
export class ContactCreate implements CanDeactivateComponent {
  private readonly formComponent = viewChild.required(ContactForm);

  canDeactivate(): boolean {
    return this.formComponent().canDeactivate();
  }
}
