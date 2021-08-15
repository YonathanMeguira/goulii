import { Component } from '@angular/core';
import { Observable } from 'rxjs';
import { Covid19Stats } from 'src/app/state/models';
import { StateService } from 'src/app/state/state.service';
import { AppService } from '../../state/app.service';

@Component({
  selector: 'app-start-day',
  templateUrl: './start-day.component.html',
  styleUrls: ['./start-day.component.scss']
})
export class StartDayComponent {

  stats: Observable<Covid19Stats[]>;

  constructor(private appService: AppService, private stateService: StateService) {
    if (!this.stateService.hasData('covidStats')) {
      this.appService.getTodaySummary();
    }
    this.stats = this.stateService.select('covidStats');
  }
}
