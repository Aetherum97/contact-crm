import { Component, computed, inject, input, signal } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';

import { CategoriesService } from '../../../../core/services/categories.service';
import { ContactsService } from '../../../../core/services/contacts.service';
import { FullNamePipe } from '../../../../shared/pipes/full-name.pipe';
import { InitialsPipe } from '../../../../shared/pipes/initials.pipe';
import { PRESET_COLORS } from '../category-create/category-create';

type DeleteState = 'idle' | 'confirm' | 'blocked';

@Component({
  selector: 'app-category-detail',
  imports: [RouterLink, ReactiveFormsModule, FullNamePipe, InitialsPipe],
  templateUrl: './category-detail.html',
  styleUrl: './category-detail.scss',
})
export class CategoryDetail {
  private readonly categoriesService = inject(CategoriesService);
  private readonly contactsService = inject(ContactsService);
  private readonly router = inject(Router);
  private readonly fb = inject(FormBuilder);

  // Bound automatically from route param via withComponentInputBinding()
  readonly id = input.required<string>();

  protected readonly presetColors = PRESET_COLORS;

  protected readonly category = computed(() =>
    this.categoriesService.getById(this.id()),
  );

  protected readonly contacts = computed(() =>
    this.contactsService.contacts().filter((c) => c.categoryId === this.id()),
  );

  protected readonly isEditing = signal(false);
  protected readonly deleteState = signal<DeleteState>('idle');

  protected readonly editForm = this.fb.group({
    name: [
      '',
      [Validators.required, Validators.minLength(2), Validators.maxLength(50)],
    ],
    color: ['', Validators.required],
  });

  protected get nameCtrl() {
    return this.editForm.get('name')!;
  }
  protected get colorCtrl() {
    return this.editForm.get('color')!;
  }

  protected startEdit(): void {
    const cat = this.category();
    if (!cat) return;
    this.editForm.patchValue({ name: cat.name, color: cat.color });
    this.deleteState.set('idle');
    this.isEditing.set(true);
  }

  protected cancelEdit(): void {
    this.isEditing.set(false);
  }

  protected saveEdit(): void {
    if (this.editForm.invalid) {
      this.editForm.markAllAsTouched();
      return;
    }
    const { name, color } = this.editForm.getRawValue();
    this.categoriesService.update(this.id(), { name: name!, color: color! });
    this.isEditing.set(false);
  }

  protected selectColor(color: string): void {
    this.colorCtrl.setValue(color);
  }

  protected requestDelete(): void {
    this.isEditing.set(false);
    if (this.contacts().length > 0) {
      this.deleteState.set('blocked');
    } else {
      this.deleteState.set('confirm');
    }
  }

  protected cancelDelete(): void {
    this.deleteState.set('idle');
  }

  protected confirmDelete(): void {
    this.categoriesService.delete(this.id());
    this.router.navigate(['/categories']);
  }
}
