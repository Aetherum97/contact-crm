import { Component, computed, effect, inject, input } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router } from '@angular/router';

import { Contact } from '../../../../core/models/contact.model';
import { CategoriesService } from '../../../../core/services/categories.service';
import { ContactsService } from '../../../../core/services/contacts.service';
import { phoneValidator } from '../../../../shared/validators/phone.validator';

@Component({
  selector: 'app-contact-form',
  imports: [ReactiveFormsModule],
  templateUrl: './contact-form.html',
  styleUrl: './contact-form.scss',
})
export class ContactForm {
  private readonly contactsService = inject(ContactsService);
  private readonly categoriesService = inject(CategoriesService);
  private readonly router = inject(Router);
  private readonly fb = inject(FormBuilder);

  /** Pass a Contact to enter edit mode; omit for create mode. */
  readonly contact = input<Contact | null>(null);

  protected readonly isEditMode = computed(() => this.contact() !== null);
  protected readonly categories = this.categoriesService.categories;

  protected readonly form = this.fb.group({
    firstName: ['', [Validators.required, Validators.maxLength(50)]],
    lastName: ['', [Validators.required, Validators.maxLength(50)]],
    email: ['', [Validators.required, Validators.email, Validators.maxLength(200)]],
    phone: ['', [phoneValidator, Validators.maxLength(30)]],
    company: ['', Validators.maxLength(100)],
    jobTitle: ['', Validators.maxLength(100)],
    // '' represents "no category" (maps to null on save)
    categoryId: [''],
    notes: ['', Validators.maxLength(1000)],
  });

  constructor() {
    // Pre-fill form when in edit mode
    effect(() => {
      const contact = this.contact();
      if (contact) {
        this.form.patchValue({
          firstName: contact.firstName,
          lastName: contact.lastName,
          email: contact.email,
          phone: contact.phone,
          company: contact.company,
          jobTitle: contact.jobTitle,
          categoryId: contact.categoryId ?? '',
          notes: contact.notes,
        });
      }
    });
  }

  protected get f() {
    return this.form.controls;
  }

  protected submit(): void {
    if (this.form.invalid) {
      this.form.markAllAsTouched();
      return;
    }

    const v = this.form.getRawValue();
    const payload = {
      firstName: v.firstName ?? '',
      lastName: v.lastName ?? '',
      email: v.email ?? '',
      phone: v.phone ?? '',
      company: v.company ?? '',
      jobTitle: v.jobTitle ?? '',
      categoryId: v.categoryId || null,
      notes: v.notes ?? '',
    };

    if (this.isEditMode()) {
      const id = this.contact()!.id;
      this.contactsService.update(id, payload);
      this.router.navigate(['/contacts', id]);
    } else {
      const created = this.contactsService.create(payload);
      this.router.navigate(['/contacts', created.id]);
    }
  }

  protected cancel(): void {
    if (this.isEditMode()) {
      this.router.navigate(['/contacts', this.contact()!.id]);
    } else {
      this.router.navigate(['/contacts']);
    }
  }
}
