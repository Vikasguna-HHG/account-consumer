import { Pipe, PipeTransform } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
@Pipe({
  name: 'highlight'
})
export class HighlighterPipe implements PipeTransform {
  constructor(private sanitizer: DomSanitizer) { }
  transform(text: string, search: string): any {
    if (!search) {
      return text;
    }
    const searchRegEx = new RegExp(search, 'gi');
    const match = text.match(searchRegEx);
    if (!match) {
      return text;
    }
    return this.sanitizer.bypassSecurityTrustHtml(
      text.replace(searchRegEx, match => `<mark style="background-color: red;">${match}</mark>`)
    );
  }
}
