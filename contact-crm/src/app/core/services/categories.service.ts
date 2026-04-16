import { inject, Injectable, signal } from '@angular/core';

import { Category, CategoryCreateInput, CategoryUpdateInput } from '../models/category.model';
import { LocalStorageService } from './local-storage.service';

const STORAGE_KEY = 'contact-crm.categories';

@Injectable({ providedIn: 'root' })
export class CategoriesService {
  private readonly storage = inject(LocalStorageService);

  private readonly _categories = signal<Category[]>(this.loadFromStorage());

  readonly categories = this._categories.asReadonly();

  private loadFromStorage(): Category[] {
    return this.storage.get<Category[]>(STORAGE_KEY) ?? [];
  }

  private persist(): void {
    this.storage.set(STORAGE_KEY, this._categories());
  }

  getAll(): Category[] {
    return this._categories();
  }

  getById(id: string): Category | undefined {
    return this._categories().find((c) => c.id === id);
  }

  create(input: CategoryCreateInput): Category {
    const category: Category = {
      ...input,
      id: crypto.randomUUID(),
      createdAt: new Date().toISOString(),
    };
    this._categories.update((categories) => [...categories, category]);
    this.persist();
    return category;
  }

  update(id: string, input: CategoryUpdateInput): Category | null {
    let updated: Category | null = null;
    this._categories.update((categories) =>
      categories.map((c) => {
        if (c.id === id) {
          updated = { ...c, ...input };
          return updated;
        }
        return c;
      }),
    );
    this.persist();
    return updated;
  }

  delete(id: string): void {
    this._categories.update((categories) => categories.filter((c) => c.id !== id));
    this.persist();
  }
}
