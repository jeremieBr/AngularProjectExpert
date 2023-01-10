import { Pipe, PipeTransform } from '@angular/core';
import { Team } from 'src/app/data.models';

@Pipe({
  name: 'teamFilter',
})
export class TeamFilterPipe implements PipeTransform {
  /**
   * Applies a filter on team array according to the conference and/or division selected.
   * @param items Array of team
   * @param conferenceTerm Conference term
   * @param divisionTerm Divison term
   * @returns Array of team filtered
   */
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
