import { inject } from '@angular/core';
import { RedirectCommand, ResolveFn, Router } from '@angular/router';

import { Contact } from '../models/contact.model';
import { ContactsService } from '../services/contacts.service';

/**
 * Resolves the target Contact from the route :id param.
 * Redirects to /contacts if the ID is unknown.
 */
export const contactResolver: ResolveFn<Contact> = (route) => {
  const contactsService = inject(ContactsService);
  const router = inject(Router);

  const id = route.paramMap.get('id') ?? '';
  const contact = contactsService.getById(id);

  if (!contact) {
    return new RedirectCommand(router.parseUrl('/contacts'));
  }

  return contact;
};
