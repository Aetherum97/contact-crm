import { Pipe, PipeTransform } from '@angular/core';

interface HasName {
  firstName: string;
  lastName: string;
}

@Pipe({ name: 'initials' })
export class InitialsPipe implements PipeTransform {
  transform(value: HasName): string {
    return (value.firstName.charAt(0) + value.lastName.charAt(0)).toUpperCase();
  }
}
