import { Pipe, PipeTransform } from '@angular/core';
import { Attendee, AttendeeType } from '../models/members.model';

@Pipe({
  name: 'name',
})
export class NamePipe implements PipeTransform {
  transform(value: Attendee[] | undefined, attendeeType: AttendeeType) {
    // console.log(value);
    if (value) {
      const entity = value.find(
        (attendee) => attendee.attendeeType === attendeeType
      )?.entity;
      return `${entity?.firstName} ${entity?.lastName}`;
    }
    return;
  }
}
