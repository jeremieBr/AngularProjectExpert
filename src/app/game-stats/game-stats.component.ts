import { Component } from '@angular/core';
import { Filter, Team } from '../data.models';
import { Subscription, tap } from 'rxjs';
import { NbaService } from '../nba.service';
import { FormBuilder, FormGroup } from '@angular/forms';
import { removeDuplicateStringElementArray } from '../shared/utils/array';

@Component({
  selector: 'app-game-stats',
  templateUrl: './game-stats.component.html',
  styleUrls: ['./game-stats.component.css'],
})
export class GameStatsComponent {
  allTeams: Team[] = [];
  filters!: Filter;
  trackForm!: FormGroup;

  private subscriptions = new Subscription();

  constructor(protected nbaService: NbaService, private fb: FormBuilder) {}

  ngOnInit(): void {
    const sub = this.nbaService
      .getAllTeams()
      .pipe(
        tap((teams) => {
          this.filters = {
            conferences: removeDuplicateStringElementArray(
              teams.map((team) => team.conference)
            ),
            divisions: removeDuplicateStringElementArray(
              teams.map((team) => team.division)
            ),
            teams,
          };
          this.allTeams = teams;
        })
      )
      .subscribe();

    this.subscriptions.add(sub);
    this.trackForm = this.fb.group({
      conference: [''],
      teamId: [''],
      division: [''],
    });
  }

  get fv() {
    return this.trackForm.value;
  }

  trackTeam(): void {
    if (this.trackForm.valid) {
      let team = this.allTeams.find(
        (team) => team.id == Number(this.fv.teamId)
      );
      if (team) this.nbaService.addTrackedTeam(team);
    }
  }

  ngOnDestroy(): void {
    this.subscriptions.unsubscribe();
  }
}
