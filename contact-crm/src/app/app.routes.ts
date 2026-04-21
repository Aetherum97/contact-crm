import { Routes } from '@angular/router';

import { unsavedChangesGuard } from './core/guards/unsaved-changes.guard';
import { contactResolver } from './core/resolvers/contact.resolver';

export const routes: Routes = [
  {
    path: '',
    loadComponent: () =>
      import('./features/dashboard/dashboard').then((m) => m.Dashboard),
    title: 'Dashboard — Contact CRM',
  },
  {
    path: 'contacts',
    children: [
      {
        path: '',
        loadComponent: () =>
          import('./features/contacts/pages/contact-list/contact-list').then(
            (m) => m.ContactList,
          ),
        title: 'Contacts — Contact CRM',
      },
      {
        path: 'new',
        loadComponent: () =>
          import(
            './features/contacts/pages/contact-create/contact-create'
          ).then((m) => m.ContactCreate),
        title: 'New Contact — Contact CRM',
        canDeactivate: [unsavedChangesGuard],
      },
      {
        path: ':id',
        resolve: { contact: contactResolver },
        children: [
          {
            path: '',
            loadComponent: () =>
              import(
                './features/contacts/pages/contact-detail/contact-detail'
              ).then((m) => m.ContactDetail),
            title: 'Contact Details — Contact CRM',
          },
          {
            path: 'edit',
            loadComponent: () =>
              import(
                './features/contacts/pages/contact-edit/contact-edit'
              ).then((m) => m.ContactEdit),
            title: 'Edit Contact — Contact CRM',
            canDeactivate: [unsavedChangesGuard],
          },
        ],
      },
    ],
  },
  {
    path: 'categories',
    children: [
      {
        path: '',
        loadComponent: () =>
          import(
            './features/categories/pages/category-list/category-list'
          ).then((m) => m.CategoryList),
        title: 'Categories — Contact CRM',
      },
      {
        path: 'new',
        loadComponent: () =>
          import(
            './features/categories/pages/category-create/category-create'
          ).then((m) => m.CategoryCreate),
        title: 'New Category — Contact CRM',
      },
      {
        path: ':id',
        loadComponent: () =>
          import(
            './features/categories/pages/category-detail/category-detail'
          ).then((m) => m.CategoryDetail),
        title: 'Category — Contact CRM',
      },
    ],
  },
  {
    path: 'favorites',
    loadComponent: () =>
      import('./features/favorites/favorites').then((m) => m.Favorites),
    title: 'Favorites — Contact CRM',
  },
  {
    path: '**',
    redirectTo: '',
  },
];
