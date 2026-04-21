import { Component, computed, inject, input, signal } from '@angular/core';
import { Router, RouterLink } from '@angular/router';

import { Contact } from '../../../../core/models/contact.model';
import { CategoriesService } from '../../../../core/services/categories.service';
import { ContactsService } from '../../../../core/services/contacts.service';
import { FullNamePipe } from '../../../../shared/pipes/full-name.pipe';
import { InitialsPipe } from '../../../../shared/pipes/initials.pipe';

@Component({
  selector: 'app-contact-detail',
  imports: [RouterLink, FullNamePipe, InitialsPipe],
  templateUrl: './contact-detail.html',
  styleUrl: './contact-detail.scss',
})
export class ContactDetail {
  private readonly contactsService = inject(ContactsService);
  private readonly categoriesService = inject(CategoriesService);
  private readonly router = inject(Router);

  // Provided by contactResolver via withComponentInputBinding()
  readonly contact = input.required<Contact>();

  // Reactive version: updates after mutations (toggleFavorite, update, etc.)
  protected readonly liveContact = computed(
    () => this.contactsService.getById(this.contact().id) ?? this.contact(),
  );

  protected readonly category = computed(() => {
    const catId = this.liveContact().categoryId;
    return catId ? this.categoriesService.getById(catId) : null;
  });

  protected readonly deleteConfirm = signal(false);

  protected toggleFavorite(): void {
    this.contactsService.toggleFavorite(this.contact().id);
  }

  protected requestDelete(): void {
    this.deleteConfirm.set(true);
  }

  protected cancelDelete(): void {
    this.deleteConfirm.set(false);
  }

  protected confirmDelete(): void {
    this.contactsService.delete(this.contact().id);
    this.router.navigate(['/contacts']);
  }

  protected formatDate(iso: string): string {
    return new Date(iso).toLocaleDateString('en-GB', {
      day: 'numeric',
      month: 'short',
      year: 'numeric',
    });
  }
}
