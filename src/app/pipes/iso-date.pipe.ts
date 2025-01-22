import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'isoDate',
})
export class IsoDatePipe implements PipeTransform {
  transform(value: string | undefined): string {
    if (value) {
      const date = new Date(value);
      const day = date.toLocaleString('en-US', { weekday: 'short' });
      const month = date.toLocaleString('en-US', { month: 'long' });
      const dateNum = date.getDate();
      return `${day}, ${dateNum} ${month}`;
    }
    return '';
  }
}
