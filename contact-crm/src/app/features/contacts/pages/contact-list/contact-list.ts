import { Component, computed, inject, signal } from '@angular/core';
import { RouterLink } from '@angular/router';

import { Category } from '../../../../core/models/category.model';
import { CategoriesService } from '../../../../core/services/categories.service';
import { ContactsService } from '../../../../core/services/contacts.service';

type SortKey = 'name-asc' | 'name-desc' | 'date-desc' | 'date-asc';

@Component({
  selector: 'app-contact-list',
  imports: [RouterLink],
  templateUrl: './contact-list.html',
  styleUrl: './contact-list.scss',
})
export class ContactList {
  private readonly contactsService = inject(ContactsService);
  private readonly categoriesService = inject(CategoriesService);

  protected readonly allContacts = this.contactsService.contacts;
  protected readonly categories = this.categoriesService.categories;

  // ── Filter state ────────────────────────────────────────────────────────────
  protected readonly searchQuery = signal('');
  protected readonly categoryFilter = signal<string>('');
  protected readonly favoritesOnly = signal(false);
  protected readonly sortKey = signal<SortKey>('name-asc');

  // ── Category map for badge display ──────────────────────────────────────────
  protected readonly categoryMap = computed(() => {
    const map = new Map<string, Category>();
    for (const cat of this.categoriesService.categories()) {
      map.set(cat.id, cat);
    }
    return map;
  });

  // ── Filtered + sorted contacts ───────────────────────────────────────────────
  protected readonly filteredContacts = computed(() => {
    let list = this.contactsService.contacts();

    const q = this.searchQuery().toLowerCase().trim();
    if (q) {
      list = list.filter(
        (c) =>
          `${c.firstName} ${c.lastName}`.toLowerCase().includes(q) ||
          c.email.toLowerCase().includes(q) ||
          c.company.toLowerCase().includes(q),
      );
    }

    const catId = this.categoryFilter();
    if (catId) {
      list = list.filter((c) => c.categoryId === catId);
    }

    if (this.favoritesOnly()) {
      list = list.filter((c) => c.favorite);
    }

    const key = this.sortKey();
    return [...list].sort((a, b) => {
      if (key === 'name-asc')
        return `${a.firstName} ${a.lastName}`.localeCompare(
          `${b.firstName} ${b.lastName}`,
        );
      if (key === 'name-desc')
        return `${b.firstName} ${b.lastName}`.localeCompare(
          `${a.firstName} ${a.lastName}`,
        );
      if (key === 'date-desc')
        return (
          new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
        );
      // date-asc
      return new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime();
    });
  });

  // ── Delete confirmation ──────────────────────────────────────────────────────
  protected readonly deletingId = signal<string | null>(null);

  // ── Event handlers ───────────────────────────────────────────────────────────
  protected setSearch(event: Event): void {
    this.searchQuery.set((event.target as HTMLInputElement).value);
  }

  protected setCategoryFilter(event: Event): void {
    this.categoryFilter.set((event.target as HTMLSelectElement).value);
  }

  protected setSort(event: Event): void {
    this.sortKey.set((event.target as HTMLSelectElement).value as SortKey);
  }

  protected toggleFavoritesOnly(): void {
    this.favoritesOnly.update((v) => !v);
  }

  protected toggleFavorite(id: string, event: Event): void {
    event.preventDefault();
    this.contactsService.toggleFavorite(id);
  }

  protected requestDelete(id: string): void {
    this.deletingId.set(id);
  }

  protected cancelDelete(): void {
    this.deletingId.set(null);
  }

  protected confirmDelete(id: string): void {
    this.contactsService.delete(id);
    this.deletingId.set(null);
  }
}
