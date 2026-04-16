# Contact CRM — Brief de réalisation pour agent IDE

## Project overview

Build a complete mini CRM application named **contact-crm** using **Angular 20** and **TypeScript strict mode**.

The application must allow a user to manage a local contact database without any backend or external API. All data must be persisted in the browser using **localStorage**.

The final project must demonstrate a clean Angular architecture, strong typing, modular organization, maintainable code, and a solid user experience.

---

## Main objective

Create a modern Angular application that enables users to:

- create, edit, view, and delete contacts;
- manage contact categories;
- mark contacts as favorites;
- filter, sort, and search contacts;
- persist all data locally with reliable localStorage storage.

---

## Mandatory technical constraints

- Framework: **Angular 20**
- Language: **TypeScript** with **strict mode enabled**
- Forms: **Reactive Forms only**
- Persistence: **localStorage only**
- No backend
- No external API
- No external UI component library:
  - no Angular Material
  - no Bootstrap
  - no PrimeNG
  - no Tailwind-based UI kit
- No usage of `any`
- ESLint and Prettier must be installed and configured
- Project name: **contact-crm**
- The project must start with:
  - `npm install`
  - `npm start` or `npm run dev`

---

## Expected pages and routes

Implement the following routes:

- `/` → **Dashboard**
- `/contacts` → **Contacts list**
- `/contacts/new` → **Create contact**
- `/contacts/:id` → **Contact details**
- `/contacts/:id/edit` → **Edit contact**
- `/categories` → **Categories list**
- `/categories/new` → **Create category**
- `/categories/:id` → **Contacts by category**
- `/favorites` → **Favorite contacts list**

---

## Required layout

The application must include:

- a shared **Header**;
- a shared **Footer**;
- a clear navigation system (top navigation or sidebar);
- smooth navigation between pages;
- a clean and readable UI built only with custom CSS.

---

## Data models

Create strict TypeScript interfaces.

### Contact

```ts
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
```

### Category

```ts
export interface Category {
  id: string;
  name: string;
  color: string;
  createdAt: string;
}
```

---

## Contact features

Each contact must support:

- auto-generated `id`;
- `firstName`;
- `lastName`;
- `email` with valid format;
- `phone`;
- `company`;
- `jobTitle`;
- `categoryId`;
- `favorite` defaulting to `false`;
- `notes`;
- auto-generated `createdAt` and `updatedAt`.

The user must be able to:

- create a contact with a reactive form;
- edit a contact with a prefilled reactive form;
- delete a contact with confirmation;
- add or remove a contact from favorites;
- search contacts by name;
- filter contacts by category;
- filter only favorite contacts;
- sort contacts by:
  - name ascending / descending;
  - date newest / oldest.

---

## Category features

The user must be able to:

- create categories;
- list categories;
- view contacts belonging to one category;
- update categories if desired through local CRUD logic;
- delete a category **only if no contact is linked to it**.

If a category still contains contacts, display a clear error message and block deletion.

---

## Persistence requirements

All contacts and categories must be stored in **localStorage**.

Implementation requirements:

- use a dedicated service layer for storage;
- serialize and deserialize data safely;
- keep data after page refresh;
- design services so they can later be replaced by a backend API.

Suggested localStorage keys:

- `contact-crm.contacts`
- `contact-crm.categories`

---

## Validation and UX requirements

Use **Reactive Forms only**.

Required validation rules:

- mandatory fields must be validated;
- email must be validated;
- phone must be validated with a custom validator if needed;
- clear error messages must be displayed;
- deletion actions must require confirmation;
- form and storage errors must be handled cleanly.

---

## Angular architecture expectations

The project must be modular and maintainable.

Recommended structure:

```text
contact-crm/
├── src/
│   ├── app/
│   │   ├── core/
│   │   │   ├── services/
│   │   │   │   ├── local-storage.service.ts
│   │   │   │   ├── contacts.service.ts
│   │   │   │   └── categories.service.ts
│   │   │   ├── guards/
│   │   │   ├── resolvers/
│   │   │   └── models/
│   │   │       ├── contact.model.ts
│   │   │       └── category.model.ts
│   │   ├── shared/
│   │   │   ├── components/
│   │   │   ├── directives/
│   │   │   ├── pipes/
│   │   │   └── validators/
│   │   ├── features/
│   │   │   ├── dashboard/
│   │   │   ├── contacts/
│   │   │   ├── categories/
│   │   │   └── favorites/
│   │   ├── app.routes.ts
│   │   ├── app.component.ts
│   │   ├── app.component.html
│   │   └── app.component.scss
│   ├── assets/
│   ├── styles.scss
│   └── main.ts
├── .gitignore
├── package.json
├── package-lock.json
├── tsconfig.json
└── README.md
```

---

## Recommended implementation plan

### 1. Initialize the project

Generate the Angular project with routing and strict TypeScript.

Suggested command:

