import { Component } from '@angular/core';

@Component({
  selector: 'app-dashboard',
  template: `
    <div class="page">
      <div class="page__header">
        <h1 class="page__title">Dashboard</h1>
      </div>
      <p style="color: var(--clr-text-muted)">Statistics and recent contacts will appear here.</p>
    </div>
  `,
})
export class Dashboard {}
