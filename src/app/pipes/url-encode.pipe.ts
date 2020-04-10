import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'urlEncode',
  pure: true
})
export class UrlEncodePipe implements PipeTransform {

  transform(uri: string): string {
    return encodeURI(uri);
  }

}
