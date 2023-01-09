import { HttpClientModule } from '@angular/common/http';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ConfirmationModalComponent } from '../shared/components/confirmation-modal/confirmation-modal.component';

import { TeamStatsComponent } from './team-stats.component';

describe('TeamResultsComponent', () => {
  let component: TeamStatsComponent;
  let fixture: ComponentFixture<TeamStatsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [TeamStatsComponent, ConfirmationModalComponent],
      imports: [HttpClientModule],
    }).compileComponents();

    fixture = TestBed.createComponent(TeamStatsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
