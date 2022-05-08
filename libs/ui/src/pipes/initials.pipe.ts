import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'initials',
})
export class InitialsPipe implements PipeTransform {
  transform(value: string, length = 1): string {
    const name = value.trim();

    if (!name) {
      return '';
    }

    const parts = name.split(' ');

    const initials = parts
      .filter((part) => part.length > 0)
      .map((part) => part[0].toUpperCase())
      .join('');

    return initials.length <= length ? initials : initials.slice(0, length);
  }
}
