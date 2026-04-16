export interface Category {
  id: string;
  name: string;
  color: string;
  createdAt: string;
}

export type CategoryCreateInput = Omit<Category, 'id' | 'createdAt'>;

export type CategoryUpdateInput = Partial<Omit<Category, 'id' | 'createdAt'>>;
