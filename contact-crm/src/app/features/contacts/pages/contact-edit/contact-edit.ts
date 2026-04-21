import { Component, input, viewChild } from '@angular/core';
import { RouterLink } from '@angular/router';

import { Contact } from '../../../../core/models/contact.model';
import { CanDeactivateComponent } from '../../../../core/guards/unsaved-changes.guard';
import { ContactForm } from '../../components/contact-form/contact-form';

@Component({
  selector: 'app-contact-edit',
  imports: [RouterLink, ContactForm],
  templateUrl: './contact-edit.html',
  styleUrl: './contact-edit.scss',
})
export class ContactEdit implements CanDeactivateComponent {
  // Provided by contactResolver via withComponentInputBinding()
  readonly contact = input.required<Contact>();

  private readonly formComponent = viewChild.required(ContactForm);

  canDeactivate(): boolean {
    return this.formComponent().canDeactivate();
  }
}