```bash
npx @angular/cli@latest new contact-crm --routing --style=scss
```

Then install and configure ESLint + Prettier.

---

### 2. Define models

Create strict interfaces for:

- `Contact`
- `Category`
- filter/sort state if needed

---

### 3. Implement the storage layer

Create:

- `LocalStorageService`
- `ContactsService`
- `CategoriesService`

Responsibilities:

- read/write from localStorage;
- generate IDs;
- manage timestamps;
- expose CRUD methods;
- keep business rules isolated from components.

---

### 4. Configure routing

Define all required routes and connect them to feature pages.

Add bonuses if possible:

- `CanDeactivate` guard on create/edit forms;
- resolver for `/contacts/:id` and `/contacts/:id/edit`.

---

### 5. Build shared layout

Create:

- header;
- footer;
- navigation component.

This layout must wrap all pages consistently.

---

### 6. Implement categories feature

Create pages/components for:

- categories list;
- category creation;
- category details with related contacts.

Include delete protection when a category still has linked contacts.

---

### 7. Implement contacts feature

Create pages/components for:

- contact list;
- create form;
- detail page;
- edit form.

Support:

- search;
- category filtering;
- favorites filter;
- sorting;
- delete confirmation;
- favorite toggle.

---

### 8. Implement favorites feature

Create a dedicated favorites page displaying only favorite contacts.

Reuse list card/table components when possible.

---

### 9. Implement dashboard

The dashboard must display at least:

- total number of contacts;
- number of favorite contacts;
- number of categories;
- latest added contacts.

---

### 10. Polish UX and code quality

Add:

- meaningful validation messages;
- empty states;
- error states;
- clean SCSS organization;
- reusable components where it improves maintainability.

---

## Suggested feature decomposition

### Core

Contains business logic and application-wide services:

- storage services;
- entity models;
- guards;
- resolvers.

### Shared

Contains reusable UI and utilities:

- layout components;
- reusable form input wrappers if helpful;
- pipes;
- directives;
- validators.

### Features

Contains independent business sections:

- dashboard;
- contacts;
- categories;
- favorites.

---

## Suggested reusable elements

### Pipes

Possible custom pipes:

- `fullName` → formats `firstName + lastName`
- `initials` → generates avatar initials
- `highlight` → highlights search matches (bonus)

### Directives

Possible custom directives:

- `autofocus`
- `debounceInput`

### Guards

- `CanDeactivate` guard for unsaved form changes

### Resolvers

- preload a contact before loading detail/edit page

---

## Suggested business rules

Implement the following logic explicitly:

- IDs must be unique;
- `favorite` defaults to `false`;
- `createdAt` is set on creation;
- `updatedAt` is updated on edit;
- category deletion is blocked if one or more contacts reference it;
- unknown contact or category IDs should redirect safely or display a proper fallback state.

---

## Recommended UI behavior

- Dashboard cards for key statistics
- Contact cards or table for the main list
- Category badge with color display
- Search field with live filtering
- Filter bar above the contacts list
- Confirm dialog before destructive actions
- Responsive layout
- Accessible labels and buttons

---

## Bonus features to include if time allows

- import/export JSON for contacts and categories;
- local pagination;
- dark/light theme;
- accessibility improvements;
- keyboard navigation;
- minimal i18n (`fr` / `en`);
- unit tests for services, pipes, validators, and forms.

---

## Acceptance criteria

The project is considered complete when:

- all mandatory routes exist;
- contacts CRUD works fully in localStorage;
- categories CRUD works fully in localStorage;
- category deletion protection works;
- favorites feature works;
- filtering, searching, and sorting work;
- forms are reactive and strictly validated;
- the application reloads without data loss;
- architecture is clean and modular;
- TypeScript strict mode is respected;
- no `any` is used;
- README is complete and written in proper English;
- the app installs and runs without errors.

---

## README requirements

The root `README.md` must be written in English and contain:

- Project Description
- Technologies
- Installation
- Run the Project
- Architecture & Design Choices
- Author

It must allow a third party to install and run the project without additional help.

---

## Instructions for the IDE agent

Use this brief as the implementation contract.

Priorities:

1. Set up a clean Angular 20 project structure.
2. Implement strict models and local storage services first.
3. Build routing and shared layout.
4. Implement categories CRUD.
5. Implement contacts CRUD.
6. Add filtering, sorting, favorites, and dashboard.
7. Improve UX, validation, and code quality.
8. Add bonuses only after all mandatory features are stable.

Code expectations:

- strongly typed code only;
- modular files;
- small focused components;
- reusable services;
- no dead code;
- readable naming;
- concise comments only where useful.

---

## Optional development commands

```bash
npm install
npm start
```

Depending on the Angular CLI setup, `npm run dev` may also be exposed.

---

## Final delivery

The final folder must be named:

```text
IDV-ANGU/day03/contact-crm
```

It must contain:

- the full Angular project;
- a working README;
- a project that installs and starts without errors.
