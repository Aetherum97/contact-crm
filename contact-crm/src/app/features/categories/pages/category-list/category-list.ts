import { Component, computed, inject, signal } from '@angular/core';
import { RouterLink } from '@angular/router';

import { CategoriesService } from '../../../../core/services/categories.service';
import { ContactsService } from '../../../../core/services/contacts.service';

@Component({
  selector: 'app-category-list',
  imports: [RouterLink],
  templateUrl: './category-list.html',
  styleUrl: './category-list.scss',
})
export class CategoryList {
  private readonly categoriesService = inject(CategoriesService);
  private readonly contactsService = inject(ContactsService);

  protected readonly categories = this.categoriesService.categories;

  // Pre-compute contact counts reactively
  protected readonly contactCountMap = computed(() => {
    const counts = new Map<string, number>();
    for (const contact of this.contactsService.contacts()) {
      if (contact.categoryId) {
        counts.set(contact.categoryId, (counts.get(contact.categoryId) ?? 0) + 1);
      }
    }
    return counts;
  });

  protected readonly deletingId = signal<string | null>(null);

  protected contactCount(categoryId: string): number {
    return this.contactCountMap().get(categoryId) ?? 0;
  }

  protected requestDelete(id: string): void {
    this.deletingId.set(id);
  }

  protected cancelDelete(): void {
    this.deletingId.set(null);
  }

  protected confirmDelete(id: string): void {
    this.categoriesService.delete(id);
    this.deletingId.set(null);
  }
}
