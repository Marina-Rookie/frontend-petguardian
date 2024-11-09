import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'filterByDate',
  standalone: true
})
export class FiltrarPorFechaPipe implements PipeTransform {
  transform(items: any[], date: Date): any[] {
    if (!items || !date) {
      return items;
    }
    return items.filter(item => item.fecha.toDateString() === date.toDateString());
  }
}
