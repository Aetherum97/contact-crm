export interface Contact {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  company: string;
  jobTitle: string;
  categoryId: string | null;
  favorite: boolean;
  notes: string;
  createdAt: string;
  updatedAt: string;
}

export type ContactCreateInput = Omit<Contact, 'id' | 'favorite' | 'createdAt' | 'updatedAt'>;

export type ContactUpdateInput = Partial<Omit<Contact, 'id' | 'createdAt'>>;

export type SortField = 'name' | 'date';
export type SortDirection = 'asc' | 'desc';

export interface ContactFilters {
  search: string;
  categoryId: string | null;
  favoritesOnly: boolean;
  sortField: SortField;
  sortDirection: SortDirection;
}
