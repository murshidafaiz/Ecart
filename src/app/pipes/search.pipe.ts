import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'search'
})
export class SearchPipe implements PipeTransform {

  transform(allProducts:any[],searchKey:string,filterKey:string): any[]{
    let result:any = []
    if(!allProducts || !searchKey || !filterKey){
      return allProducts
    }
    else{
      allProducts.forEach(item=>{
        if(item[filterKey].trim().toLowerCase().includes(searchKey.trim().toLowerCase())){
          result.push(item)
        }
      })
    }
    return result;
  }

}
