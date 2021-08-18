import { Component, OnInit } from '@angular/core';
import { AppService } from 'src/app/state/app.service';
import { CONTACTS, Log } from 'src/app/state/models';
import { StateService } from 'src/app/state/state.service';

@Component({
  selector: 'app-log-list',
  templateUrl: './log-list.component.html',
  styleUrls: ['./log-list.component.scss']
})
export class LogListComponent implements OnInit {
  logs: Log[] = [];
  displayedColumns: string[] = ['log', 'userName', 'invokedTimes', 'lastInvoked', 'createTime'];
  constructor(private state: StateService, private appService: AppService) { }

  ngOnInit(): void {
    this.state.select('logs').subscribe(logs => this.logs = logs as Log[]);
  }

  logEvent() {
    this.appService.log(CONTACTS.JONATHAN, 'Johnny got a new laptop').subscribe(v => console.log(v));
  }

}
