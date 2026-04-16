import { Component } from '@angular/core';

@Component({
  selector: 'app-favorites',
  template: `
    <div class="page">
      <div class="page__header">
        <h1 class="page__title">Favorites</h1>
      </div>
      <p style="color: var(--clr-text-muted)">Favorite contacts coming soon.</p>
    </div>
  `,
})
export class Favorites {}
