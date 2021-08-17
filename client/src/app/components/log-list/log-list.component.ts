import { Component, OnInit } from '@angular/core';
import { AppService } from 'src/app/state/app.service';

@Component({
  selector: 'app-log-list',
  templateUrl: './log-list.component.html',
  styleUrls: ['./log-list.component.scss']
})
export class LogListComponent implements OnInit {

  constructor(private service: AppService) { }

  ngOnInit(): void {
    this.service.getLogs().subscribe(value => console.log(value));
  }

}
