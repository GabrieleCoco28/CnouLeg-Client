import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  standalone: true,
  name: 'truncate',
})
export class TruncateName implements PipeTransform {
  transform(name: string): string {
    const ext: string = name
      .substring(name.lastIndexOf('.') + 1, name.length)
      .toLowerCase();
    let newName: string = name.replace('.' + ext, '');
    if (name.length <= 8) {
      return name;
    }
    newName = newName.substring(0, 8) + (name.length > 8 ? '…' : '');
    return newName + ext;
  }
}
