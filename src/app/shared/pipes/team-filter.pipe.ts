import { Pipe, PipeTransform } from '@angular/core';
import { Team } from 'src/app/data.models';

@Pipe({
  name: 'teamFilter',
})
export class TeamFilterPipe implements PipeTransform {
  transform(
    items: Team[],
    conferenceTerm: string,
    divisionTerm: string
  ): Team[] {
    return items.filter((item) => {
      return (
        (conferenceTerm ? item.conference === conferenceTerm : item) &&
        (divisionTerm ? item.division === divisionTerm : item)
      );
    });
  }
}
