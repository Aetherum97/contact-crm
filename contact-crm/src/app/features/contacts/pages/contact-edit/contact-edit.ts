import { Component, computed, inject, input } from '@angular/core';
import { RouterLink } from '@angular/router';

import { ContactsService } from '../../../../core/services/contacts.service';
import { ContactForm } from '../../components/contact-form/contact-form';

@Component({
  selector: 'app-contact-edit',
  imports: [RouterLink, ContactForm],
  templateUrl: './contact-edit.html',
  styleUrl: './contact-edit.scss',
})
export class ContactEdit {
  private readonly contactsService = inject(ContactsService);

  // Bound from route param via withComponentInputBinding()
  readonly id = input.required<string>();

  protected readonly contact = computed(() =>
    this.contactsService.getById(this.id()),
  );
}
