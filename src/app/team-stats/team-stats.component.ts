import { Component, Input, OnInit } from '@angular/core';
import { Observable, Subscription, tap } from 'rxjs';
import { NbaService } from '../nba.service';
import { Game, Stats, Team } from '../data.models';
import { DaysDataStoreService } from '../shared/stores/days-data-store.service';

@Component({
  selector: 'app-team-stats',
  templateUrl: './team-stats.component.html',
  styleUrls: ['./team-stats.component.css'],
})
export class TeamStatsComponent implements OnInit {
  @Input()
  team!: Team;

  games$!: Observable<Game[]>;
  stats!: Stats;

  showConfirmationModal: boolean = false;
  private subscriptions = new Subscription();

  constructor(
    protected nbaService: NbaService,
    protected daysDataStoreService: DaysDataStoreService
  ) {}

  ngOnInit(): void {
    const sub = this.daysDataStoreService
      .getDaysOfData$()
      .pipe(
        tap((daysToDisplay: number) => {
          this.games$ = this.nbaService
            .getLastResults(this.team, daysToDisplay)
            .pipe(
              tap(
                (games) =>
                  (this.stats = this.nbaService.getStatsFromGames(
                    games,
                    this.team
                  ))
              )
            );
        })
      )
      .subscribe();

    this.subscriptions.add(sub);
  }

  removeTrackedTeam(team: Team): void {
    this.nbaService.removeTrackedTeam(team);
    this.toggleModal(false);
  }

  toggleModal(bool: boolean): void {
    this.showConfirmationModal = bool;
  }

  ngOnDestroy(): void {
    this.subscriptions.unsubscribe();
  }
}
