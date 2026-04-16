import { Component, inject } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router } from '@angular/router';

import { CategoriesService } from '../../../../core/services/categories.service';

export const PRESET_COLORS: string[] = [
  '#ef4444',
  '#f97316',
  '#f59e0b',
  '#84cc16',
  '#10b981',
  '#14b8a6',
  '#3b82f6',
  '#6366f1',
  '#8b5cf6',
  '#ec4899',
];

@Component({
  selector: 'app-category-create',
  imports: [ReactiveFormsModule],
  templateUrl: './category-create.html',
  styleUrl: './category-create.scss',
})
export class CategoryCreate {
  private readonly router = inject(Router);
  private readonly fb = inject(FormBuilder);
  private readonly categoriesService = inject(CategoriesService);

  protected readonly presetColors = PRESET_COLORS;

  protected readonly form = this.fb.group({
    name: [
      '',
      [Validators.required, Validators.minLength(2), Validators.maxLength(50)],
    ],
    color: ['#6366f1', Validators.required],
  });

  protected get nameCtrl() {
    return this.form.get('name')!;
  }
  protected get colorCtrl() {
    return this.form.get('color')!;
  }

  protected selectColor(color: string): void {
    this.colorCtrl.setValue(color);
  }

  protected submit(): void {
    if (this.form.invalid) {
      this.form.markAllAsTouched();
      return;
    }
    const { name, color } = this.form.getRawValue();
    this.categoriesService.create({ name: name!, color: color! });
    this.router.navigate(['/categories']);
  }

  protected cancel(): void {
    this.router.navigate(['/categories']);
  }
}
