import { Component, computed, inject, input, signal } from '@angular/core';
import { RouterLink } from '@angular/router';
import { Router } from '@angular/router';

import { CategoriesService } from '../../../../core/services/categories.service';
import { ContactsService } from '../../../../core/services/contacts.service';

@Component({
  selector: 'app-contact-detail',
  imports: [RouterLink],
  templateUrl: './contact-detail.html',
  styleUrl: './contact-detail.scss',
})
export class ContactDetail {
  private readonly contactsService = inject(ContactsService);
  private readonly categoriesService = inject(CategoriesService);
  private readonly router = inject(Router);

  // Bound from route param via withComponentInputBinding()
  readonly id = input.required<string>();

  protected readonly contact = computed(() =>
    this.contactsService.getById(this.id()),
  );

  protected readonly category = computed(() => {
    const catId = this.contact()?.categoryId;
    return catId ? this.categoriesService.getById(catId) : null;
  });

  protected readonly deleteConfirm = signal(false);

  protected toggleFavorite(): void {
    this.contactsService.toggleFavorite(this.id());
  }

  protected requestDelete(): void {
    this.deleteConfirm.set(true);
  }

  protected cancelDelete(): void {
    this.deleteConfirm.set(false);
  }

  protected confirmDelete(): void {
    this.contactsService.delete(this.id());
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
