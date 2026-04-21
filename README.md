# Contact CRM

A mini CRM application built with Angular 21 that lets you manage contacts and categories entirely in the browser — no backend, no external dependencies.

---

## Technologies

| Tool | Version |
|---|---|
| Angular | 21 (standalone components) |
| TypeScript | Strict mode |
| Angular Signals | `signal`, `computed`, `effect` |
| Angular Reactive Forms | Form validation, custom validators |
| SCSS | Custom design tokens, BEM-like naming |
| localStorage | Sole persistence layer |

---

## Installation

```bash
npm install
```

---

## Run the Project

```bash
npm start
```

The app is then available at `http://localhost:4200`.

---

## Architecture & Design Choices

### Folder structure

```
src/app/
├── core/
│   ├── models/          # Contact and Category TypeScript interfaces
│   ├── services/        # LocalStorageService, ContactsService, CategoriesService
│   ├── guards/          # CanDeactivate guard for unsaved form changes
│   └── resolvers/       # Contact resolver with redirect on unknown ID
├── shared/
│   ├── components/      # Header (with mobile menu)
│   ├── directives/      # appAutofocus, appDebounceInput
│   ├── pipes/           # fullName, initials
│   └── validators/      # Custom phone validator
└── features/
    ├── dashboard/       # Stats overview and recent contacts
    ├── contacts/        # List, create, detail, edit pages + shared form component
    ├── categories/      # List, create, detail pages
    └── favorites/       # Filtered view of favourite contacts
```

### Key design decisions

- **Signal-based state** — all services expose `signal<T[]>` state with a readonly view; components use `computed()` for derived data, keeping the UI automatically reactive.
- **`withComponentInputBinding()`** — route params and resolver data are bound directly to component `input()` signals, removing the need for manual `ActivatedRoute` injection.
- **Contact resolver with `RedirectCommand`** — loading `/contacts/:id` with an unknown ID automatically redirects to `/contacts` instead of showing a broken page.
- **`CanDeactivate` guard** — the shared `ContactForm` component tracks a `saved` signal; navigating away from a dirty, unsaved form triggers a browser confirmation prompt.
- **No external UI library** — the entire design is built with SCSS custom properties (design tokens) and BEM-like class naming.
- **Category delete protection** — deleting a category that still has linked contacts is blocked at the service layer and surfaced through a `'blocked' | 'confirm' | 'idle'` state union in the UI.
- **Debounce directive** — search inputs use a reusable `appDebounceInput` directive backed by RxJS `fromEvent + debounceTime` to avoid excessive filtering on every keystroke.

---

## Author

Antoine Caps
