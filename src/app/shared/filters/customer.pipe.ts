import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'customer'
})

export class CustomerPipe implements PipeTransform {

  transform(value: any, ...args: any[]): any {
    if(args[0] === undefined) return value
    
    return value.filter(function(c){
      return c.payload.val().name.toLowerCase().includes(args[0].toLowerCase())
    })
  }
}
