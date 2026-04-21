import { Component, computed, inject, signal } from '@angular/core';
import { RouterLink } from '@angular/router';

import { Category } from '../../core/models/category.model';
import { CategoriesService } from '../../core/services/categories.service';
import { ContactsService } from '../../core/services/contacts.service';

type SortKey = 'name-asc' | 'name-desc' | 'date-desc' | 'date-asc';

@Component({
  selector: 'app-favorites',
  imports: [RouterLink],
  templateUrl: './favorites.html',
  styleUrl: './favorites.scss',
})
export class Favorites {
  private readonly contactsService = inject(ContactsService);
  private readonly categoriesService = inject(CategoriesService);

  protected readonly searchQuery = signal('');
  protected readonly sortKey = signal<SortKey>('name-asc');

  protected readonly categoryMap = computed(() => {
    const map = new Map<string, Category>();
    for (const cat of this.categoriesService.categories()) {
      map.set(cat.id, cat);
    }
    return map;
  });

  protected readonly favorites = computed(() => {
    let list = this.contactsService.contacts().filter((c) => c.favorite);

    const q = this.searchQuery().toLowerCase().trim();
    if (q) {
      list = list.filter(
        (c) =>
          `${c.firstName} ${c.lastName}`.toLowerCase().includes(q) ||
          c.email.toLowerCase().includes(q),
      );
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
        return new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime();
      return new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime();
    });
  });

  protected readonly totalFavorites = computed(
    () => this.contactsService.contacts().filter((c) => c.favorite).length,
  );

  protected setSearch(event: Event): void {
    this.searchQuery.set((event.target as HTMLInputElement).value);
  }

  protected setSort(event: Event): void {
    this.sortKey.set((event.target as HTMLSelectElement).value as SortKey);
  }

  protected unfavorite(id: string): void {
    this.contactsService.toggleFavorite(id);
  }
}
