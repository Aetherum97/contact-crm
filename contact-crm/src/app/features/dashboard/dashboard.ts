import { Component, computed, inject } from '@angular/core';
import { RouterLink } from '@angular/router';

import { CategoriesService } from '../../core/services/categories.service';
import { ContactsService } from '../../core/services/contacts.service';
import { FullNamePipe } from '../../shared/pipes/full-name.pipe';
import { InitialsPipe } from '../../shared/pipes/initials.pipe';

@Component({
  selector: 'app-dashboard',
  imports: [RouterLink, FullNamePipe, InitialsPipe],
  templateUrl: './dashboard.html',
  styleUrl: './dashboard.scss',
})
export class Dashboard {
  private readonly contactsService = inject(ContactsService);
  private readonly categoriesService = inject(CategoriesService);

  protected readonly totalContacts = computed(
    () => this.contactsService.contacts().length,
  );

  protected readonly totalFavorites = computed(
    () => this.contactsService.contacts().filter((c) => c.favorite).length,
  );

  protected readonly totalCategories = computed(
    () => this.categoriesService.categories().length,
  );

  protected readonly addedThisMonth = computed(() => {
    const now = new Date();
    return this.contactsService
      .contacts()
      .filter((c) => {
        const d = new Date(c.createdAt);
        return (
          d.getFullYear() === now.getFullYear() &&
          d.getMonth() === now.getMonth()
        );
      }).length;
  });

  protected readonly recentContacts = computed(() =>
    [...this.contactsService.contacts()]
      .sort(
        (a, b) =>
          new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime(),
      )
      .slice(0, 6),
  );

  protected readonly categoryMap = computed(() => {
    const map = new Map<string, string>();
    for (const cat of this.categoriesService.categories()) {
      map.set(cat.id, cat.name);
    }
    return map;
  });

  protected readonly categoryColorMap = computed(() => {
    const map = new Map<string, string>();
    for (const cat of this.categoriesService.categories()) {
      map.set(cat.id, cat.color);
    }
    return map;
  });
}
