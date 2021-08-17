import { Component, OnInit } from '@angular/core';
import { Contact, Log } from 'src/app/state/models';
import { StateService } from 'src/app/state/state.service';

@Component({
  selector: 'app-log-list',
  templateUrl: './log-list.component.html',
  styleUrls: ['./log-list.component.scss']
})
export class LogListComponent implements OnInit {
  logs: Log[] = [];
  users: any = {};
  constructor(private state: StateService) { }

  ngOnInit(): void {
    this.state.select('logs')
      .subscribe((logs: any) => this.logs = logs);
  }

}
