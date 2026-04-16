import { inject, Injectable, signal } from '@angular/core';

import { Contact, ContactCreateInput, ContactUpdateInput } from '../models/contact.model';
import { LocalStorageService } from './local-storage.service';

const STORAGE_KEY = 'contact-crm.contacts';

@Injectable({ providedIn: 'root' })
export class ContactsService {
  private readonly storage = inject(LocalStorageService);

  private readonly _contacts = signal<Contact[]>(this.loadFromStorage());

  readonly contacts = this._contacts.asReadonly();

  private loadFromStorage(): Contact[] {
    return this.storage.get<Contact[]>(STORAGE_KEY) ?? [];
  }

  private persist(): void {
    this.storage.set(STORAGE_KEY, this._contacts());
  }

  getAll(): Contact[] {
    return this._contacts();
  }

  getById(id: string): Contact | undefined {
    return this._contacts().find((c) => c.id === id);
  }

  create(input: ContactCreateInput): Contact {
    const now = new Date().toISOString();
    const contact: Contact = {
      ...input,
      id: crypto.randomUUID(),
      favorite: false,
      createdAt: now,
      updatedAt: now,
    };
    this._contacts.update((contacts) => [...contacts, contact]);
    this.persist();
    return contact;
  }

  update(id: string, input: ContactUpdateInput): Contact | null {
    let updated: Contact | null = null;
    this._contacts.update((contacts) =>
      contacts.map((c) => {
        if (c.id === id) {
          updated = { ...c, ...input, updatedAt: new Date().toISOString() };
          return updated;
        }
        return c;
      }),
    );
    this.persist();
    return updated;
  }

  delete(id: string): void {
    this._contacts.update((contacts) => contacts.filter((c) => c.id !== id));
    this.persist();
  }

  toggleFavorite(id: string): void {
    this._contacts.update((contacts) =>
      contacts.map((c) =>
        c.id === id
          ? { ...c, favorite: !c.favorite, updatedAt: new Date().toISOString() }
          : c,
      ),
    );
    this.persist();
  }
}
