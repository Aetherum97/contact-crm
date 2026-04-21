import { CanDeactivateFn } from '@angular/router';

export interface CanDeactivateComponent {
  canDeactivate(): boolean;
}

export const unsavedChangesGuard: CanDeactivateFn<CanDeactivateComponent> = (
  component,
) => {
  if (component.canDeactivate()) return true;
  return confirm('You have unsaved changes. Are you sure you want to leave?');
};
