import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'year',
  pure: false
})
export class YearPipe implements PipeTransform {

  transform(items: any[], callback: (item: any) => boolean): any {
    if (!items || !callback) {
        return items;
    }
    return items.filter(item => callback(item));
}

}
