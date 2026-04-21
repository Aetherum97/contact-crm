import { Pipe, PipeTransform } from '@angular/core';

interface HasName {
  firstName: string;
  lastName: string;
}

@Pipe({ name: 'fullName' })
export class FullNamePipe implements PipeTransform {
  transform(value: HasName): string {
    return `${value.firstName} ${value.lastName}`.trim();
  }
}
