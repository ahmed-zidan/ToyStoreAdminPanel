import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'filter',
  standalone: true
})
export class FilterPipe implements PipeTransform {

  transform(items:any[] , searchText:string, ...keys: string[]): any[] {
    if(!items || !searchText || searchText.trim().length <= 0){
      return items;
    }

    searchText = searchText.toLocaleLowerCase();
    return items.filter((item:any)=>{
        return keys.some((key:string)=>{
          const value = item[key]?.toString().toLocaleLowerCase();
          return value?.includes(searchText);
        })
    })

  }

}
