import {Pipe, PipeTransform} from '@angular/core';
import {DatePipe} from "@angular/common";

@Pipe({
  name: 'taskDate'
})
export class TaskDatePipe implements PipeTransform {

  transform(date: Date | string, format: string = 'mediumDate'): string | null {
    if(date == null) {
      return 'Do date';
    }

    date = new Date(date);

    const currentDate = new Date().getDate();

    if(date.getDate() === currentDate) {
      return 'Today';
    } else if(date.getDate() === currentDate - 1) {
      return 'Yesterday';
    } else if(date.getDate() === currentDate + 1) {
      return 'Tomorrow';
    } else {
      return new DatePipe('en-GB').transform(date, format);
    }

  }

}
